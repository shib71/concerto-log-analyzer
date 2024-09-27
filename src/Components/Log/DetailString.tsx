import { useState } from 'react';
import { LogItemString } from '../../logs/types';
import { AnalyzerState } from '../../state/types';

interface DetailStringOptions {
    item: LogItemString
    splitting?: boolean
    onSplit?: AnalyzerState["splitLogItem"]
}

export const DetailString = ({ item, splitting=false, onSplit }: DetailStringOptions) => {
    const [splitStart, setSplitStart] = useState(-1);

    return <pre>
        {item.value.split("\n").map((line, index) => <div
            key={index}
            onMouseOver={() => setSplitStart(index)}
            onClick={() => {
                if (onSplit && splitting) onSplit(item.id, index + 1)
                setSplitStart(-1)
            }}
            style={{
                borderBottom: splitting && index === splitStart
                    ? "1px solid rgb(34, 139, 230)"
                    : "1px solid transparent",
                cursor: splitting ? "row-resize" : "auto"
            }}>{line}</div>)
        }
    </pre>
}