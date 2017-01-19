import React from 'react';
import { Link,IndexLink } from 'react-router';

import Auth from '../modules/Auth';

const Header =()=>(
    <div>
        <div>
            <h1>Portfolio</h1>
        </div>
        <div>
            <nav>
                <div className="nav-wrapper">
                    <ul id="nav-mobile" className="left">
                        {Auth.isUserAuthenticated() ? (
                                <div>
                                    <li><IndexLink to="/">HOME</IndexLink></li>
                                    <li><Link to="/profile">PROFILE</Link></li>
                                    <li><Link to="/post">POST</Link></li>
                                    <li><Link to="/admin">ADMIN</Link></li>
                                    <li><Link to="/logout">LOGOUT</Link></li>
                                </div>   ):(<div>
                                <li><IndexLink to="/">HOME</IndexLink></li>
                                <li><Link to="/profile">PROFILE</Link></li>
                                <li><Link to="/login">LOGIN</Link></li>
                            </div>)}
                    </ul>
                </div>
            </nav>
        </div>
    </div>
);


export default Header;

