import { useCallback, useRef } from "react"

type Colour = `#${string}`

interface ColourMap {
    [key: string]: Colour
}

const colours: Colour[] = [
    "#8BC1F7", // blue 0
    "#BDE2B9", // green 0
    "#A2D9D9", // cyan 0
    "#B2B0EA", // purple 0
    "#F9E0A2", // gold 0
    "#F4B678", // orange 0
    "#C9190B", // red 0
    "#F0F0F0", // black 0
    "#519DE9", // blue 1
    "#7CC674", // green 1
    "#73C5C5", // cyan 1
    "#8481DD", // purple 1
    "#F6D173", // gold 1
    "#EF9234", // orange 1
    "#A30000", // red 1
    "#D2D2D2", // black 1
    "#06C", // blue 2
    "#4CB140", // green 2
    "#009596", // cyan 2
    "#5752D1", // purple 2
    "#F4C145", // gold 2
    "#EC7A08", // orange 2
    "#7D1007", // red 2
    "#B8BBBE", // black 2
    "#004B95", // blue 3
    "#38812F", // green 3
    "#005F60", // cyan 3
    "#3C3D99", // purple 3
    "#F0AB00", // gold 3
    "#C46100", // orange 3
    "#470000", // red 3
    "#8A8D90", // black 3
    "#002F5D", // blue 4
    "#23511E", // green 4
    "#003737", // cyan 4
    "#2A265F", // purple 4
    "#C58C00", // gold 4
    "#8F4700", // orange 4
    "#2C0000", // red 4
    "#6A6E73", // black 4
]

export const useColour = () => {
    const colourMap = useRef({} as ColourMap)
    let colourIndex = 0
    
    const getColour = useCallback((key: string) => {
        if (!colourMap.current[key]) {
            colourMap.current[key] = colours[colourIndex]
            colourIndex = (colourIndex + 1) % colours.length
        }

        return colourMap.current[key]
    }, [])

    return getColour
}