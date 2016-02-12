import React, { PropTypes } from 'react'
import NavBar from 'components/NavBar'
import Footer from 'containers/Footer'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../styles/core.scss'

function CoreLayout ({ children }) {
  return (
  <div>
    <NavBar/>
    <div className='container'>
        <div id='root' style={{height: '100%'}}>
          {children}
        </div>
        <div className='footer'>
          <Footer/>
        </div>
    </div>
  </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
