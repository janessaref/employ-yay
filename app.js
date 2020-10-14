const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const teamArray = [];

function teamManager() {
    inquirer.prompt([{
            type: "input",
            name: "managername",
            message: "What is your manager's name?",
        },
        {
            type: "input",
            name: "managerid",
            message: "What is your manager's ID?",
            validate: function(value) {
                const valid = !isNaN(parseInt(value));
                return valid || "Please enter a valid number (Press the up and down arrow key to re-Enter value";
            },
        },
        {
            type: "input",
            name: "manageremail",
            message: "What is your manager's email address?",
        },
        {
            type: "input",
            name: "manageroffice",
            message: "What is your manager's office number?",
            validate: function(value) {
                const valid = !isNaN(parseInt(value));
                return valid || "Please enter a valid number (Press the up and down arrow key to re-Enter value";
            },
        },
    ]).then(function(data) {
        const manager = new Manager(data.managername, data.managerid, data.manageremail, data.manageroffice);
        teamArray.push(manager);
        newEmployee();
    });

};

function newEmployee() {
    inquirer.prompt([{
        type: "list",
        name: "teammember",
        message: "What type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I don't want to add any more team members"],
    }, ]).then(function(data) {
        if (data.teammember === "Engineer") {
            engineerEmployee();
        } else if (data.teammember === "Intern") {
            internEmployee();
        } else {
            const finalOutput = render(teamArray);
            fs.writeFile("output/team.html", finalOutput,
                function(err) {
                    if (err) throw err;
                    console.log("Your team is ready!");
                });

        };
    });
};

function engineerEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "engineername",
            message: "What is your engineer's name?",
        },
        {
            type: "input",
            name: "engineerid",
            message: "What is your engineer's ID?",
            validate: function(value) {
                const valid = !isNaN(parseInt(value));
                return valid || "Please enter a valid number (Press the up and down arrow key to re-Enter value";
            },
        },
        {
            type: "input",
            name: "engineeremail",
            message: "What is your engineer's email address?",
        },
        {
            type: "input",
            name: "engineergithub",
            message: "What is your engineer's GitHub username?",
        },
    ]).then(function(data) {
        const engineer = new Engineer(data.engineername, data.engineerid, data.engineeremail, data.engineergithub);
        teamArray.push(engineer);
        newEmployee();
    });
};

function internEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "internname",
            message: "What is your intern's name?",
        },
        {
            type: "input",
            name: "internid",
            message: "What is your intern's ID?",
            validate: function(value) {
                const valid = !isNaN(parseInt(value));
                return valid || "Please enter a valid number (Press the up and down arrow key to re-Enter value";
            },
        },
        {
            type: "input",
            name: "internemail",
            message: "What is your intern's email?",
        },
        {
            type: "input",
            name: "internschool",
            message: "What is your intern's school?",
        },
    ]).then(function(data) {
        const intern = new Intern(data.internname, data.internid, data.internemail, data.internschool);
        teamArray.push(intern);
        newEmployee();
    });
};

teamManager();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```