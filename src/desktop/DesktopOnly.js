import React from 'react'
import ExternalLink from './ExternalLink'
import appImg from './assets/img/app.png'
import googleImg from './assets/img/google.png'
import blueLogo from './assets/img/blue-logo.svg'
import desktopOnlyImg from './assets/img/desktop-only.png'

const DesktopOnly = ({app, google}) => {
    return (
        <div id="desktopOnly">
		<div className="wrapper">
			<div className="left">
				<img src={blueLogo} alt="" className="logo" />
				<img src={desktopOnlyImg} alt="" className="dec portrait" />
				<p>Раздел для организаторов и владельцев бизнеса доступен только на большом экране.</p>
				<ExternalLink to={app} className="shop">
					<img src={appImg} alt="" />
				</ExternalLink>
				<ExternalLink to={google} className="shop">
					<img src={googleImg} alt="" />
				</ExternalLink>
			</div>
			<img src={desktopOnlyImg} alt="" className="dec landscape" />
		</div>
	</div>
    )
}

export default DesktopOnly
