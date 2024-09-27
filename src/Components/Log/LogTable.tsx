import { Table } from "@mantine/core"
import { useAnalyzerState, useLog } from "../../state/useAnalyzerState"
import { LogRow } from "./LogRow"
import { LogBucket } from "../../logs/types"
import { AnalyzerState } from "../../state/types"

interface LogBucketSectionOptions {
    bucket: LogBucket
    addComment: AnalyzerState["addComment"]
    splitLogItem: AnalyzerState["splitLogItem"]
    getSessionColour: (session: string) => string
}

const LogBucketSection = ({ bucket, addComment, splitLogItem, getSessionColour }: LogBucketSectionOptions) => {
    return <>
        {bucket.logs.map((logItem, index) => {
            return <LogRow
                key={index}
                item={logItem}
                addComment={addComment}
                splitLogItem={splitLogItem}
                getSessionColour={getSessionColour}
            />
        })}
    </>
}


interface LogTableOptions {
    getSessionColour: (session: string) => string
    className?: string
    style?: React.CSSProperties
}

export const LogTable = ({ getSessionColour, className, style }: LogTableOptions) => {
    const log = useLog()
    const splitLogItem = useAnalyzerState(state => state.splitLogItem)
    const addComment = useAnalyzerState(state => state.addComment)

    return <Table stickyHeader striped highlightOnHover className={className} style={{width: "calc(100vw - 660px)", ...style}}>
      <Table.Thead>
        <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Timestamp</Table.Th>
            <Table.Th>Log</Table.Th>
            <Table.Th>Detail</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {log.buckets.map((bucket, index) => <LogBucketSection key={index} bucket={bucket} addComment={addComment} splitLogItem={splitLogItem} getSessionColour={getSessionColour} />)}
      </Table.Tbody>
    </Table>
}