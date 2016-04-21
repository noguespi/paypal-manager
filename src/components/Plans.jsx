import React from 'react';
import Loader from 'react-loader';
import PlanSummary from './PlanSummary.jsx';

export default class Plans extends React.Component {

    state = {
        planType: "active"
    }

    planTypeChange(event) {
        this.setState({planType: event.target.value}, () => this.fetchPlans());
    }

    componentDidMount() {
        if (this.props.update === 0) {
            this.fetchPlans();
        }
    };

    fetchPlans() {

        this.props.fetchPlans(this.state.planType);
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Plans</h1>

                <table className="table">
                    <thead>
                    <tr>
                        <th>actions</th>
                        <th>name</th>
                        <th>state</th>
                        <th>description</th>
                        <th>type</th>
                        <th>create</th>
                        <th>update</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.items.map(plan =>
                        <PlanSummary key={plan.id} {...plan}
                                     editPlan={this.props.editPlan}
                                     disablePlan={this.props.disablePlan}
                                     enablePlan={this.props.enablePlan}
                                     deletePlan={this.props.deletePlan}
                        />
                    )}
                    <tr>
                        <td colSpan="7">Total plans : {this.props.items.length}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="form-inline">
                    <select className="form-control" onChange={this.planTypeChange.bind(this)}
                            value={this.state.planType}>
                        <option value="ACTIVE">active</option>
                        <option value="CREATED">created</option>
                        <option value="INACTIVE">inactive</option>
                    </select>
                    &nbsp;
                    <button className="btn btn-default" onClick={this.fetchPlans.bind(this)}>refresh</button>
                </div>
                <Loader loaded={!this.props.fetching}></Loader>
            </div>
        )
    }
}