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
import allOfferedDives from './AllOfferedDivesReducer'
import offeredDivesBySingleShop from './offeredDivesBySingleShopReducer'

const reducer = combineReducers({
  diver,
  shops,
  singleShop,
  logs,
  singleLog,
  diverLogs,
  diverCerts,
  diverBadges,
  allOfferedDives,
  offeredDivesBySingleShop
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
export * from './AllOfferedDivesReducer'
export * from './offeredDivesBySingleShopReducer'
