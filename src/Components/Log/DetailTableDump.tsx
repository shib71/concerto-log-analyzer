import { Table } from '@mantine/core';
import { LogItemTableDump } from '../../logs/types';

interface DetailTableDumpOptions {
    item: LogItemTableDump
}

export const DetailTableDump = ({ item }: DetailTableDumpOptions) => {
    return <Table>
        <Table.Thead>
            {item.headers.map((header, i) => <Table.Th key={i}>{header}</Table.Th>)}
        </Table.Thead>
        <Table.Tbody>
            {item.rows.map((row, rowIndex) => {
                return <Table.Tr key={rowIndex}>
                    {row.map((cell, cellIndex) => <Table.Td key={cellIndex}>{cell}</Table.Td>)}
                </Table.Tr>
            })}
        </Table.Tbody>
    </Table>
}