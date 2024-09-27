import { Alert, Code, Space } from "@mantine/core"
import { BsLightbulb } from "react-icons/bs"
import { useIgnoreSuggestion, useStudentID } from "../../state/useAnalyzerState"
import { findNominationsQuery } from "../../state/queries"
import { NominationID } from "../Toolbar/NominationID"
import { CodeHighlight } from "@mantine/code-highlight"
import '@mantine/code-highlight/styles.css';

interface FindNominationsOptions {
  showInput?: boolean
  className?: string
  style?: React.CSSProperties
}

export const FindNominations = ({ showInput=true, className, style }: FindNominationsOptions) => {
  const { studentID } = useStudentID()
  const ignoreSuggestion = useIgnoreSuggestion()
  if (studentID === undefined) return null

  const icon = <BsLightbulb />

  return <Alert title="Find Nominations" icon={icon} withCloseButton onClose={() => ignoreSuggestion("find_nominations")} mb="0.5rem" className={className} style={style}>
    Find the nominations associated with student <Code>{studentID}</Code>. If there are multiple, you will need to identify the relevant one.
    <CodeHighlight language="sql" code={findNominationsQuery(studentID).trim()} />
    {showInput && <>
      <Space h="sm" />
      <NominationID />
    </>}
  </Alert>
}