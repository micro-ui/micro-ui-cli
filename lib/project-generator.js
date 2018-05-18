const inquirer = require('inquirer')
const fs = require('fs')

const TEMPLATES_PATH = `${__dirname}/../templates`
const TEMPLATES = fs.readdirSync(TEMPLATES_PATH)
const CURR_DIR = process.cwd()

const QUESTIONS = [
    {
        name: 'projectChoice',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: TEMPLATES,
    }, {
        name: 'projectName',
        type: 'input',
        message: 'Project folder name (e.g. employee-portal):',
        validate: function (input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true
            else return 'Project name may only include letters, numbers, underscores and hashes.'
        }
    }, {
        name: 'projectTitle',
        type: 'input',
        message: 'Project description (will be used as page title):',
        validate: function (input) {
            if (input) return true
            else return 'Must include a project title'
        }
    },
]

class ProjectGenerator {

    generateNewProject() {
        inquirer.prompt(QUESTIONS).then(answers => {
            const templatePath = `${TEMPLATES_PATH}/${answers.projectChoice}`

            this.answers = answers

            this.createNewProjectDirectory(`${CURR_DIR}/${answers.projectName}`)
            this.copyTemplateToNewProject(templatePath, answers.projectName)
        })
    }

    createNewProjectDirectory(newProjectPath) {
        if (fs.existsSync(newProjectPath)) {
            throw new Error('Project path already exists, aborting.')
        }

        fs.mkdirSync(newProjectPath)
    }

    copyTemplateToNewProject(templatePath, newProjectPath) {
        const filesToCreate = fs.readdirSync(templatePath)

        filesToCreate.forEach(file => {
            const origFilePath = `${templatePath}/${file}`
            const newFilePath = `${CURR_DIR}/${newProjectPath}/${file}`
            const stats = fs.statSync(origFilePath)

            if (stats.isFile()) {
                this.copyFileToPath(origFilePath, newFilePath)
            } else {
                fs.mkdirSync(newFilePath)
                this.copyTemplateToNewProject(origFilePath, `${newProjectPath}/${file}`)
            }
        })
    }

    copyFileToPath(filePath, newFilePath) {
        let contents = fs.readFileSync(filePath, 'utf8')

        contents = contents.replace(/{{projectTitle}}/g, this.answers.projectTitle)
        contents = contents.replace(/{{projectName}}/g, this.answers.projectName)

        fs.writeFileSync(newFilePath, contents, 'utf8')
    }

}

module.exports = new ProjectGenerator()
