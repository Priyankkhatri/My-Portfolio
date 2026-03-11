import 'dotenv/config'
import { GoogleGenerativeAI } from '@google/generative-ai'

console.log('API Key (first 10 chars):', process.env.GEMINI_API_KEY?.substring(0, 10))
console.log('SDK version check...')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

async function test() {
    const models = ['gemini-2.0-flash', 'gemini-1.5-flash-latest', 'gemini-pro']
    
    for (const modelName of models) {
        console.log(`\n=== Testing: ${modelName} ===`)
        try {
            const model = genAI.getGenerativeModel({ model: modelName })
            const result = await model.generateContent('Say hi')
            const text = result.response.text()
            console.log('SUCCESS:', text.substring(0, 100))
            return
        } catch (err) {
            console.log('Status:', err.status)
            console.log('Message:', err.message?.substring(0, 200))
            if (err.errorDetails) {
                console.log('Details:', JSON.stringify(err.errorDetails).substring(0, 300))
            }
        }
    }
}

test()
