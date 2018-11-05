import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Link} from 'react-router-dom';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <div className="header flex">
                <Link to={"/"}>
                    <img src="img/movie3.png" className="header-img" alt=""/>
                </Link>
                <Link to={"/"}>
                    <h1 className="header-title">My Cinema</h1>
                </Link>
            </div>
        )
    }
}