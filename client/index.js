import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import CssBaseline from '@material-ui/core/CssBaseline'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import cyan from '@material-ui/core/colors/cyan'
import lightBlue from '@material-ui/core/colors/lightBlue'

// establishes socket connection
import './socket'

const theme = createMuiTheme({
  palette: {
    secondary: cyan,
    primary: lightBlue
  },
  status: {
    danger: 'orange'
  }
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
