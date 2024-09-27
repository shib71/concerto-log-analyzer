import { Table } from '@mantine/core';
import { LogItemObjectDump } from '../../logs/types';

interface DetailObjectDumpOptions {
    item: LogItemObjectDump
}

export const DetailObjectDump = ({ item }: DetailObjectDumpOptions) => {
    return <Table captionSide="top">
        {item.label && <Table.Caption>{item.label}</Table.Caption>}
        <Table.Tbody>
            {item.items.map((item, i) => {
                return <Table.Tr key={i}>
                    <Table.Th>{item.name}</Table.Th>
                    <Table.Td>{item.value}</Table.Td>
                </Table.Tr>
            })}
        </Table.Tbody>
    </Table>
}