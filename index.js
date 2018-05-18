const inquirer = require('inquirer')
const generator = require('./lib/project-generator')

const CHOICES = [
    'Project',
    'Route',
    'Component',
    'Model',
    'Store',
]

const QUESTIONS = [
    {
        name: 'choice',
        type: 'list',
        message: 'What would you like to create?',
        choices: CHOICES,
    },
]

inquirer.prompt(QUESTIONS).then(answers => {
    switch (answers.choice) {
        case 'Project':
            generator.generateNewProject()
        break;

        default:
            throw new Error('That choice is not supported. Aborting.')
    }
})
