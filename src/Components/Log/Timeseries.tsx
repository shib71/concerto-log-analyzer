import { Stack } from "@mantine/core"
import { useLog } from "../../state/useAnalyzerState"
import { LogBucket } from "../../logs/types"
import { goToID } from "../../lib/util"
import { getLogItemIDString } from "../../logs/lib"

const barStyle = {
    height: "100%",
    display: "inline-block",
} as React.CSSProperties

interface TimeseriesBarOptions {
    maxFrequency: number
    lineHeight: number
    bucket: LogBucket
    getSessionColour: (session: string) => string
}

const TimeseriesBar = ({ maxFrequency, lineHeight, bucket, getSessionColour }: TimeseriesBarOptions) => {
    return <div onClick={() => goToID(getLogItemIDString(bucket.id))} style={{ minHeight: `${lineHeight}%`, cursor: "pointer" }} title={`${bucket.timestamp.toLocaleString()}: ${bucket.total}`}>
        {Object.keys(bucket.count).map((key) => <div
            key={key}
            style={{ ...barStyle, backgroundColor: getSessionColour(key), width: (bucket.count[key] / maxFrequency * 100).toFixed(3) + "%" }}
        ></div>)}
    </div>
}


interface TimeseriesOptions {
    getSessionColour: (session: string) => string
    className?: string
    style?: React.CSSProperties
}

export const Timeseries = ({ getSessionColour, className, style }: TimeseriesOptions) => {
    const log = useLog()
    if (log.maxFrequency === 0) return null

    const lineHeight = 100 / log.buckets.length

    return <Stack className={className} style={style} gap={0} h="100%">
        {log.buckets.map((bucket, index) => <TimeseriesBar
            key={index}
            maxFrequency={log.maxFrequency}
            lineHeight={lineHeight}
            bucket={bucket}
            getSessionColour={getSessionColour}
        />)}
    </Stack>
}