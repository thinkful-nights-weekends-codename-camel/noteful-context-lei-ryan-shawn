import React from 'react'

const NotesFoldersContext = React.createContext({
 notes: [],
 folders: [],
 addNote: () => {},
 deleteNote: () => {},
 addFolder: () => {},
 deleteFolder: () => {},
})

export default NotesFoldersContext