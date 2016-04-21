import React from 'react';

export default class Note extends React.Component {

    static propTypes = { count: React.PropTypes.number.isRequired };
    static defaultProps = { count: 10 };
    state = {
        editing: false
    };

    render() {
        if (this.state.editing) {
            return this.renderEdit();
        }
        return this.renderNote();
    }

    renderNote() {
        return (
            <div onClick={this.edit.bind(this)}>
                <span className="task">{this.props.name}</span>
                <button className="delete-note" onClick={this.props.onDelete}>-</button>
            </div>
        )
    }

    renderEdit() {
        return <input type="text"
            ref={(e) => e ? e.selectionStart = this.props.name.length : null}
            defaultValue={this.props.name}
            onBlur={this.finishEdit.bind(this)}
            onKeyPress={this.checkEnter.bind(this)}
            autoFocus="true"
        />;
    }

    edit() {
        this.setState({editing: true});
    }

    finishEdit(e) {
        const value = e.target.value;
        if(this.props.onEdit){
            this.props.onEdit(value);
        }
        this.setState({editing: false});
    }

    checkEnter(e) {
        if(e.key == 'Enter'){
            this.finishEdit(e);
        }
    }


}
