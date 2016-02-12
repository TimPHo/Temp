import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import { actions as counterActions } from '../../redux/modules/counter'
import DuckImage from './Duck.jpg'
import classes from './HomeView.scss'
import Button from 'react-bootstrap/lib/Button'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter: state.counter,
  username: state.auth.username
})

export class HomeView extends React.Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
  };

  render () {
    return (
      <div className='container text-center'>
        <div className='row'>
          Hello {this.props.username}! Whats up?
          <div className='col-xs-2 col-xs-offset-5'>
            <img className={classes.duck}
                 src={DuckImage}
                 alt='This is a duck, because Redux' />
          </div>
        </div>
        <h1>Welcome to the React Redux Starter Kit</h1>
        <h2>
          Sample Counter:
          {' '}
          <span className={classes['counter--green']}>{this.props.counter}</span>
        </h2>
        <Button bsStyle='primary' onClick={() => this.props.increment(1)}>
          Increment
        </Button>
        {' '}
        <Button bsStyle='success' onClick={this.props.doubleAsync}>
          Double (Async)
        </Button>
        <br/>
      </div>
    )
  }
}

export default connect(mapStateToProps, counterActions)(HomeView)
