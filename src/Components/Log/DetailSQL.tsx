import { LogItemSQL } from '../../logs/types';
import { CodeHighlight } from '@mantine/code-highlight';

interface DetailSQLOptions {
    item: LogItemSQL
}

export const DetailSQL = ({ item }: DetailSQLOptions) => {
    return <CodeHighlight language="sql" code={item.code} />
}