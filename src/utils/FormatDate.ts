export function formatDateUA(date: Date = new Date()) {
    return date.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}