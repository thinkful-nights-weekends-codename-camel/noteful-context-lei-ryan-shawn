import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
// import NotesContext from '../NotesContext'
// import FoldersContext from '../FoldersContext'
import NotesFoldersContext from '../NotesFoldersContext'
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers'
import './App.css'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };
  setStuffs1 = (notes, folders) => {
    this.setState({
      notes,
      folders,
      error: null,
    })
    console.log('setting state');
    console.log(this.state);
  }
  setFoldersNotes = values => {
    this.setState(
      {...values}
    )
  }
  deleteNote = noteID => {
    const newNotes = this.state.notes.filter(n =>
      n.id !== noteID
    )
    this.setState({
      notes: newNotes
    })
  }

  componentDidMount() {
    let apiRequest1 = fetch('http://localhost:9090/folders').then(function (response) {
      return response.json()
    });
    let apiRequest2 = fetch('http://localhost:9090/notes').then(function (response) {
      return response.json()
    });

    let combinedData = {
      "folders": {}, "notes": {}
    };
    
    Promise.all([apiRequest1, apiRequest2]).then(function (values) {
        combinedData["folders"] = values[0];
        combinedData["notes"] = values[1];
        return combinedData;
      }).then(data=>{
        this.setFoldersNotes(data)
      })
  }

    renderNavRoutes() {
      // const { notes, folders } = this.state
      return (
        <>
          {['/', '/folder/:folderId'].map(path =>
            <Route exact path={path}
              key={path}
              component={NoteListNav}
            // render={routeProps =>
            //   <NoteListNav
            //     folders={folders}
            //     notes={notes}
            //     {...routeProps}
            //   />
            // }
            />
          )}
          <Route
            path='/note/:noteId'
            component={NotePageNav}
          // render={routeProps => {
          //   const { noteId } = routeProps.match.params
          //   const note = findNote(notes, noteId) || {}
          //   const folder = findFolder(folders, note.folderId)
          //   return (
          //     <NotePageNav
          //       {...routeProps}
          //       folder={folder}
          //     />
          //   )
          // }}
          />
          <Route
            path='/add-folder'
            component={NotePageNav}
          />
          <Route
            path='/add-note'
            component={NotePageNav}
          />
        </>
      )
    }

    renderMainRoutes() {
      // const { notes, folders } = this.state
      return (
        <>
          {['/', '/folder/:folderId'].map(path =>
            <Route exact path={path}
              key={path}
              component={NoteListMain}
            // render={routeProps => {
            //   const { folderId } = routeProps.match.params
            //   const notesForFolder = getNotesForFolder(notes, folderId)
            //   return (
            //     <NoteListMain
            //       {...routeProps}
            //       notes={notesForFolder}
            //     />
            //   )
            // }}
            />
          )}
          <Route
            path='/note/:noteId'
            component={NotePageMain}
          //  render={routeProps => {
          //    const { noteId } = routeProps.match.params
          //    const note = findNote(notes, noteId)
          //    return (
          //      <NotePageMain
          //        {...routeProps}
          //        note={note}
          //      />
          //    )
          //  }}
          />
          <Route
            path='/add-folder'
            component={AddFolder}
          />
          <Route
            path='/add-note'
            component={AddNote}
          // render={routeProps => {
          //   return (
          //     <AddNote
          //       {...routeProps}
          //       folders={folders}
          //     />
          //   )
          // }}
          />
        </>
      )
    }

    render() {
      const contextValue = {
        notes: this.state.notes,
        folders: this.state.folders,
        deleteNote: this.deleteNote,
      }
      return (
        <NotesFoldersContext.Provider value={contextValue}>
          <div className='App'>
            <nav className='App__nav'>
              {this.renderNavRoutes()}
            </nav>
            <header className='App__header'>
              <h1>
                <Link to='/'>Noteful</Link>
                {' '}
                <FontAwesomeIcon icon='check-double' />
              </h1>
            </header>
            <main className='App__main'>
              {this.renderMainRoutes()}
            </main>
          </div>
        </NotesFoldersContext.Provider>
      )
    }
  }

  export default App
