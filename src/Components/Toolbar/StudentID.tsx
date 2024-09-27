import { ActionIcon, Button, CheckIcon, Group, Popover, TextInput } from "@mantine/core"
import { AnalyzerState } from "../../state/types"
import { useStudentID } from "../../state/useAnalyzerState"
import { useState } from "react"
import { asStudentID } from "../../state/util"
import { BsFillPencilFill, BsSearch } from "react-icons/bs"
import { FindNominations } from "../Suggestions/FindNominations"

interface SetStudentIDOptions {
    setStudentID: AnalyzerState["setStudentID"]
}

const SetStudentID = ({ setStudentID }: SetStudentIDOptions) => {
    const [currentStudentID, setCurrentStudentID] = useState("")
    const [errMessage, setErrMessage] = useState(undefined as string | undefined)

    const updateStudentID = () => {
        try {
            const typedStudentID = asStudentID(currentStudentID)
            setStudentID(typedStudentID)
        } catch (error: any) {
            setErrMessage(error.message)
        }
    }

    return <Group align="start" justify="space-between">
        <TextInput
            placeholder="Student ID"
            value={currentStudentID}
            onChange={(event) => setCurrentStudentID(event.currentTarget.value)}
            error={errMessage}
            size="sm"
            style={{ flexGrow: 1}}
        />
        <ActionIcon onClick={updateStudentID} size="input-sm" variant="filled" color="lime">
            <CheckIcon style={{ width: '70%', height: '70%' }} />
        </ActionIcon>
    </Group>
}


interface ShowStudentIDOptions {
    studentID: AnalyzerState["studentID"]
    setStudentID: AnalyzerState["setStudentID"]
}

const ShowStudentID = ({ studentID, setStudentID }: ShowStudentIDOptions) => {
    return <>
        <Group justify="space-between">
            Student ID: {studentID}
            <ActionIcon onClick={() => setStudentID(undefined)} size="input-sm">
                <BsFillPencilFill style={{ width: '70%', height: '70%' }} />
            </ActionIcon>
        </Group>
        <Group justify="flex-start">
            <Popover position="bottom" withArrow>
                <Popover.Target>
                    <Button variant="subtle" color="blue" size="xs"><BsSearch />&nbsp;Nominations</Button>
                </Popover.Target>
                <Popover.Dropdown w={1000}>
                    <FindNominations showInput={false} />
                </Popover.Dropdown>
            </Popover>
        </Group>
    </>
}


export const StudentID = () => {
    const { studentID, setStudentID } = useStudentID()

    if (studentID) {
        return <ShowStudentID studentID={studentID} setStudentID={setStudentID} />
    } else {
        return <SetStudentID setStudentID={setStudentID} />
    }
}