import { useMemo } from 'react'
import { projects } from '../data/projectsData'

/**
 * Custom hook to access project data.
 * @param {string} [id] - Optional project ID. If provided, returns single project.
 * @returns {Object} - { projects, getProject, getAdjacentProjects }
 */
export default function useProjectData(id) {
    const project = useMemo(() => {
        if (!id) return null
        return projects.find((p) => p.id === id) || null
    }, [id])

    const getProject = (projectId) => {
        return projects.find((p) => p.id === projectId) || null
    }

    const getAdjacentProjects = (projectId) => {
        const index = projects.findIndex((p) => p.id === projectId)
        if (index === -1) return { prev: null, next: null }

        const prev = index > 0 ? projects[index - 1] : projects[projects.length - 1]
        const next = index < projects.length - 1 ? projects[index + 1] : projects[0]

        return { prev, next }
    }

    return {
        projects,
        project,
        getProject,
        getAdjacentProjects,
    }
}
