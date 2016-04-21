import React from 'react';
import {PlanModel, PaymentDefinition} from '../models/PaypalModels';
import PlanForm from './PlanForm';
import clone from "clone";


export default class PlanNew extends React.Component {

    constructor(props) {
        super(props);
        let plan = new PlanModel();
        plan.payment_definitions = [new PaymentDefinition()];
        this.state = {plan: plan}
    }

    onPlanChange = (plan) => {
        this.setState({plan: plan});
    }

    onPlanSubmit = (e) => {
        e.preventDefault();
        this.props.createPlan(clone(this.state.plan));
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>New Plan</h1>
                <PlanForm mode="create" plan={this.state.plan} onPlanChange={this.onPlanChange}/>
                <div className="row">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button className="btn btn-primary" onClick={this.onPlanSubmit}>Create</button>
                    </div>
                </div>
            </div>
        )
    }
}