import React from 'react'
import { Link } from 'react-router'

export default class Footer extends React.Component {
  render () {
    var toDate = new Date().getFullYear()>2015&&'-'+new Date().getFullYear()
    return (
      <div>
          <hr/>
          <div className='text-center'>
            &copy; 2015{toDate}, HedgeServ | <Link to='About'>About</Link>
          </div>
      </div>
    )
  }
}
