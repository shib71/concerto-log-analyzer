import { NominationID } from "./NominationID";
import { StudentID } from "./StudentID";
import { AppShell, Space } from "@mantine/core";
import { NewLog } from "./NewLog";
import { Bookmarks } from "./Bookmarks";
import { Export } from "./Export";
import { NewLogPaste } from "./NewLogPaste";

export const Toolbar = () => {
    return <AppShell.Navbar p="md">
        <StudentID />
        <Space h="sm" />
        <NominationID />
        <Space h="sm" />
        <NewLog />
        <Space h="sm" />
        <NewLogPaste />
        <Space h="sm" />
        <Bookmarks />
        <Space h="sm" />
        <Export />
    </AppShell.Navbar>
}
