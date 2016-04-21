import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes.jsx';

export default class App extends React.Component {

    state = {
        notes: [
            {
                id: uuid.v4(),
                task: 'Learn Webpack #1'
            },
            {
                id: uuid.v4(),
                task: 'Learn React #2'
            },
            {
                id: uuid.v4(),
                task: 'Do laundry #3'
            }
        ]
    }

    render() {
        return (
            <div>
                <button className="add-note" onClick={this.addNote.bind(this)}>+</button>
                <button className="del-note" onClick={this.clearNotes.bind(this)}>x</button>
                <Notes
                    onDelete={this.onNoteDelete.bind(this)}
                    onEdit={this.onNoteEdit.bind(this)}
                    notes={this.state.notes}
                />
            </div>
        )
    }

    addNote() {
        this.setState({
            notes: this.state.notes.concat([{
                id: uuid.v4(),
                task: 'new note'
            }])
        });
    }

    clearNotes = () => {
        this.setState({notes: []});
    }

    onNoteEdit(noteId, task){
        task = task.trim();
        if(!task){
            return;
        }

        const notes = this.state.notes.map(note => {
            if(note.id === noteId && task){
                note.task = task;
            }
            return note;
        });

        this.setState({notes: notes});
    }

    onNoteDelete(noteId){
        this.setState({notes: this.state.notes.filter((note) => note.id !== noteId)});
    }

}
