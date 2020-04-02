import { Typography, Button, useTheme } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'

export default () => {
  const history = useHistory()
  const theme = useTheme()

  const handleClick = () => {
    history.replace('/send-link')
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h6" align="center" style={{ paddingBottom: theme.spacing(2) }}>
        Welcome to <b>Holomeeting Helper</b>.<br />
        Please sign in to continue.
      </Typography>
      <Button variant="outlined" onClick={handleClick}>
        Sign in with a Magic Link
      </Button>
    </div>
  )
}
