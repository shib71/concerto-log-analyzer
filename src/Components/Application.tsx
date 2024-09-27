import { AppShell, Box, LoadingOverlay, MantineProvider, TypographyStylesProvider } from '@mantine/core';
import { Toolbar } from './Toolbar/Toolbar';
import { LogTable } from './Log/LogTable';
import { Timeseries } from './Log/Timeseries';
import { useProcessing } from '../state/useAnalyzerState';
import "@mantine/core/styles.css"
import { useColour } from '../hooks/useColour';

export const Application = () => {
  const processing = useProcessing()
  const getSessionColour = useColour()

  return <MantineProvider>
    <TypographyStylesProvider>
      <LoadingOverlay visible={processing} zIndex={100000} />
      <AppShell padding="md" navbar={{ width: 300, breakpoint: 'xs' }} aside={{ width: 300, breakpoint: "xs " }}>
        <Toolbar />

        <AppShell.Main>
          <Box style={{ width: "calc(100vw - 632px)" }}>
            <LogTable getSessionColour={getSessionColour} style={{ width: "100%" }} />
          </Box>
        </AppShell.Main>
        <AppShell.Aside p="md" h="calc(100vh - 50px)">
          <Timeseries getSessionColour={getSessionColour} />
        </AppShell.Aside>
      </AppShell>
    </TypographyStylesProvider>
  </MantineProvider>
}
