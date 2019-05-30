import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NotesFoldersContext from '../NotesFoldersContext'
import './Note.css'

function deleteNoteRequest(noteId, noteDeleteCallbackFunc) {
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
      noteDeleteCallbackFunc(noteId);
      // * In our case noteDeleteCallbackFunc is context.deleteNote; We
      //   specified this below, on line 52. Function context.deleteNote
      //   is defined in App.js. It removes the note from App's state.
    })
    .catch(error => {
      console.error(error)
    })
}

export default function Note(props) {
  return (
    <NotesFoldersContext.Consumer>
      {(context) => (    
        <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${props.id}`}>
              {props.name}
            </Link>
          </h2>
          <button className='Note__delete' type='button'
            onClick={() => {
              deleteNoteRequest(
                props.id,
                context.deleteNote,
                )
          }}>
            <FontAwesomeIcon icon='trash-alt' />
            {' '}
            remove
          </button>
          <div className='Note__dates'>
            <div className='Note__dates-modified'>
              Modified
              {' '}
              <span className='Date'>
                {format(props.modified, 'Do MMM YYYY')}
              </span>
            </div>
          </div>
        </div>
        )}
  </NotesFoldersContext.Consumer>
  )
}
