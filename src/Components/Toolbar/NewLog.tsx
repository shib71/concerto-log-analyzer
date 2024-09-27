import React from "react"
import { Group, rem, Text } from "@mantine/core"
import { Dropzone } from "@mantine/dropzone"
import { BsFile, BsUpload, BsX } from "react-icons/bs"
import { useProcessSessionFile, useSetProcessing } from "../../state/useAnalyzerState"

interface LogOptions {
  className?: string
  style?: React.CSSProperties
}

export const NewLog = ({ className, style }: LogOptions) => {
  const { processSessionFile } = useProcessSessionFile()
  const setProcessing = useSetProcessing()

  const dropzoneProps: React.ComponentProps<typeof Dropzone> = {
    onDrop: async (files: File[]) => {
      setProcessing(true)
  
      for (const file of files) {
        await processSessionFile(file)
      }
  
      setProcessing(false)
    },
    maxSize: 5 * 1024 ** 2,
    accept: {
      "text/log": [".log"],
      "text/plain": [".log"],
    },
    className,
    style
  }

  return <Dropzone {...dropzoneProps}>
    <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
      <Dropzone.Accept>
        <BsUpload
          style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
        />
      </Dropzone.Accept>
      <Dropzone.Reject>
        <BsX
          style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
        />
      </Dropzone.Reject>
      <Dropzone.Idle>
        <BsFile
          style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
        />
      </Dropzone.Idle>

      <div>
        <Text size="xl" inline>
          Drag logs here or click to select files
        </Text>
        <Text size="sm" c="dimmed" inline mt={7}>
          Attach as many files as you like, each file should not exceed 5mb
        </Text>
      </div>
    </Group>
  </Dropzone>
}