import { connect } from 'react-redux'
import Plans from '../components/Plans';
import * as actions from '../redux/actions';

const mapStateToProps = function(state, ownProps) {
    return state.get('plans').toObject();
};

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        fetchPlans: (type) => { dispatch(actions.fetchPlans(type)); },
        setPlans: () => {dispatch(actions.setPlans()); },
        editPlan: (planId) => {dispatch(actions.fetchPlan(planId))},
        disablePlan: (planId) => {dispatch(actions.disablePlan(planId)); },
        enablePlan: (planId) => {dispatch(actions.enablePlan(planId)); },
        deletePlan: (planId) => {
            if(confirm("delete plan " + planId)){
                dispatch(actions.deletePlan(planId));
            }
        },
    }
}

const PlansContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Plans);
export default PlansContainer;