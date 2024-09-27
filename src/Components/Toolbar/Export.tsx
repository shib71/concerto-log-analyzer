import { Alert, Box, Button, FileButton, SimpleGrid } from "@mantine/core"
import { useExport } from "../../state/useAnalyzerState"
import { useState } from "react"
import { BsExclamationCircle } from "react-icons/bs"
import { backupExt, backupMime } from "../../file/backup"

interface ExportOptions {
    className?: string
    style?: React.CSSProperties
}

export const Export = ({ className, style }: ExportOptions) => {
    const exports = useExport()
    const [error, setError] = useState("")

    const onImport = (file: File | null) => {
        if (!file) return

        try {
            exports.import(file)
        } catch (e: any) {
            setError(e.message)
        }
    }

    return <Box className={className} style={style}>
            {error && <Alert variant="light" color="red" icon={<BsExclamationCircle />} mb="xs">{error}</Alert>}
            <SimpleGrid cols={2}>
                <Button variant="filled" color="green" onClick={() => exports.export()}>Export</Button>
                <FileButton accept={backupMime} onChange={onImport} inputProps={{ accept: backupExt }}>
                    {(props) => <Button {...props} variant="filled" color="blue">Import</Button>}
                </FileButton>
            </SimpleGrid>
        </Box>
}