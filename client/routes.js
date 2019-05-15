import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  DiverHome,
  Scanner,
  AllShops,
  SingleShop,
  AllLogs,
  SingleLog,
  AddLog,
  SingleBadge,
  AllObservations,
  AllOfferedDives,
  ShopQR,
  SingleCert,
  CreateCert,
  ObservationSearch,
  SingleDiverMap,
  DiverAnalysis,
  SingleObservation,
  SingleOfferedDive,
  ObservationsMap,
  LoadingComponent
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isOwner} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/qr" component={Scanner} />
        <Route path="/mymap" component={SingleDiverMap} />
        <Route exact path="/loading" component={LoadingComponent} />
        <Route exact path="/allshops/:shopId" component={SingleShop} />
        <Route exact path="/allshops" component={AllShops} />
        <Route
          exact
          path="/alloffereddives/:diveId"
          component={SingleOfferedDive}
        />
        <Route exact path="/alloffereddives" component={AllOfferedDives} />
        <Route exact path="/observations" component={AllObservations} />

        <Route path="/login" component={Login} />
        <Route path="/badges/:diverId" component={SingleBadge} />
        <Route path="/signup" component={Signup} />
        <Route path="/logs/:id" component={SingleLog} />
        <Route path="/logs" component={AllLogs} />
        <Route path="/observations/map/:obsId" component={ObservationsMap} />
        <Route path="/observations/:obsId" component={SingleObservation} />
        <Route path="/search" component={ObservationSearch} />
        <Route path="/certs/create" component={CreateCert} />
        <Route path="/certs/:id" component={SingleCert} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home/analysis" component={DiverAnalysis} />
            <Route path="/home" component={DiverHome} />
            <Redirect exact from="/" to="/home" />
            <Route path="/create" component={AddLog} />
            {isOwner && <Route path="/shopqr" component={ShopQR} />}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.diver.id,
    isOwner: !!state.diver.diveshopId
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
