import { Badge } from "@mantine/core"
import { LogItemEvent } from "../../logs/types"

interface EventBadgeOptions {
    value: LogItemEvent["value"]
}

export const EventBadge = ({ value }: EventBadgeOptions) => {
    switch (value) {
        case "db_connect": return <Badge variant="light" color="blue">DB Connected</Badge>
        case "deserializing_session": return <Badge variant="light" color="gray">Session deserializing</Badge>
        case "deserialized_session": return <Badge variant="light" color="gray">Session deserialized</Badge>
        case "serializing_session": return <Badge variant="light" color="gray">Session serializing</Badge>
        case "serialized_session": return <Badge variant="light" color="gray">Session serialized</Badge>
        case "updating_session": return <Badge variant="light" color="gray">Session updating</Badge>
        case "test_start": return <Badge variant="light" color="yellow">Starting test</Badge>
        case "test_end": return <Badge variant="light" color="red">Ending test</Badge>
        case "no_existing_session": return <Badge variant="light" color="violet">No existing session</Badge>
        case "responding_to_server": return <Badge variant="light" color="grape">Responding to server</Badge>
        case "responded_to_server": return <Badge variant="light" color="grape">Responded to server</Badge>
        case "template_submit": return <Badge variant="light" color="green">Template submitted</Badge>
        case "template_show": return <Badge variant="light" color="green">Template shown</Badge>
        case "session_stop": return <Badge variant="light" color="red">Session stopped</Badge>
    }
}