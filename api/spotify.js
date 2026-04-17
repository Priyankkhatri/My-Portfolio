export const config = {
    runtime: 'edge',
}

/**
 * /api/spotify — Vercel Edge Function
 * 
 * Proxies Spotify API calls to keep tokens server-side.
 * 1. Uses SPOTIFY_REFRESH_TOKEN to obtain a fresh access token
 * 2. Calls /me/player/currently-playing
 * 3. Falls back to /me/player/recently-played if nothing is active
 * 4. Returns normalized JSON to the client
 */

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'

async function getAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

    const basic = btoa(`${clientId}:${clientSecret}`)

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
    })

    if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.status}`)
    }

    const data = await response.json()
    return data.access_token
}

function extractTrackData(item, isPlaying = false, progress_ms = null) {
    return {
        title: item.name || 'Unknown Track',
        artist: item.artists?.map((a) => a.name).join(', ') || 'Unknown Artist',
        album: item.album?.name || null,
        albumArt: item.album?.images?.[0]?.url || null,
        isPlaying,
        progress_ms: progress_ms,
        duration_ms: item.duration_ms || null,
    }
}

export default async function handler(req) {
    // Only allow GET
    if (req.method !== 'GET') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    try {
        const accessToken = await getAccessToken()

        // Try currently playing first
        const nowRes = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })

        // 200 with content = currently playing
        if (nowRes.status === 200) {
            const data = await nowRes.json()

            // Spotify returns 200 even if item is null sometimes
            if (data?.item) {
                const track = extractTrackData(data.item, data.is_playing, data.progress_ms)
                return new Response(JSON.stringify(track), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 's-maxage=0, stale-while-revalidate=30',
                    },
                })
            }
        }

        // 204 = no active playback, or item was null — fall back to recently played
        const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })

        if (recentRes.ok) {
            const data = await recentRes.json()
            const recentItem = data?.items?.[0]?.track

            if (recentItem) {
                const track = extractTrackData(recentItem, false, null)
                return new Response(JSON.stringify(track), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 's-maxage=0, stale-while-revalidate=30',
                    },
                })
            }
        }

        // No data available at all
        return new Response(JSON.stringify({ error: 'No track data available' }), {
            status: 204,
            headers: { 'Content-Type': 'application/json' },
        })

    } catch (error) {
        console.error('Spotify API error:', error.message || error)
        return new Response(JSON.stringify({
            error: 'Spotify API error',
            details: error.message,
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
