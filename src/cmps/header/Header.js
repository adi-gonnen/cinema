import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <div className="header flex">
                <img src="img/movie3.png" className="header-img"/>
                <h1 className="header-title">Herolo Cinema</h1>
            </div>
        )
    }
}