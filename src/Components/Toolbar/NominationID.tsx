import { ActionIcon, Button, CheckIcon, Group, Popover, TextInput } from "@mantine/core"
import { AnalyzerState } from "../../state/types"
import { useNominationID } from "../../state/useAnalyzerState"
import { useState } from "react"
import { asNominationID } from "../../state/util"
import { BsFillPencilFill, BsSearch } from "react-icons/bs"
import { FindStudent } from "../Suggestions/FindStudent"
import { FindSessions } from "../Suggestions/FindSessions"

interface SetNominationIDOptions {
    setNominationID: AnalyzerState["setNominationID"]
}

const SetNominationID = ({ setNominationID }: SetNominationIDOptions) => {
    const [currentNominationID, setCurrentNominationID] = useState("")
    const [errMessage, setErrMessage] = useState(undefined as string | undefined)

    const updateNominationID = () => {
        try {
            const typedNominationID = asNominationID(currentNominationID)
            setNominationID(typedNominationID)
        } catch (error: any) {
            setErrMessage(error.message)
        }
    }

    return <Group align="start" justify="space-between">
        <TextInput
            placeholder="Nomination ID"
            value={currentNominationID}
            onChange={(event) => setCurrentNominationID(event.currentTarget.value)}
            error={errMessage}
            size="sm"
            style={{ flexGrow: 1}}
        />
        <ActionIcon onClick={updateNominationID} size="input-sm" variant="filled" color="lime">
            <CheckIcon style={{ width: '70%', height: '70%' }} />
        </ActionIcon>
    </Group>
}


interface ShowNominationIDOptions {
    nominationID: AnalyzerState["nominationID"]
    setNominationID: AnalyzerState["setNominationID"]
}

const ShowNominationID = ({ nominationID, setNominationID }: ShowNominationIDOptions) => {
    return <>
        <Group justify="space-between">
            Nomination ID: {nominationID}
            <ActionIcon onClick={() => setNominationID(undefined)} size="input-sm">
                <BsFillPencilFill style={{ width: '70%', height: '70%' }} />
            </ActionIcon>
        </Group>
        <Group justify="flex-start">
            <Popover position="bottom" withArrow>
                <Popover.Target>
                    <Button variant="subtle" color="blue" size="xs"><BsSearch />&nbsp;Student</Button>
                </Popover.Target>
                <Popover.Dropdown w={1000}>
                    <FindStudent showInput={false} />
                </Popover.Dropdown>
            </Popover>
            <Popover position="bottom" withArrow>
                <Popover.Target>
                    <Button variant="subtle" color="blue" size="xs"><BsSearch />&nbsp;Sessions</Button>
                </Popover.Target>
                <Popover.Dropdown w={1000}>
                    <FindSessions />
                </Popover.Dropdown>
            </Popover>
        </Group>
    </>
}


export const NominationID = () => {
    const { nominationID, setNominationID } = useNominationID()

    if (nominationID) {
        return <ShowNominationID nominationID={nominationID} setNominationID={setNominationID} />
    } else {
        return <SetNominationID setNominationID={setNominationID} />
    }
}