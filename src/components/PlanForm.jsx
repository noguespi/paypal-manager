import React from 'react';
import PaymentDefinitionForm from './PaymentDefinitionForm';
import {PaymentDefinition} from '../models/PaypalModels.js';
import clone from '../utils/clone.js'


export default class PlanForm extends React.Component {

    mutate(mutator){
        let plan = clone(this.props.plan);
        mutator(plan);
        this.props.onPlanChange(plan);
    }

    onNameChange(event) {
        this.mutate((plan) => {plan.name = event.target.value});
    }

    onDescriptionChange(event) {
        this.mutate((plan) => {plan.description = event.target.value});
    }

    onTypeChange(event) {
        this.mutate((plan) => {plan.type = event.target.value});
    }

    onPaymentDefinitionAdd(event) {
        event.preventDefault();
        this.mutate((plan) => {plan.payment_definitions.push(new PaymentDefinition())});
    }

    onPaymentDefinitionRemove(index) {
        this.mutate((plan) => {plan.payment_definitions.splice(index, 1)});
    }

    onPaymentDefinitionChange(index, paymentDefinition) {
        this.mutate((plan) => {plan.payment_definitions[index] = paymentDefinition});
    }

    onSetupFeeAmountChange(event) {
        this.mutate((plan) => {plan.merchant_preferences.setup_fee.value = event.target.value});
    }

    onSetupFeeCurrencyChange(event) {
        this.mutate((plan) => {plan.merchant_preferences.setup_fee.currency = event.target.value});
    }

    onCancelUrlChange(event) {
        this.mutate((plan) => {plan.merchant_preferences.cancel_url = event.target.value});
    }

    onReturnUrlChange(event) {
        this.mutate((plan) => {plan.merchant_preferences.return_url = event.target.value});
    }

    onMaxFailAttemptsChange(event) {
        this.mutate((plan) => {plan.merchant_preferences.max_fail_attempts = event.target.value});
    }

    onAutoBillAmountChange(event) {
        this.mutate((plan) => {plan.merchant_preferences.auto_bill_amount = event.target.value});
    }

    onInitialFailAmountActionChange(event){
        this.mutate((plan) => {plan.merchant_preferences.initial_fail_amount_action = event.target.value});
    }

    onEditInfos(event) {
        event.preventDefault();
        if(this.props.mode === "create"){
            return;
        }
        this.props.onEditPlanSubmit("infos", this.props.plan);
    }

    onEditPaymentDefinitions(event) {
        event.preventDefault();
        if(this.props.mode === "create"){
            return;
        }
        this.props.onEditPlanSubmit("payment_definitions", this.props.plan);
    }

    onEditMerchantPreferences(event) {
        event.preventDefault();
        if(this.props.mode === "create"){
            return;
        }
        this.props.onEditPlanSubmit("merchant_preferences", this.props.plan);
    }




    render() {

        return (
            <form className="form-horizontal">

                <h3>Infos</h3><hr/>
                <div className="form-group" hidden={this.props.mode === "create"}>
                    <label for="id" className="col-sm-2 control-label">ID</label>
                    <div className="col-sm-5">
                        <input id="name" className="form-control" value={this.props.plan.id} readOnly="yes" />
                    </div>
                </div>

                <div className="form-group">
                    <label for="name" className="col-sm-2 control-label">Name</label>
                    <div className="col-sm-5">
                        <input id="name" className="form-control" value={this.props.plan.name}
                               onChange={this.onNameChange.bind(this)} />
                    </div>
                </div>

                <div className="form-group">
                    <label for="description" className="col-sm-2 control-label">Description</label>
                    <div className="col-sm-10">
                        <input id="description" className="form-control" value={this.props.plan.description}
                               onChange={this.onDescriptionChange.bind(this)}/>
                    </div>
                </div>

                <div className="form-group">
                    <label for="type" className="col-sm-2 control-label">Type</label>
                    <div className="col-sm-2">
                        <select id="type" value={this.props.plan.type} onChange={this.onTypeChange.bind(this)}
                                className="form-control">
                            <option default>INFINITE</option>
                            <option>FIXED</option>
                        </select>
                    </div>
                </div>

                <div className="form-group" hidden={this.props.mode === "create"} >
                    <div className="col-sm-offset-2 col-sm-10">
                        <button className="btn btn-primary" onClick={this.onEditInfos.bind(this)} >Edit infos</button>
                    </div>
                </div>

                <h3>Payment definitions</h3><hr/>
                <div className="form-group">
                    <label for="type" className="col-sm-2 control-label">Payment Definitions</label>
                    <div className="col-sm-10">
                        <table className="table table-condensed">
                            <thead>
                            <tr>
                                <th style={{width: "120px"}}>Name</th>
                                <th style={{width: "120px"}}>Type</th>
                                <th style={{width: "20px"}}>Interval</th>
                                <th style={{width: "120px"}}>Frequency</th>
                                <th style={{width: "20px"}}>Cycles</th>
                                <th>Amount</th>
                                <th>Tax</th>
                                <th>Shipping</th>
                                <th>
                                    <button className="btn btn-info" title="Add a payment definition"
                                            onClick={this.onPaymentDefinitionAdd.bind(this)}>
                                        <i className="glyphicon glyphicon-plus"></i>
                                    </button>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.plan.payment_definitions.map((def, index) =>
                                <PaymentDefinitionForm mode={this.props.mode} planDef={def} key={index} index={index}
                                                       onPaymentDefinitionChange={this.onPaymentDefinitionChange.bind(this)}
                                                       onPaymentDefinitionRemove={this.onPaymentDefinitionRemove.bind(this)}
                                />
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="form-group" hidden={this.props.mode === "create"} >
                    <div className="col-sm-offset-2 col-sm-10">
                        <button className="btn btn-primary" onClick={this.onEditPaymentDefinitions.bind(this)} >Edit payment definitions</button>
                    </div>
                </div>


                <h3>Merchant preferences</h3><hr/>
                <div className="form-group">
                    <label for="setup_fee" className="col-sm-2 control-label">Setup Fee</label>
                    <div id="setup_fee" className="col-sm-10 form-inline">
                        <input className="form-control" style={{width: "80px"}}
                               value={this.props.plan.merchant_preferences.setup_fee.value}
                               onChange={this.onSetupFeeAmountChange.bind(this)} />
                        <select className="form-control" onChange={this.onSetupFeeCurrencyChange.bind(this)} >
                            <option value="EUR">EUR</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label for="cancel_url" className="col-sm-2 control-label">Cancel URL</label>
                    <div className="col-sm-10">
                        <input id="cancel_url" className="form-control" value={this.props.plan.merchant_preferences.cancel_url}
                               onChange={this.onCancelUrlChange.bind(this)} />
                    </div>
                </div>

                <div className="form-group">
                    <label for="return_url" className="col-sm-2 control-label">Return URL</label>
                    <div className="col-sm-10">
                        <input id="return_url" className="form-control" value={this.props.plan.merchant_preferences.return_url}
                               onChange={this.onReturnUrlChange.bind(this)} />
                    </div>
                </div>

                <div className="form-group">
                    <label for="max_fail_attempts" className="col-sm-2 control-label">Max Fail Attempts</label>
                    <div className="col-sm-10">
                        <input id="max_fail_attempts" className="form-control"  style={{width: "80px"}}
                               value={this.props.plan.merchant_preferences.max_fail_attempts}
                               onChange={this.onMaxFailAttemptsChange.bind(this)} />
                    </div>
                </div>

                <div className="form-group">
                    <label for="auto_bill_amount" className="col-sm-2 control-label">Auto Bill Amount</label>
                    <div className="col-sm-10">
                        <select id="auto_bill_amount" className="form-control"
                               value={this.props.plan.merchant_preferences.auto_bill_amount}
                               onChange={this.onAutoBillAmountChange.bind(this)} >
                            <option value="YES" >YES</option>
                            <option value="NO" >NO</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label for="initial_fail_amount_action" className="col-sm-2 control-label">Initial fail amount action</label>
                    <div className="col-sm-10">
                        <select id="initial_fail_amount_action" className="form-control"
                                value={this.props.plan.merchant_preferences.initial_fail_amount_action}
                                onChange={this.onInitialFailAmountActionChange.bind(this)} >
                            <option value="CANCEL" >CANCEL</option>
                            <option value="CONTINUE" >CONTINUE</option>
                        </select>
                    </div>
                </div>

                <div className="form-group" hidden={this.props.mode === "create"} >
                    <div className="col-sm-offset-2 col-sm-10">
                        <button className="btn btn-primary"  onClick={this.onEditMerchantPreferences.bind(this)} >Edit merchant preferences</button>
                    </div>
                </div>

            </form>
        )
    }
}