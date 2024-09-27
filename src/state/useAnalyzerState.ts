import { create } from 'zustand'
import { AnalyzerState, AnalyzerSuggestionTypes } from './types'
import { useShallow } from 'zustand/shallow'
import { addComment, createArrayFromLog, createLogFromArray, getComments, parseLog, splitLogItem } from '../logs/lib'
import { createBackup, loadBackup } from '../file/backup'
import { getExportableState } from './util'
import { useEffect, useState } from 'react'

export const useAnalyzerState = create<AnalyzerState>()((set, get) => ({
    processing: false,
    setProcessing: (processing) => set({ processing }),

    studentID: undefined,
    setStudentID: (studentID) => set({ studentID }),

    nominationID: undefined,
    setNominationID: (nominationID) => set({ nominationID }),

    sessions: [],
    addSession: (session) => set(state => {
        const currentIndex = state.sessions.findIndex(s => (s.id !== undefined && s.id === session.id) || (s.hash !== undefined && s.hash === session.hash))
        if (currentIndex === -1) return { sessions: [...state.sessions, session] }

        const newSessions = [...state.sessions]
        newSessions[currentIndex] = { ...newSessions[currentIndex], ...session }
        return { sessions: newSessions }
    }),

    log: {
        buckets: [],
        maxFrequency: 0,
        startTimestamp: new Date(0),
        endTimestamp: new Date(0),
    },
    processSessionFile: async (file) => {
        const fileContent = await file.text()
        const logItems = parseLog(file.name, fileContent)

        set((state) => {
            const logTimeline = createArrayFromLog(state.log).concat(logItems).sort((a, b) => {
                const t = a.timestamp.getTime() - b.timestamp.getTime()
                if (t !== 0) return t

                return a.line - b.line
            })

            return {
                log: createLogFromArray(logTimeline, state.bucketCount),
            }
        });

        return logItems.length
    },
    processSessionText: (name, content) => {
        const logItems = parseLog(name, content)

        set((state) => {
            const logTimeline = createArrayFromLog(state.log).concat(logItems).sort((a, b) => {
                const t = a.timestamp.getTime() - b.timestamp.getTime()
                if (t !== 0) return t

                return a.line - b.line
            })

            return {
                log: createLogFromArray(logTimeline, state.bucketCount),
            }
        });
    },
    splitLogItem: (id, start) => {
        set({ processing: true })
        set(state => ({
            processing: false,
            log: splitLogItem(state.log, id, start)
        }))
    },

    addComment: (id, comment) => set((state) => ({
        log: addComment(state.log, id, comment)
    })),
    getComments: () => getComments(get().log),

    bucketCount: 100,
    logBuckets: [],
    maxFrequency: 0,
    setBucketCount: (bucketCount) => set((state) => {
        const log = createLogFromArray(createArrayFromLog(state.log), bucketCount)

        return {
            bucketCount,
            log
        }
    }),

    ignoredSuggestions: [],
    ignoreSuggestion: (suggestion) => set((state) => ({ ignoredSuggestions: [...state.ignoredSuggestions, suggestion] })),

    bookmarks: [],
    addBookmark: (id, note) => set((state) => ({ bookmarks: [...state.bookmarks, { id, note }] })),
    removeBookmark: (id) => set((state) => ({ bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== id) })),

    export: async () => {
        set({ processing: true })

        const file = await createBackup(getExportableState(get()))
        const url = URL.createObjectURL(file)
        const a = document.createElement("a")

        const clickHandler = () => {
            setTimeout(() => {
                URL.revokeObjectURL(url)
                a.removeEventListener('click', clickHandler)
                a.remove()
            }, 150)
        }

        a.href = url
        a.download = file.name
        a.addEventListener('click', clickHandler, false);
        a.click()

        set({ processing: false })
    },
    import: async (file) => {
        set({ processing: true })
        const backup = await loadBackup(file)
        set({
            processing: false,
            ...backup
        })
    },
}))

export const useProcessing = () => useAnalyzerState((state) => state.processing)

export const useSetProcessing = () => useAnalyzerState((state) => state.setProcessing)

export const useStudentID = () => useAnalyzerState(useShallow((state) => ({
    studentID: state.studentID,
    setStudentID: state.setStudentID,
})))

export const useNominationID = () => useAnalyzerState(useShallow((state) => ({
    nominationID: state.nominationID,
    setNominationID: state.setNominationID,
})))

export const useSuggestions = (): AnalyzerSuggestionTypes[] => useAnalyzerState(useShallow((state) => {
    const suggestions: AnalyzerSuggestionTypes[] = []

    if (state.studentID === undefined && state.nominationID !== undefined && state.ignoredSuggestions.indexOf("find_student") === -1) {
        suggestions.push("find_student")
    }
    if (state.studentID !== undefined && state.nominationID === undefined && state.ignoredSuggestions.indexOf("find_nominations") === -1) {
        suggestions.push("find_nominations")
    }
    if (state.nominationID !== undefined && state.sessions.length === 0 && state.ignoredSuggestions.indexOf("find_sessions") === -1) {
        suggestions.push("find_sessions")
    }

    return suggestions
}))

export const useIgnoreSuggestion = () => useAnalyzerState((state) => state.ignoreSuggestion)

export const useProcessSessionFile = () => useAnalyzerState(useShallow((state) => ({
    processSessionFile: state.processSessionFile,
    processSessionText: state.processSessionText,
})))

export const useLog = () => useAnalyzerState(state => state.log)

export const useBookmarks = () => useAnalyzerState(useShallow((state) => ({
    bookmarks: state.bookmarks,
    addBookmark: state.addBookmark,
    removeBookmark: state.removeBookmark,
})))

export const useComments = () => {
    const [result, setResult] = useState(() => ({
        addComment: useAnalyzerState.getState().addComment,
        comments: useAnalyzerState.getState().getComments(),
    }))
    
    useEffect(() => useAnalyzerState.subscribe((state, prevState) => {
        if (state.log === prevState.log) return
        
        const comments = state.getComments()
        setResult(result => {
            if (result.comments.map(({ id }) => id.join("-")).join(",") === comments.map(({ id }) => id.join("-")).join(",")) return result

            return {
                addComment: state.addComment,
                comments,
            }
        })
    }))

    return result
}

export const useExport = () => useAnalyzerState(useShallow((state) => ({
    export: state.export,
    import: state.import,
})))