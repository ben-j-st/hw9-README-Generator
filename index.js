const fs = require("fs")
const util = require("util")
const axios = require('axios').default;

const inquirer = require("inquirer")

const writeFileAsync = util.promisify(fs.writeFile)

const mitText = "A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code. see full licence at https://choosealicense.com/licenses/mit/"
const gnuAGPL = "This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3  or later of the License, see https://www.gnu.org/licenses/ for full license details"
const motzilla = "This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0., You can obtain a copy of the licence at http://mozilla.org/MPL/2.0/."
const apache = "Licensed under the Apache License, Version 2.0; you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0"
const boost = "A simple permissive license only requiring preservation of copyright and license notices for source (and not binary) distribution. See full licence for more details https://choosealicense.com/licenses/bsl-1.0/"
const unlicenced = "A license with no conditions whatsoever which dedicates works to the public domain. Unlicensed works, modifications, and larger works may be distributed under different terms and without source code. see full licence https://choosealicense.com/licenses/unlicense/ for more info visit https://unlicense.org"

let licenceText = ""
function promptUser() {
    return inquirer
        .prompt([
            {
                name: "title",
                message: "What is the title of your README.md?",
                default: "Title"
            },
            {
                name: "description",
                message: "Write a description of your README ",
            },
            {
                name: "install",
                message: "Is there anything the user needs to instal to run this application?",
            },
            {
                name: "usage",
                message: "What does your file/application do ?",
            },
            {
                type: "list",
                message: "What is licence",
                name: "licence",
                choices: [
                    "MIT",
                    "GNU AGPLv3",
                    "Mozilla Public License 2.0",
                    "Apache License 2.0",
                    "Boost Software License 1.0",
                    "The Unlicense"
                ],
                default: "MIT"
            },
            {
                name: "contribute",
                message: "Did you have anyone contribute to your file/application?",
            },
            {
                name: "tests",
                message: "Do you have any tests you want the user to know about to showcase the file/application",
            },
            {
                name: "github",
                message: "Please enter your github username",
                default: "ben-j-st"
            },
            {
                name: "email",
                message: "Please enter your email address",
                default: "ben_j_stephens@hotmail.com"
            },
        ])
}


// {
//     type: "checkbox",
//     message: "What languages do you know?",
//     name: "stack",
//     choices: [
//     "HTML", 
//     "CSS", 
//     "JavaScript", 
//     "MySQL"
//     ]
// },

"MIT",
    "GNU AGPLv3",
    "Mozilla Public License 2.0",
    "Apache License 2.0",
    "Boost Software License 1.0",
    "The Unlicense"


function generateReadMe(answers) {
    const test = answers.licence
    if (test === "MIT") {
        licenceText = mitText;
    } else if (test === "GNU AGPLv3") {
        licenceText = gnuAGPL;
    } else if (test === "Mozilla Public License 2.0") {
        licenceText = motzilla;
    } else if (test === "Apache License 2.0") {
        licenceText = apache;
    } else if (test === "Boost Software License 1.0") {
        licenceText = boost;
    } else {
        licenceText = unlicenced;
    }

    const formattedLicence = answers.licence.replace(/ /g, '%20')

    const url = `https://img.shields.io/badge/licence-${formattedLicence}-yellow`

    return `# ${answers.title}  

    
<div align="right"><img alt="licence badge" src="${url}"></div>

## Description 

${answers.description}

## Table of Contents

* [Description](#Description)
* [Installation](#Installation)
* [Usage](#Usage)
* [Licence](#Licence)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)

## Installation

${answers.install}

## Usage

${answers.usage}

## Licence 

${answers.licence}

${licenceText}

## Contributing 

${answers.contribute}

## Tests

${answers.tests}

## Questions

Github Username: <a href="https://github.com/${answers.github}">${answers.github}</a>

Email: ${answers.email}`
}


// title of your project - DONE
// Description - DONE
// Table of Contents - in string literal - 
// Installation - anything the user needs to know regarding what to install -
// Usage
// License
// Contributing
// Tests
// Questions - need link to github profile - and email





promptUser()
    .then(function (answers) {

        const README = generateReadMe(answers)

        writeFileAsync("README.md", README)
    })
    .then(function () {
        console.log("README.md was successfully created")
    })
    .catch(function (error) {
        if (error) {
            throw error;
        }
    })