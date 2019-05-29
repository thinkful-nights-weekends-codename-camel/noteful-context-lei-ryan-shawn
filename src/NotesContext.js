import React from 'react'

const NotesContext = React.createContext({
 notes: [],
 deleteNote: () => {},
 addNote: () => {},
})

export default NotesContext