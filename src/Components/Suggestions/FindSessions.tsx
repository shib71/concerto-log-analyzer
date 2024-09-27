import { Alert, Code } from "@mantine/core"
import { BsLightbulb } from "react-icons/bs"
import { findSessionsQuery } from "../../state/queries"
import { useIgnoreSuggestion, useNominationID } from "../../state/useAnalyzerState"
import { CodeHighlight } from "@mantine/code-highlight"
import '@mantine/code-highlight/styles.css';

interface FindSessionsOptions {
  className?: string
  style?: React.CSSProperties
}

export const FindSessions = ({ className, style }: FindSessionsOptions) => {
  const { nominationID } = useNominationID()
  const ignoreSuggestion = useIgnoreSuggestion()
  if (nominationID === undefined) return null

  const icon = <BsLightbulb />

  return <Alert title="Find Sessions" icon={icon} withCloseButton onClose={() => ignoreSuggestion("find_sessions")} mb="0.5rem" className={className} style={style}>
    Find the sessions associated with nomination <Code>{nominationID}</Code>. If there are multiple, you will need to identify the relevant ones.
    <CodeHighlight language="sql" code={findSessionsQuery(nominationID).trim()} />
  </Alert>
}