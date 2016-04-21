import paypal from 'paypal-rest-sdk';
import { hashHistory } from 'react-router'
import {Amount} from "../models/PaypalModels";


export function fetchPlan(planId) {
    console.log("fetchPlan", planId);
    return function(dispatch) {
        paypal.billingPlan.get(planId, function (error, billingPlan) {
            if (error) {
                console.log(error);
                throw error;
            } else {
                dispatch({type: "EDIT_PLAN_CHANGE", plan: convertPlanFromPaypal(billingPlan)});
                hashHistory.push('/plan/edit');
            }
        });

    }
}

export function editPlan(mode, plan){
    return function(dispatch) {
        var planId = plan.id;
        plan = convertPlanToPaypal(plan);

        delete plan.id;
        delete plan.state;
        delete plan.httpStatusCode;
        delete plan.links;

        var patch = {
            "op": "replace"
        };
        switch(mode){
            case "infos":
                delete plan.payment_definitions;
                delete plan.merchant_preferences;
                patch.path = "/";
                patch.value = plan;
                break;

            case "payment_definitions":
                patch.path = "/payment-definitions[0]";
                patch.value = plan.payment_definitions[0];
                break;

            case "merchant_preferences":
                patch.path = "/merchant-preferences";
                patch.value = plan.merchant_preferences;
                break;
        }

            console.log(patch);
        //     return;

        paypal.billingPlan.update(planId, [patch], function (error, response) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                dispatch(fetchPlan(planId));
            }
        });
    }
}

export function createPlan(plan) {
    return function(dispatch) {
        delete plan.id;
        convertPlanToPaypal(plan);
        paypal.billingPlan.create(plan, function (error, billingPlan) {
            if (error) {
                console.log("error happened", error);
                throw error;
            } else {
                dispatch({type: "EDIT_PLAN_CHANGE", plan: convertPlanFromPaypal(billingPlan)});
                hashHistory.push('/plan/edit');
            }
        });
    }
}

function convertPlanToPaypal(plan){
    for(var i=0; i<plan.payment_definitions.length; i++){
        let payDef = plan.payment_definitions[i];
        payDef.charge_models = [];

        if(payDef.tax.amount > 0){
            payDef.charge_models.push({type: "TAX",amount: plan.tax});
        }

        if(payDef.shipping.amount > 0){
            payDef.charge_models.push({type: "SHIPPING",amount: plan.shipping});
        }

        delete payDef.tax;
        delete payDef.shipping;
    }
    return plan;
}

function convertPlanFromPaypal(plan){
    for(var i=0; i<plan.payment_definitions.length; i++){
        let payDef = plan.payment_definitions[i];
        payDef.shipping = new Amount();
        payDef.tax = new Amount();
        payDef.frequency = payDef.frequency.toUpperCase();

        if(typeof(payDef.charge_models) === "undefined"){
            continue;
        }

        for(var j=0; j<payDef.charge_models.length; j++){
            var charge_model = payDef.charge_models[j];
            if(charge_model.type == "TAX"){
                payDef.tax = charge_model.amount;
            } else if(charge_model.type === "SHIPPING"){
                payDef.shipping = charge_model.amount;
            }

        }

        delete payDef.charge_models;
    }
    return plan;
}

export function deletePlan(billingPlanId) {
    return function (dispatch){
        var plan_delete_attributes = [{
            "op": "replace",
            "path": "/",
            "value": {
                "state": "DELETED"
            }
        }];
        paypal.billingPlan.update(billingPlanId, plan_delete_attributes, function (error, response) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                dispatch({type: "PLAN_DELETE", planId: billingPlanId});
            }
        });

    }
}

export function disablePlan(planId) {
    return updatePlan(planId, [{
        "op": "replace",
        "path": "/",
        "value": {
            "state": "INACTIVE"
        }
    }]);
}

export function enablePlan(planId) {
    return updatePlan(planId, [{
        "op": "replace",
        "path": "/",
        "value": {
            "state": "ACTIVE"
        }
    }]);
}

function updatePlan(billingPlanId, billing_plan_update_attributes) {
    // return {
    //     type: "PLAN_UPDATE",
    //     plan: {
    //         id: 2, name: "name#2#updated", state: "INACTIVE", description: "desc#2", type: "type#2",
    //         create_time: "create_time#2", update_time: "update_time#2"
    //     }
    // };
    return function (dispatch){
        paypal.billingPlan.update(billingPlanId, billing_plan_update_attributes, function (error, response) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log("response", response);
                paypal.billingPlan.get(billingPlanId, function (error, billingPlan) {
                    if (error) {
                        console.log(error.response);
                        throw error;
                    } else {
                        console.log(billingPlan.state);
                        dispatch({type: "PLAN_UPDATE", plan: billingPlan});
                    }
                });
            }
        });

    }
}

export function setPlans() {
    return function(dispatch) {
        var plans = [
            {id: 1, name: "name#1", state: "ACTIVE", description: "desc#1", type: "type#1", create_time: "create_time#1", update_time: "update_time#1"},
            {id: 2, name: "name#2", state: "INACTIVE", description: "desc#2", type: "type#2", create_time: "create_time#2", update_time: "update_time#2"}
        ];
        dispatch({type: "CLEAR_PLANS"});
        dispatch({type: "RECEIVE_PLANS", plans: plans});
    }

}

export function fetchPlans(planStatus) {
    return function (dispatch) {
        dispatch({type: "CLEAR_PLANS"});
        dispatch({type: "FETCHING_PLANS", status: true});
        dispatch(fetchMorePlans(planStatus, 0));
    }
}

function fetchMorePlans(planStatus, page) {
    const PAGE_SIZE = 10;
    return function (dispatch) {
        var list_billing_plan = {
            'status': planStatus,
            'total_required': 'yes',
            'page_size': PAGE_SIZE,
            'page': page
        };
        paypal.billingPlan.list(list_billing_plan, function (error, billingPlan) {
            if (error) {
                dispatch({type: "FETCHING_PLANS", status: false});
            } else {
                if(typeof(billingPlan.plans) === "undefined"){
                    billingPlan.plans = [];
                }

                dispatch({type: "RECEIVE_PLANS", plans: billingPlan.plans});

                if(billingPlan.plans.length < PAGE_SIZE){
                    dispatch({type: "FETCHING_PLANS", status: false});
                } else {
                    dispatch(fetchMorePlans(planStatus, (page+1) * PAGE_SIZE));
                }
            }
        });
    }
}

// function onPlanReci