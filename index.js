const fs  = require("fs")
const util = require("util")

const inquirer = require("inquirer")

const writeFileAsync = util.promisify(fs.writeFile)

function promptUser() {
    return inquirer
    .prompt ([
        {
            name: "title",
            message: "What is the title of your README.md?",
            default: "Title"
        },
        {
            type: "checkbox",
            message: "What languages do you know?",
            name: "stack",
            choices: [
            "HTML", 
            "CSS", 
            "JavaScript", 
            "MySQL"
            ]
        },
        {
            type: "list",
            message: "What is your preferred method of communication?",
            name: "contact",
            choices: [
            "email",
            "phone",
            "telekinesis"
            ]
        },
    ])
}

function generateReadMe(answers) {
    return `# ${answers.title}

## Description `
}

 promptUser()
 .then(function(answers){
   const README = generateReadMe(answers)

   writeFileAsync("generated-README.md", README)
})
.then(function() {
    console.log("README.md was successfully created")
})
.catch(function(error) {
    if(error) {
        throw error;
    }
})