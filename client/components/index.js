/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as DiverHome} from './diver-home'
export {Login, Signup} from './auth-form'
export {default as Scanner} from './QRscanner'
export {default as AllShops} from './AllShops'
export {default as SingleShop} from './SingleShop'
export {default as AllLogs} from './AllLogs'
export {default as SingleLog} from './SingleLog'
export {default as SingleBadge} from './SingleBadge'
export {default as AllObservations} from './AllObservations'
export {default as AllOfferedDives} from './AllOfferedDives'
