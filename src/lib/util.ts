export const goToID = (id: string) => {
    const anchor = document.getElementById(id)
    if (!anchor) return

    anchor.scrollIntoView()
}
