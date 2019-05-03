import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import diver from './diverReducer'
import shops from './diveShopsReduder'
import singleShop from './singleShopReducer'
import logs from './allLogsReducer'
import singleLog from './singleLogReducer'
import diverProfile from './diverProfileReducer'
import diverCerts from './diverCertsReducer'

const reducer = combineReducers({
  diver,
  shops,
  singleShop,
  logs,
  singleLog,
  diverProfile,
  diverCerts
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './diverReducer'
export * from './diveShopsReduder'
export * from './singleShopReducer'
export * from './allLogsReducer'
export * from './singleLogReducer'
export * from './diverProfileReducer'
export * from './diverCertsReducer'
