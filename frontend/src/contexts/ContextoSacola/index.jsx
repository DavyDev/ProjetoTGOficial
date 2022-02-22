
import { createContext, useState, useEffect, useReducer } from 'react';
import P from 'prop-types'
import { reducer } from './reducer';
import { data } from './data';
import { ContextoSacola } from './context';
import * as types from './action-types'



let armazenaOsPedidos = []
let armazenaOsPrecos = 0
let numeroTooltipo = 0

export const ContextoSacolaProvider = ({children}) => {

  const [pedidoState, pedidoDispatch] = useReducer(reducer, "data")
  const [remocaoState, remocaoDispatch] = useReducer(reducer, -1)
  const [contador, setContador] = useState(0)
  const [finalizaPedidosSacola, setFinalizaPedidosSacolaDispatch] = useReducer(reducer, false)

  let zinha = 0

  if(finalizaPedidosSacola == true){
    armazenaOsPedidos = []
    setFinalizaPedidosSacolaDispatch(false)
    setContador(0)
  }

  console.log(finalizaPedidosSacola)

  //const [armazenaTodosPedidos, //setArmazenaTodosPedidos] = useState()
  useEffect(() => {
    console.log("O pedido atualizou e agora é:")

    if(pedidoState === "data"){
      armazenaOsPedidos = []
    }
    else{
      armazenaOsPedidos.push(pedidoState)
      numeroTooltipo = (numeroTooltipo + 1)
      setContador(armazenaOsPedidos.length)

      for(let i = 0; i < armazenaOsPedidos.length; i++) {
        zinha = zinha + (Number(armazenaOsPedidos[i].preco))

      }

      armazenaOsPrecos = zinha
      console.log(armazenaOsPrecos)

    }
    console.log("Olocooooooooooooooo é Aquiiii")
    console.log(armazenaOsPedidos)

    //console.log(numeroTooltipo)

  },[pedidoState])


  if(remocaoState == remocaoState || remocaoState != remocaoState){

  }
  useEffect(() => {

    // eslint-disable-next-line eqeqeq
    if(numeroTooltipo == 0) {
      console.log("respeitou o If")
      armazenaOsPedidos = []
    }
    else{

      console.log("Passou")
      console.log(remocaoState)


      for(let i = 0; i < armazenaOsPedidos.length; i++) {
        // eslint-disable-next-line eqeqeq
        if(armazenaOsPedidos[i].codRandon == remocaoState) {
          console.log("Eencontrei, a posição é:")
          console.log(i)
          armazenaOsPedidos.splice(i, 1)
          setContador(armazenaOsPedidos.length)
        }
      }

      for(let i = 0; i < armazenaOsPedidos.length; i++) {
        zinha = zinha + (Number(armazenaOsPedidos[i].preco))

      }

      armazenaOsPrecos = zinha
      console.log(armazenaOsPrecos)



      //armazenaOsPedidos = [{...armazenaOsPedidos}]
    }



      //armazenaOsPedidos = [{titulo: "Teste"}]
      //numeroTooltipo = (numeroTooltipo + 1)
      //setContador(contador + 1)
      //let zinha = 0
      //for(let i = 0; i < armazenaOsPedidos.length; i++) {
        //zinha = zinha + (Number(armazenaOsPedidos[i].preco))

      //}

      //armazenaOsPrecos = zinha
      //console.log(armazenaOsPrecos)



    //console.log(numeroTooltipo)

  },[remocaoState])

  //useEffect(() => {
    //console.log("Aqui o estado foi atualizado")
    //console.log(pedidoState)
    //console.log("Aqui mostra o val atual da const que armazena os pedidos")

    //Esse for faz a retirada do valor "null" que é inserido na variavel pelo useEffect ser chamado após a primeira montagem
    //for(let i = 0; i <= armazenaOsPedidos.length; i++ ) {

      //const pegaIndice = (armazenaOsPedidos.indexOf("null"))
      //if(i === pegaIndice){
      //  armazenaOsPedidos.splice(pegaIndice, 1)
     // }
    //}

    //armazenaOsPedidos.push(pedidoState.pedidos)
    //console.log(armazenaOsPedidos)
    //setArmazenaTodosPedidos(armazenaOsPedidos)
 // }, [pedidoState])





  return( <ContextoSacola.Provider value={{ pedidoState, pedidoDispatch, remocaoDispatch, armazenaOsPedidos, armazenaOsPrecos, remocaoState, contador, setFinalizaPedidosSacolaDispatch}}>
            {children}
           </ContextoSacola.Provider>
    )

}

ContextoSacolaProvider.propTypes = {
  children: P.node.isRequired,
}

