import { useSuggestions } from "../../state/useAnalyzerState"
import { FindNominations } from "./FindNominations"
import { FindSessions } from "./FindSessions"
import { FindStudent } from "./FindStudent"

interface SuggestionsOptions {
    className?: string
    style?: React.CSSProperties
}

export const Suggestions = ({ className, style }: SuggestionsOptions) => {
    const suggestions = useSuggestions()
    if (suggestions.length === 0) return null

    return <div className={className} style={style}>
        {suggestions.map(type => {
            switch (type) {
                case "find_student":
                    return <FindStudent key={type} />
                case "find_nominations":
                    return <FindNominations key={type} className={className} style={style} />
                case "find_sessions":
                    return <FindSessions key={type} className={className} style={style} />
            }
        })}
    </div>
}