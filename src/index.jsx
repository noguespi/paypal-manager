import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";
import {Router, Route, IndexRoute, Link, hashHistory} from "react-router";
import createLogger from "redux-logger";
import paypal from "paypal-rest-sdk";
import reducer from "./redux/reducers";
import App from "./components/App";
import creds from "./credentials";
import {Home} from "./components/Pages";
import "bootstrap/dist/css/bootstrap.css";
import "./main.css";
import PlansContainer from "./containers/PlansContainer";
import PlanNewContainer from "./containers/PlanNewContainer";
import PlanEditContainer from "./containers/PlanEditContainer";

console.log("paypal.configure", creds);
paypal.configure(creds);


const loggerMiddleware = createLogger();
var store = createStore(reducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="plan/list" component={PlansContainer} />
                <Route path="plan/new" component={PlanNewContainer} />
                <Route path="plan/edit" component={PlanEditContainer} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);