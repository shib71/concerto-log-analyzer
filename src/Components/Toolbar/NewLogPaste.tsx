import React, { useState } from "react"
import { Box, Button, Collapse, Group, Textarea, TextInput } from "@mantine/core"
import { useProcessSessionFile, useSetProcessing } from "../../state/useAnalyzerState"
import { useInputState } from "@mantine/hooks"

interface NewLogPasteOptions {
  className?: string
  style?: React.CSSProperties
}

export const NewLogPaste = ({ className, style }: NewLogPasteOptions) => {
  const { processSessionText } = useProcessSessionFile()
  const setProcessing = useSetProcessing()
  const [opened, setOpened] = useState(false)
  const [name, setName] = useInputState("log-" + Date.now())
  const [log, setLog] = useInputState("")

  const startLog = () => {
    setOpened(true)
  }

  const cancelLog = () => {
    setOpened(false)
    setName("log-" + Date.now())
    setLog("")
  }

  const processLog = () => {
    setProcessing(true)
    processSessionText(name, log)
    setProcessing(false)

    setName("log-" + Date.now())
    setLog("")
  }

  return <Box className={className} style={style}>
    <h3>Paste log</h3>
    <Collapse in={opened}>
      <TextInput label="Name" onChange={setName} value={name} />
      <Textarea label="Log" onChange={setLog} value={log} />
    </Collapse>
    {opened
      ? 
      <Group justify="center" mt="sm">
        <Button variant="transparent" onClick={cancelLog}>Cancel</Button>
        <Button onClick={processLog}>Add</Button>
      </Group>
      : <Group justify="center" mb={5}>
        <Button variant="transparent" onClick={startLog}>Start</Button>
      </Group>
    }
  </Box>
}