import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import cn from 'classnames'
import topBubbles from './assets/img/top-bubbles.svg'
import whiteLogo from './assets/img/white-logo.svg'
import blueLogo from './assets/img/blue-logo.svg'

const Header = ({ homepage }) => {

    const history = useHistory()

    return (
        <header className={cn("desktopHeader" ,homepage ? "homepage" : "")}>
            <div className="container">
                <div className="wrapper">
                    <img src={topBubbles} alt="" className="topBubbles" />
                    <div id="back" className="back" onClick={history.goBack}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.0303 7.46967C14.3232 7.76256 14.3232 8.23744 14.0303 8.53033L10.5607 12L14.0303 15.4697C14.3232 15.7626 14.3232 16.2374 14.0303 16.5303C13.7374 16.8232 13.2626 16.8232 12.9697 16.5303L8.96967 12.5303C8.67678 12.2374 8.67678 11.7626 8.96967 11.4697L12.9697 7.46967C13.2626 7.17678 13.7374 7.17678 14.0303 7.46967Z" fill="#0E2F56" />
                        </svg>
                        <p>Назад</p>
                    </div>
                    
                    <NavLink exact to="/" className="logo">
                        <img src={whiteLogo} alt="" className="white" />
                        <img src={blueLogo} alt="" className="blue" />
                    </NavLink>
                    <div className="menu">
                        <ul>
                            <li><NavLink exact to="/about" activeClassName="active">О приложении</NavLink></li>
                            <li><NavLink exact to="/help" activeClassName="active">Помощь</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
