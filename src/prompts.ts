export const extractFromHtml = (html: string) => {
    return `
    - generate json text only without anything else 
    Extract following from html:
    - company name 
    - company url
    - recruiter name
    - recruiter url
    - position name such as Lean Frontend developer, Backend Developer
    - about job section
    - Responsibilities section if exist
    - Requirements section if exist
    - We offer section if exist 
    - any other section if exist
    - output it in json format
    Html to extract from - 
    ${html}
    `
}

export const generateHtml = (json: string, template: string) => `
Person - Developer/Recruiter
Task - Generate html file from json data based on html template
Context - I need html file to convert in further to pdf
Key points:
- Adjust html cv to maximize chances to impress recruiter
- it should follow precise order from top to bottom  name => title => info(email,phone,linkedIn) => description => experience => skills
- name should be Nazar Hulymchuk
- extract title from json job.title field, it should be something like Backend developer etc,without company name,format it in following way Lead Frontend Developer, Backend Engineer etc
- my name which is Nazar Hulymchuk
- email ersteste1n@gmail.com, phone number +380731428049, linkedIn link https://www.linkedin.com/in/nazar-hulymchuk-a30480240/
- description should be composed from:
    - requirements(75%)
    - responsibilities(50%)
    - nice_to_have(40%)
    - modify text to look more natural
    - length should be at least 50 words
- description should be written with following:
    - company name
    - position
    - start time and end time in format mm/yyyy - mm/yyyy
    - consist of n points in format I have done this, or worked with that
    - each point should consist of at least 25 words
    - create points from json:
        - requirements(75%)
        - responsibilities(50%)
        - nice_to_have(40%)
        - modify text to look more natural, it should not repeat any from description
        - explain how much you improved something abstractly rather then in % or in numbers
        - create 3 companies, come up with random names and dates starting from 2022
        - each job at least 10 bullets
-skills should be in bullet point format and taken from:
    - responsibilities(50%)
    - requirements(75%)
    - nice_to_have(40%)
    - at least 10 skills in total, try to find up to 20
    - do not include abstact skills like Frontend Development, Responsive Design, API Integration, only particluar skills like git,next.js, node.js
- merge description,experience and skills with my real experience, I have been working around 3 years as software engineer with following tools:
    - frontend
    - backend
    - angular
    - react
    - javascript
    - typescript
    - node.js
    - git
    - aws 
    - azure
    - postgreSQL
    - Microsoft SQL Server
    - My last company was Reenbit where I worked from may 2022 until july 2024, I was Angular frontend developer 
Assets to work with:
- json data \n${json},
- html template \n${template}  
Output html content without any redundant text
`