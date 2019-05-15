import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import diver from './diverReducer'
import shops from './diveShopsReducer'
import singleShop from './singleShopReducer'
import logs from './allLogsReducer'
import singleLog from './singleLogReducer'
import diverLogs from './diverLogsReducer'
import diverCerts from './diverCertsReducer'
import diverBadges from './diverBadgesReducer'
import observations from './observationsReducer'
import allOfferedDives from './AllOfferedDivesReducer'
import SingleCert from './singleCertReducer'
import SingleObservation from './singleObservationReducer'
import singleOfferedDive from './SingleOfferedDiveReducer'
import observationsMap from './observationsMapReducer'

const reducer = combineReducers({
  diver,
  shops,
  singleShop,
  logs,
  singleLog,
  diverLogs,
  diverCerts,
  diverBadges,
  observations,
  allOfferedDives,
  SingleCert,
  SingleObservation,
  singleOfferedDive,
  observationsMap
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './diverReducer'
export * from './diveShopsReducer'
export * from './singleShopReducer'
export * from './allLogsReducer'
export * from './singleLogReducer'
export * from './diverLogsReducer'
export * from './diverCertsReducer'
export * from './diverBadgesReducer'
export * from './observationsReducer'
export * from './AllOfferedDivesReducer'
export * from './singleCertReducer'
export * from './singleObservationReducer'
export * from './SingleOfferedDiveReducer'
export * from './observationsMapReducer'
