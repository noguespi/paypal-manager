import { connect } from 'react-redux'
import PlanEdit from '../components/PlanEdit';
import * as actions from '../redux/actions';

const mapStateToProps = function(state, ownProps) {
    return {
        plan: state.get("edited_plan")
    }
};

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        onEditPlanChange: (plan) => {dispatch({type: "EDIT_PLAN_CHANGE", plan: plan}); },
        onEditPlanSubmit: (plan, mode) => {dispatch(actions.editPlan(plan, mode)); }
    }
}


const PlanEditContainer = connect(mapStateToProps,mapDispatchToProps)(PlanEdit);
export default PlanEditContainer;