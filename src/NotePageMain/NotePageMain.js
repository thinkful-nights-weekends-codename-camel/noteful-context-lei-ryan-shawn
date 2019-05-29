import React, { Component } from 'react'
import Note from '../Note/Note'
import NotesFoldersContext from '../NotesFoldersContext'
import './NotePageMain.css'

export default class NotePageMain extends Component {
  static contextType = NotesFoldersContext;
  render() {
    const currentNoteId = this.props.match.params.noteId;
    const note = this.context.notes.find(item => item.id === currentNoteId)
    return (
      <section className='NotePageMain'>
        <Note
          {...note}
          />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}
