import { Alert, Code, Space } from "@mantine/core"
import { BsLightbulb } from "react-icons/bs"
import { findStudentQuery } from "../../state/queries"
import { useIgnoreSuggestion, useNominationID } from "../../state/useAnalyzerState"
import { NominationID } from "../Toolbar/NominationID"
import { CodeHighlight } from "@mantine/code-highlight"
import '@mantine/code-highlight/styles.css';

interface FindStudentOptions {
  showInput?: boolean
  className?: string
  style?: React.CSSProperties
}

export const FindStudent = ({ showInput=true, className, style }: FindStudentOptions) => {
  const { nominationID } = useNominationID()
  const ignoreSuggestion = useIgnoreSuggestion()
  if (nominationID === undefined) return null

  const icon = <BsLightbulb />

  return <Alert title="Find Student" icon={icon} withCloseButton onClose={() => ignoreSuggestion("find_student")} mb="0.5rem" className={className} style={style}>
    Find the student ID for nomination <Code>{nominationID}</Code>.
    <CodeHighlight language="sql" code={findStudentQuery(nominationID).trim()} />
    {showInput && <>
      <Space h="sm" />
      <NominationID />
    </>}
  </Alert>
}