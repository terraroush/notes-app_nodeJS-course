const fs = require("fs")
const chalk = require("chalk")

const addNote = (title, body) => {
    // get notes and check to see that the new add attempt isn't duplicating the title
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!"))
    } else {
        console.log(chalk.red.inverse("Note title taken!"))
    }
}

const removeNote = (title) => {
    // first get notes
    const notes = loadNotes()
    // make an array out of all notes except one that matches the user input title
    const oneRemoved = notes.filter(note => note.title !== title)
    // if there is a something in the array, SAVE notes with the updated data
    if (oneRemoved.length !== notes.length) {
        saveNotes(oneRemoved)
        console.log(chalk.green.inverse(`You've successfully deleted your note titled, "${title}." Your list is updated!`))
    } else {
        console.log(chalk.red.inverse("There was no note by that title..."))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.underline.inverse("Your notes by title:"))
    return notes.forEach(note => console.log(note.title))

}

const readNote = (title) => {
    const notes = loadNotes()
    const match = notes.find(note => note.title === title)

    if (match) {
        console.log(chalk.inverse("Title:") + " " + match.title)
        console.log(chalk.inverse("Contents:") + " " + match.body)
    } else {
        console.log(chalk.red.inverse("No match found"))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJsON)
}

const loadNotes = () => {
    // there may not be any notes, so use try/catch
    // get notes from source
    // convert to string for JSON
    // parse as a object
    try {
        const dataBuffer = fs.readFileSync("notes.json")
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote, removeNote, listNotes, readNote
}