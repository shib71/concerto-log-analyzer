import { Stack } from "@mantine/core"
import { useLog } from "../../state/useAnalyzerState"
import { LogBucket } from "../../logs/types"
import { goToID } from "../../lib/util"
import { getLogItemIDString } from "../../logs/lib"

interface TimeseriesBarOptions {
    maxFrequency: number
    lineHeight: number
    bucket: LogBucket
}

const TimeseriesBar = ({ maxFrequency, lineHeight, bucket }: TimeseriesBarOptions) => {
    return <div onClick={() => goToID(getLogItemIDString(bucket.id))} style={{ minHeight: `${lineHeight}%`, cursor: "pointer" }} title={`${bucket.timestamp.toLocaleString()}: ${bucket.total}`}>
        {Object.keys(bucket.count).map((key) => <div
            key={key}
            style={{ ...barStyle, width: (bucket.count[key] / maxFrequency * 100).toFixed(3) + "%" }}
        ></div>)}
    </div>
}


interface TimeseriesOptions {
    className?: string
    style?: React.CSSProperties
}

const barStyle = {
    backgroundColor: "#666",
    height: "100%",
    display: "inline-block",
} as React.CSSProperties

export const Timeseries = ({ className, style }: TimeseriesOptions) => {
    const log = useLog()
    if (log.maxFrequency === 0) return null

    const lineHeight = 100 / log.buckets.length

    return <Stack className={className} style={style} gap={0} h="100%">
        {log.buckets.map((bucket, index) => <TimeseriesBar
            key={index}
            maxFrequency={log.maxFrequency}
            lineHeight={lineHeight}
            bucket={bucket}
        />)}
    </Stack>
}