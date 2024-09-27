import { AnalyzerState, AnalyzerStateBackup, NominationID, SessionHash, SessionID, StudentID } from "./types"

export const asStudentID = (id: string): StudentID => {
    if (!id.match(/^\d+$/)) {
        throw new Error("Invalid Student ID. Expecting digits only.")
    }

    const parsedID = window.parseInt(id) as StudentID

    return parsedID
}

export const asNominationID = (id: string): NominationID => {
    if (!id.match(/^\d+$/)) {
        throw new Error("Invalid Nomination ID. Expecting digits only.")
    }

    const parsedID = window.parseInt(id) as NominationID

    return parsedID
}

export const asSessionID = (id: string): SessionID => {
    if (!id.match(/^\d+$/)) {
        throw new Error(`Invalid Session ID. Expecting digits only.`)
    }

    const parsedID = window.parseInt(id) as SessionID

    return parsedID
}

export const asSessionHash = (id: string): SessionHash => {
    if (!id.match(/^[a-z\d]{40}$/)) {
        throw new Error(`Invalid Session Hash. Expected 40 alphanumeric characters. [${id}]`)
    }

    return id as SessionHash
}

export const getExportableState = (state: AnalyzerState): AnalyzerStateBackup => {
    return {
        studentID: state.studentID,
        nominationID: state.nominationID,
        sessions: state.sessions,
        bucketCount: state.bucketCount,
        log: state.log,
        ignoredSuggestions: state.ignoredSuggestions,
        bookmarks: state.bookmarks,
    }
}