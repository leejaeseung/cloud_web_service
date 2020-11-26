import React from 'react'
import { Route } from 'react-router-dom'
import { Container } from '@material-ui/core'

import { 
  Home,
  OriginRecipes,
  MyRecipes
} from 'pages/index.async.js'
import { GNB } from 'components'

const App = () => {

  return (
      <Container maxWidth="xl">
          <GNB/>
          <Route exact path="/" component={Home}/>
          <Route exact path="/originrecipes" component={OriginRecipes}/>
          <Route exact path="/myrecipes" component={MyRecipes}/>
      </Container>
  )
}

export default App