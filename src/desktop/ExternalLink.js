import React from 'react'
const ExternalLink = (props) => {
    console.log(props);
    return <a onClick={() => window.location.href = props.link} className={props.className || ''} target='_blank' rel='noreferrer'>{props.children}</a>
}

export default ExternalLink