import React from 'react'

const ExternalLink = ({ to, children, className }) => {
    return <a href={to} className={className || ''} target='_blank' rel='noreferrer'>{children}</a>
}

export default ExternalLink