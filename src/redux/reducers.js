import Immutable from 'immutable';
import {PlanModel} from '../models/PaypalModels'

const PLAN_INITIAL_STATE = Immutable.Map({
    fetching: false,
    update: 0,
    type: 'ACTIVE',
    items: []
});

export const INITIAL_STATE = Immutable.Map({
    plans: PLAN_INITIAL_STATE,
    edited_plan: new PlanModel()
});

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "EDIT_PLAN_CHANGE":
            return state.set('edited_plan', action.plan);

        case "CLEAR_PLANS":
            return state.set('plans', PLAN_INITIAL_STATE);

        case "FETCHING_PLANS":
            return state.setIn(['plans', 'fetching'], action.status);

        case "RECEIVE_PLANS":
            return state
                .updateIn(['plans', 'items'] , items => items.concat(action.plans))
                .setIn(['plans', 'update'], Date.now());

        case "PLAN_UPDATE":{
            var plans = [...state.getIn(['plans', 'items'])];
            for (var i = 0; i < plans.length; i++) {
                if (plans[i].id === action.plan.id) {
                    plans[i] = action.plan;
                    break;
                }
            }
            return state.setIn(['plans', 'items'], plans);
        }

        case "PLAN_DELETE":{
            return state.updateIn(['plans', 'items'], (plans) => plans.filter((plan) => plan.id != action.planId));
        }

    }
    return state;
}
