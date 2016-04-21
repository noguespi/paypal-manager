import React from 'react';
import { Link } from 'react-router'

export default class App extends React.Component {

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-default">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <Link className="navbar-brand" to="/" >Home</Link>
                            </div>

                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav">
                                    <li><Link to="/plan/list" >List plan</Link></li>
                                    <li><Link to="/plan/new" >New plan</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
