
import React from 'react'
import * as Rotas from './routes.js';

import { useContext } from 'react'
import { ContextoLogin, ContextoLoginProvider } from './contexts/ContextoLogin/context'

function App() {
  return(  
    <ContextoLoginProvider>
      <Rotas.Routes />
    </ContextoLoginProvider>
  )
}

export default App;
