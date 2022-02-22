
import * as types from './action-types'

export const reducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch(action.type) {
    case types.ENVIA_PARA_VARIAVELCONTEXTOGERAL: {
      console.log("Depois do reducer de verdade ser disparado, executo a função ENVIA_PARA_SACOLA")
      console.log(action.payload)

      //console.log(action)
      return (
        action.payload
      )


    }
    case types.REMOVERA_PEDIDO_SACOLA: {
      console.log("Executará a funcção de removerum pedido nummero: "  + action.payload)

      //console.log(action)
      return (
        action.payload
      )


    }
    case types.ENVIARA_PEDIDOS_DA_SACOLA: {
      console.log("Executará a funcção de Enviar os pedidos finalizados da sacola: "  + action.payload)

      //console.log(action)
      return (
        !action.payload
      )


    }

  }

  console.log('Não encontrey a action type')
  return { ...state }
}
