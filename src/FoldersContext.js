import React from 'react'

const FoldersContext = React.createContext({
 folders: [],
 addFolder: () => {},
 deleteFolder: () => {},
})

export default FoldersContext