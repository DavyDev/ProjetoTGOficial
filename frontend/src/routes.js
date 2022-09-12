import React, { useState } from 'react'
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import CreateCountForLogin from './pages/CreateCountForLogin'
import { useContext } from 'react'
import { ContextoLoginProvider } from './contexts/ContextoLogin/context'
import { ContextoLogin } from './contexts/ContextoLogin/context'

const Private  = ({ children }) => {
  const navigates = useHistory()
  const { authenticated, loading } = useContext(ContextoLogin)
  console.log(authenticated)

  if(loading){
    console.log("Passei porqui xuxuuuu")
    return <div className='loaging'> Carregando...</div>
  }

  if(authenticated == false){
    navigates.push('/login')
  }

  return children
}
//{armazenaOsPedidos.length === 0 ? <></> :<></>}

export function Routes() {
  const { authenticated } = useContext(ContextoLogin)
  console.log(authenticated)
  return(
    <BrowserRouter>
    <Switch>
      <ContextoLoginProvider>
        <Route path='/home' exact > <Private> <Home /> </Private> </Route>
        <Route path='/home/clientePedidos' exact > <Private> <Home /> </Private> </Route>
        <Route path='/home/clienteMeusDados' exact > <Private> <Home /> </Private> </Route>
        <Route path='/home/clientePedidos/pedido/:detalhesDoPedido' exact > <Private> <Home /> </Private> </Route>
        <Route path='/home/clienteMeusDados/infoPessoais' exact > <Private> <Home /> </Private> </Route>
        <Route path='/home/clienteMeusDados/infoDeAcesso' exact > <Private> <Home /> </Private> </Route>
        <Route path='/register' exact > <CreateCountForLogin />  </Route>
        <Route path='/login' exact > <Login />  </Route>
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/dashboard/cadastrarPedidos' exact component={Dashboard} />
        <Route path='/dashboard/consultarPedidos' exact component={Dashboard} />
        <Route path='/dashboard/consultarEstoque' exact component={Dashboard} />
        <Route path='/dashboard/consultarSujestoes' exact component={Dashboard} />
      </ContextoLoginProvider>
      
    </Switch>
  </BrowserRouter>
  )

}








// eslint-disable-next-line import/no-anonymous-default-export

