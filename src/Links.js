import React from 'react'
import './Links.scss'

const LinkReference = (content, className = 'btn btn-dark') => {
  return React.forwardRef((props, ref) => (
    <a href={props.href} className={className}>{content}</a>
  ))
}

export default LinkReference