import { ActionIcon, Alert, Button, CheckIcon, Group, Pill, Popover, Table, Textarea } from '@mantine/core';
import { LogItem } from '../../logs/types';
import React, { useState } from 'react';
import { BsBookmarkFill, BsX } from 'react-icons/bs';
import { BiSolidComment } from 'react-icons/bi';
import { useInputState } from '@mantine/hooks';
import { AnalyzerState } from '../../state/types';
import { DetailString } from './DetailString';
import { DetailEvent } from './DetailEvent';
import { DetailSQL } from './DetailSQL';
import { DetailObjectDump } from './DetailObjectDump';
import { TfiSplitV } from 'react-icons/tfi';
import { getLogItemIDString } from '../../logs/lib';
import "./LogRow.css"

interface LogRowOptions {
    className?: string
    style?: React.CSSProperties
    item: LogItem
    addComment?: AnalyzerState["addComment"]
    splitLogItem?: AnalyzerState["splitLogItem"]
    getSessionColour: (session: string) => string
}

export const LogRow = ({
    className, style,
    item, addComment, splitLogItem,
    getSessionColour
}: LogRowOptions) => {
    const [comment, setComment] = useInputState(item.comment || "")
    const [commentOpened, setCommentOpened] = useState(false);
    const [splitting, setSplitting] = useState(false);

    const updateComment = (comment?: string) => {
        if (addComment) addComment(item.id, comment)
        setCommentOpened(false)
        setComment(comment || "")
    }

    return <Table.Tr className={className} style={style}>
        <Table.Td className="logrow-row-actions" id={getLogItemIDString(item.id)}>
            {addComment && <Popover opened={commentOpened} width={500} position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <Button variant="subtle" px="xs" color={item.comment ? "blue" : "grey"} onClick={() => setCommentOpened(!commentOpened)}><BsBookmarkFill /></Button>
                </Popover.Target>
                <Popover.Dropdown>
                    <Group>
                        <Textarea value={comment} onChange={setComment} style={{ flexGrow: 1}} />
                        <ActionIcon onClick={() => updateComment(comment)} size="input-sm" variant="filled" color="lime">
                            <CheckIcon style={{ width: '70%', height: '70%' }} />
                        </ActionIcon>
                        <ActionIcon onClick={() => updateComment()} size="input-sm" variant="filled" color="red">
                            <BsX style={{ width: '70%', height: '70%' }} />
                        </ActionIcon>
                    </Group>
                </Popover.Dropdown>
            </Popover>}
            {item.type === "string" && splitLogItem && <Button px="xs" variant="subtle" color={splitting ? "red" : "grey"} onClick={() => setSplitting(!splitting)}><TfiSplitV /></Button>}
        </Table.Td>
        <Table.Td style={{ verticalAlign: "top" }} title={item.timestamp.toLocaleString()}>
            {item.timestamp.toLocaleString().split(", ").pop()}
        </Table.Td>
        <Table.Td className="logrow-row-sessionhash">
            <Pill className="logrow-sessionhash" style={{ backgroundColor: getSessionColour(item.sessionHash) }} title={`${item.sessionHash}:${item.line}`}>{item.sessionHash.slice(0, 8)}:{item.line}</Pill>
        </Table.Td>
        <Table.Td className="logrow-row-content">
            {item.comment && <Alert variant="light" color="blue" radius={0} style={{ position: "relative", top: -10 }}>
                <BiSolidComment style={{ color: "var(--mantine-color-blue-filled)" }} />
                &nbsp;
                {item.comment}
            </Alert>}
            {item.type === "string" && <DetailString item={item} splitting={splitting} onSplit={splitLogItem} />}
            {item.type === "event" && <DetailEvent item={item} />}
            {item.type === "sql" && <DetailSQL item={item} />}
            {item.type === "object_dump" && <DetailObjectDump item={item} />}
        </Table.Td>
    </Table.Tr>
}