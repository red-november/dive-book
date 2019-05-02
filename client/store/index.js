import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import shops from './diveShopsReduder'
import singleShop from './singleShopReducer'
import logs from './allLogsReducer'
import singleLog from './singleLogReducer'

const reducer = combineReducers({ user, shops, singleShop, logs, singleLog })


const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './diveShopsReduder'
export * from './singleShopReducer'
export * from './allLogsReducer'
export * from './singleLogReducer'