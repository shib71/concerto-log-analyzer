import JSZip from 'jszip'
import { AnalyzerStateBackup } from '../state/types'
import { ImportProcessors } from './types'

export const backupExt = ".cla"
export const backupMime = "application/octet-stream"

export const createBackup = async (state: AnalyzerStateBackup): Promise<File> => {
    // serialize
    const exportableOutput = JSON.stringify(state)

    // compress
    const zip = new JSZip()
    zip.file("data", exportableOutput)
    zip.file("version", "2024-09-24-backup")

    const zipBlob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
            level: 9
        }
    })
    
    return new File([zipBlob], `backup-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${backupExt}`, { type: backupMime })
}

export const importProcessors: ImportProcessors = {
    "2024-09-24-backup": (data) => {
        return {
            ...data,
            log: {
                ...data.log,
                buckets: data.log.buckets.map((bucket: any) => ({
                    ...bucket,
                    id: [new Date(bucket.id[0]), bucket.id[1], bucket.id[2]],
                    timestamp: new Date(bucket.timestamp),
                    logs: bucket.logs.map((log: any) => ({
                        ...log,
                        id: [new Date(log.id[0]), log.id[1], log.id[2]],
                        timestamp: new Date(log.timestamp),
                    })),
                })),
                startTimestamp: new Date(data.log.startTimestamp),
                endTimestamp: new Date(data.log.endTimestamp),
            }
        }
    },
}

export const loadBackup = async (file: File): Promise<AnalyzerStateBackup> => {
    // decompress
    const zip = await JSZip.loadAsync(file)

    // check the version
    if (zip.files["version"] === undefined) throw new Error("Backup file is missing version file")
    const version = await zip.files["version"].async("text")

    const importProcessor = importProcessors[version]
    if (importProcessor === undefined) throw new Error("Unknown backup file version")

    // get the serialized data
    if (zip.files["data"] === undefined) throw new Error("Backup file is missing data file")
    const data = await zip.files["data"].async("arraybuffer")

    // deserialize
    const decoder = new TextDecoder("utf-8")
    const importableOutput = JSON.parse(decoder.decode(data)) as AnalyzerStateBackup

    return importProcessor(importableOutput)
}