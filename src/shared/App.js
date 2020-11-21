import React from 'react'
import { Route } from 'react-router-dom'

import { 
  Home    
} from 'pages/index.async.js'    // 코드 스플리팅 적용

const App = () => {

  return (
      <div>
          <Route exact path="/" component={Home}/>
      </div>
  )
}

export default App