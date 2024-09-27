import { Alert, Box, Text } from "@mantine/core"
import { useBookmarks, useComments } from "../../state/useAnalyzerState"
import { getLogItemIDString } from "../../logs/lib"

interface BookmarksOptions {
    className?: string
    style?: React.CSSProperties
}

export const Bookmarks = ({ className, style }: BookmarksOptions) => {
    const { bookmarks, removeBookmark } = useBookmarks()
    const { comments } = useComments()

    const goToBookmark = (index: number) => {
        const bookmark = bookmarks[index]

        const anchor = document.getElementById(getLogItemIDString(bookmark.id))
        if (!anchor) return
        anchor.scrollIntoView()
    }
    const goToComment = (index: number) => {
        const bookmark = comments[index]

        const anchor = document.getElementById(getLogItemIDString(bookmark.id))
        if (!anchor) return
        anchor.scrollIntoView()
    }

    return <Box className={className} style={style}>
        {bookmarks.map((bookmark, index) => {
            return <Alert key={index} variant="transparent" color="blue" onClick={() => goToBookmark(index)} onClose={() => window.confirm("Are you sure you want to remove this bookmark?") && removeBookmark(bookmark.id)} withCloseButton>
                <Text style={{ cursor: "pointer" }}>{bookmark.note}</Text>
            </Alert>
        })}
        {comments.map((bookmark, index) => {
            return <Alert key={index} variant="transparent" color="blue" onClick={() => goToComment(index)} onClose={() => window.confirm("Are you sure you want to remove this bookmark?") && removeBookmark(bookmark.id)} withCloseButton>
                <Text style={{ cursor: "pointer" }}>{bookmark.comment}</Text>
            </Alert>
        })}
    </Box>
}