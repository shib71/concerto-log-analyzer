import { ChunkedArray } from "../lib/chunkedArray";
import { Nominal } from "../lib/types";
import { Comment, LogBucket, Log, LogItem, LogItemID } from "../logs/types";

export type StudentID = Nominal<number, "StudentID">
export type NominationID = Nominal<number, "NominationID">
export type SessionID = Nominal<number, "SessionID">
export type SessionHash = Nominal<string, "SessionHash">

export interface Session {
    id?: SessionID
    hash?: SessionHash
    hasLogs?: boolean
}

export type AnalyzerSuggestionTypes = "find_student" | "find_nominations" | "find_sessions"
export interface AnalyzerSuggestion {
    type: AnalyzerSuggestionTypes
    description: string
    code: string
}

export interface LogBookmark {
    id: LogItemID
    note: string
}

export interface AnalyzerState {
    processing: boolean
    setProcessing: (processing: boolean) => void

    studentID?: StudentID
    setStudentID: (studentID?: StudentID) => void

    nominationID?: NominationID
    setNominationID: (nominationID?: NominationID) => void

    sessions: Session[]
    addSession: (session: Session) => void

    bucketCount: number
    log: Log
    processSessionFile: (file: File) => Promise<number>
    processSessionText: (name: string, content: string) => void
    splitLogItem: (id: LogItemID, start: number) => void
    setBucketCount: (bucketCount: number) => void

    addComment: (id: LogItemID, comment?: string) => void
    getComments: () => Comment[]

    ignoredSuggestions: AnalyzerSuggestionTypes[]
    ignoreSuggestion: (suggestion: AnalyzerSuggestionTypes) => void

    bookmarks: LogBookmark[]
    addBookmark: (id: LogItemID, note: string) => void
    removeBookmark: (id: LogItemID) => void

    export: () => void
    import: (file: File) => void
}

export type AnalyzerStateBackup = Omit<
    AnalyzerState,
    "processing" |
    "setProcessing" |
    "setStudentID" |
    "setNominationID" |
    "addSession" |
    "setBucketCount" |
    "ignoreSuggestion" |
    "addBookmark" |
    "removeBookmark" |
    "export" |
    "import" |
    "processSessionFile" |
    "processSessionText" |
    "addComment" |
    "getComments" |
    "splitLogItem"
>