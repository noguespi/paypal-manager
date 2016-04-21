import React from 'react';

export default class PlanSummary extends React.Component {

    render() {

        var activeButton;
        if(this.props.state === "ACTIVE") {
            activeButton = <button className="btn btn-default" onClick={this.props.disablePlan.bind(null, this.props.id)} >disable</button>
        } else {
            activeButton = <button className="btn btn-default" onClick={this.props.enablePlan.bind(null, this.props.id)} >enable</button>
        }

        return (
            <tr>
                <td>
                    <button className="btn btn-primary" onClick={this.props.editPlan.bind(null, this.props.id)} >edit</button>&nbsp;
                    {activeButton}&nbsp;
                    <button className="btn btn-danger" onClick={this.props.deletePlan.bind(null, this.props.id)} >delete</button>
                </td>
                <td><span title={this.props.id} >{this.props.name}</span></td>
                <td>{this.props.state}</td>
                <td>{this.props.description}</td>
                <td>{this.props.type}</td>
                <td>{this.props.create_time}</td>
                <td>{this.props.update_time}</td>
            </tr>
        )
    }
}