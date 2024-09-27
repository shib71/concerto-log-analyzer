import { AnalyzerStateBackup } from "../state/types"

export interface BlobMap {
    [key: string]: Blob
}

export interface ImportProcessors {
    [key: string]: (data: AnalyzerStateBackup) => AnalyzerStateBackup
}