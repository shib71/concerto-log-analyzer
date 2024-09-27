import { Code, Group } from '@mantine/core';
import { LogItemEvent } from '../../logs/types';
import { EventBadge } from './EventBadge';

interface DetailEventOptions {
    item: LogItemEvent
}

export const DetailEvent = ({ item }: DetailEventOptions) => {
    return <Group justify="flex-start">
        <EventBadge value={item.value} />
        &nbsp;
        {item.detail && <Code>{item.detail}</Code>}
    </Group>
}