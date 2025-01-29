export const extractFromHtml = (baseHtml: string, contactHtml: string) => {
    return `
    Extract following from html:
    - company name 
    - company url
    - recruiter name
    - recruiter url
    - about job section
    - Responsibilities section if exist
    - Requirements section if exist
    - We offer section if exist 
    - any other section if exist
    - output it in json format
    - output only json itself without any 
    Html to extract from - 
    ${baseHtml}
    Also extract following from second html script:
    - list of recruiters to contact about following position
    - list should consist of name and url to find recruiter profile
    - output only json itself without any 
    Html to extract from -
    ${contactHtml}
    `
}