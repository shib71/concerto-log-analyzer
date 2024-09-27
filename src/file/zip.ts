import JSZip from 'jszip'
import mime from 'mime'
import { BlobMap } from './types'

export const zipFiles = async (blobs: Blob, fileName: string, compressionLevel: number): Promise<File> => {
    const zip = new JSZip()

    const directoryMap = {} as { [path: string]: JSZip }
    const resolvePath = (zip: JSZip, path: string): [JSZip, string] => {
        const directories = path.split("/").slice(0, -1)
        if (directories.length === 0) return [zip, path]

        let currentZip = zip
        for (let i=0, subPath=directories[i], fullPath=subPath; i<directories.length; i++, subPath=directories[i], fullPath+='/' + subPath) {
            if (directoryMap[fullPath] === undefined) {
                let subZip = currentZip.folder(subPath)
                if (subZip === null) throw new Error(`Failed to create folder ${subPath} in ${fullPath}`)

                directoryMap[fullPath] = currentZip = subZip
            } else {
                currentZip = directoryMap[fullPath]
            }
        }

        return [currentZip, path.split("/").pop() as string]
    }

    for (let [path, file] of Object.entries(blobs)) {
        const [currentZip, fileName] = resolvePath(zip, path)
        currentZip.file(fileName, file)
    }

    const zipBlob = await zip.generateAsync(
        compressionLevel === 0
        ? {
            type: "blob"
        }
        : {
            type: "blob",
            compression: "DEFLATE",
            compressionOptions: {
                level: 9
            }
        }
    )
    
    return new File([zipBlob], fileName, { type: "application/zip" })
}

export const unzipFiles = async (file: File): Promise<BlobMap> => {
    const zip = await JSZip.loadAsync(file)
    const files = {} as BlobMap

    const addFile = async (file: JSZip.JSZipObject) => {
        const blob = await file.async("blob")
        const type = mime.getType(file.name)
        if (type === null) throw new Error(`Failed to get mime type for ${file.name}`)

        files[file.name] = new File([blob], file.name, { type })
    }

    for (let [_, file] of Object.entries(zip.files)) {
        if (!file.dir) {
            await addFile(file)
        }
    }

    return files
}