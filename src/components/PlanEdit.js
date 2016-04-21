import React from 'react';
import paypal from 'paypal-rest-sdk';
import {PlanModel, PaymentDefinition} from '../models/PaypalModels';
import PlanForm from './PlanForm';
import clone from "clone";


export default class PlanEdit extends React.Component {

    onSubmit = (mode, plan) => {
        this.props.onEditPlanSubmit(mode, clone(plan));
    }


    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Edit Plan</h1>
                <PlanForm mode="edit" plan={this.props.plan}
                          onPlanChange={this.props.onEditPlanChange}
                          onEditPlanSubmit={this.onSubmit}
                />
            </div>
        )
    }
}