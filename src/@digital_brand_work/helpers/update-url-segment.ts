export function updateUrlSegment(url: string, segment: string): string {
    const urlObj = new URL(url)
    urlObj.pathname = segment + urlObj.pathname
    return urlObj.toString()
}
