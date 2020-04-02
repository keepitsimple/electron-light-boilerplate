import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import React, { FC, Suspense, lazy } from 'react'
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom'
import { theme } from './style/theme'

const Welcome = lazy(() => import('./routes/Welcome'))

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" exact component={Welcome} />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  )
}

export default App
