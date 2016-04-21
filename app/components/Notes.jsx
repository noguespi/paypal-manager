import React from 'react';
import Note from './Note.jsx';

export default class Notes extends React.Component {

    render() {
        return (
            <div>
                <ul className="notes">
                    {this.props.notes.map(note =>
                        <li className="note" key={note.id}>
                            <Note
                                onDelete={this.props.onDelete.bind(null, note.id)}
                                onEdit={this.props.onEdit.bind(null, note.id)}
                                name={note.task}
                            />
                        </li>
                    )}
                </ul>
            </div>
        );
    }

}

