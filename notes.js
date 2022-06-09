const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicatNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicatNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    }
    else{
        console.log(chalk.red.inverse('Note title taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note Removed'))
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.red.inverse('No note found'))
    }
    }

const readNote = (title) => {
    const notes = loadNotes()
    const reading = notes.find((note) => note.title === title)

    if (reading){
        console.log(chalk.blue.inverse(reading.title))
        console.log(reading .body)
    }
    else{
        console.log(chalk.red.inverse('Note not found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Your notes'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}