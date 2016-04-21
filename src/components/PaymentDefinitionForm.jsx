import React from 'react';
import clone from '../utils/clone'

export default class PaymentDefinitionForm extends React.Component {

    constructor(props){
        super(props);
    }

    mutate(mutator){
        let paymentDefinition = clone(this.props.planDef);
        mutator(paymentDefinition);
        this.props.onPaymentDefinitionChange(this.props.index, paymentDefinition);
    }
    
    onNameChange(event) {
        this.mutate((plan) => {plan.name = event.target.value});
    }

    onTypeChange(event) {
        this.mutate((plan) => {plan.type = event.target.value});
    }

    onFrequencyIntervalChange(event){
        this.mutate((plan) => {plan.frequency_interval = event.target.value});
    }

    onFrequencyChange(event){
        this.mutate((plan) => {plan.frequency = event.target.value});
    }

    onCyclesChange(event){
        this.mutate((plan) => {plan.cycles = event.target.value});
    }

    onAmountValueChange(event){
        this.mutate((plan) => {plan.amount.value = event.target.value});
    }

    onAmountCurrencyChange(event){
        this.mutate((plan) => {plan.amount.currency = event.target.value});
    }

    onTaxAmountValueChange(event){
        this.mutate((plan) => {plan.tax.value = event.target.value});
    }

    onTaxAmountCurrencyChange(event){
        this.mutate((plan) => {plan.tax.currency = event.target.value});
    }

    onShippingAmountValueChange(event){
        this.mutate((plan) => {plan.shipping.value = event.target.value});
    }

    onShippingAmountCurrencyChange(event){
        this.mutate((plan) => {plan.shipping.currency = event.target.value});
    }    

    onPaymentDefinitionRemove = (event) => {
        event.preventDefault();
        this.props.onPaymentDefinitionRemove(this.props.index);
    }

    render() {
        return (
            <tr className="paydef">
                <td>
                    <input className="form-control"
                           value={this.props.planDef.name} onChange={this.onNameChange.bind(this)} />
                </td>
                <td>
                    <select className="form-control"
                            value={this.props.planDef.type} onChange={this.onTypeChange.bind(this)}>
                        <option>REGULAR</option>
                        <option>TRIAL</option>
                    </select>
                </td>
                <td>
                    <input maxLength="2" className="form-control"
                           value={this.props.planDef.frequency_interval} onChange={this.onFrequencyIntervalChange.bind(this)} />
                </td>
                <td>
                    <select className="form-control"
                            value={this.props.planDef.frequency} onChange={this.onFrequencyChange.bind(this)}>
                        <option value="DAY" >DAY</option>
                        <option value="WEEK">WEEK</option>
                        <option value="MONTH">MONTH</option>
                        <option value="YEAR">YEAR</option>
                    </select>
                </td>
                <td>
                    <input maxLength="2" className="form-control"
                           value={this.props.planDef.cycles} onChange={this.onCyclesChange.bind(this)} />
                </td>
                <td>
                    <div className="form-inline">
                        <input className="form-control"  style={{width:"50px"}}
                           value={this.props.planDef.amount.value} onChange={this.onAmountValueChange.bind(this)} />

                        <select className="form-control"  style={{width:"70px"}}
                                value={this.props.planDef.amount.currency} onChange={this.onAmountCurrencyChange.bind(this)}>
                            <option value="EUR" >EUR</option>
                            <option value="USD" >USD</option>
                        </select>
                    </div>
                </td>
                <td>
                    <div className="form-inline">
                        <input className="form-control" style={{width:"50px"}}
                               value={this.props.planDef.tax.value} onChange={this.onTaxAmountValueChange.bind(this)} />

                        <select className="form-control"  style={{width:"70px"}}
                                value={this.props.planDef.tax.currency} onChange={this.onTaxAmountCurrencyChange.bind(this)}>
                            <option value="EUR" >EUR</option>
                            <option value="USD" >USD</option>
                        </select>
                    </div>
                </td>
                <td>
                    <div className="form-inline">
                        <input className="form-control" style={{width:"50px"}}
                               value={this.props.planDef.shipping.value} onChange={this.onShippingAmountValueChange.bind(this)} />

                        <select className="form-control"  style={{width:"70px"}}
                                value={this.props.planDef.shipping.currency} onChange={this.onShippingAmountCurrencyChange.bind(this)}>
                            <option value="EUR" >EUR</option>
                            <option value="USD" >USD</option>
                        </select>
                    </div>
                </td>                
                <td>
                    <button className="btn btn-danger" onClick={this.onPaymentDefinitionRemove}>
                        <i className="glyphicon glyphicon-remove" ></i>
                    </button>
                </td>
            </tr>
        )
    }
}