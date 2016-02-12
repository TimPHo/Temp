import React from 'react'
import { Link } from 'react-router'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

export class NavBar extends React.Component {
  static propTypes = {
  };

  get devTag () {
    if (!__PROD__) {
      return <div className='development'></div>
    }
  };

  render () {
    return (
      <div>
        {this.devTag}
        <Navbar>

          <Navbar.Header>
            <Navbar.Brand>
              <a href='/'>Haystack Rock <span className='version'>v1.0.0</span></a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight>
              <li><Link to='/'><Glyphicon glyph='home'/> Home</Link></li>
              <li><Link to='/404'><Glyphicon glyph='stats'/> Metrics</Link></li>
              <NavDropdown eventKey={3} title='Administration' id='basic-nav-dropdown'>
                <li><Link to='/Admin/User'><Glyphicon glyph='user'/> Users Access</Link></li>
                <li><Link to='/Admin/User'><Glyphicon glyph='cog'/> Settings</Link></li>
              </NavDropdown>
              <NavDropdown eventKey={4} title='[Username]' id='basic-nav-dropdown'>
                <li><Link to='/'><Glyphicon glyph='user'/> Profile</Link></li>
                <li><Link to='/'><Glyphicon glyph='lock'/> Password</Link></li>
                <MenuItem divider />
                <li><Link to='/'><Glyphicon glyph='log-out'/> Sign out</Link></li>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

        </Navbar>
      </div>
    )
  }
}

export default NavBar
