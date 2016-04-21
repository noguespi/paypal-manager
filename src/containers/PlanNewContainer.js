import { connect } from 'react-redux'
import PlanNew from '../components/PlanNew';
import * as actions from '../redux/actions';

const mapStateToProps = null; // function(state, ownProps) {};

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        createPlan: (plan) => {dispatch(actions.createPlan(plan)); },
    }
}

const PlanNewContainer = connect(mapStateToProps,mapDispatchToProps)(PlanNew);
export default PlanNewContainer;