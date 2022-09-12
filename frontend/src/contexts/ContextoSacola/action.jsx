import * as types from './action-types'

export const enviaPara_VariavelGlobal = (dispatch, pedidoRecebido) => {
  console.log("Passando pela action enviaParaSacola")
  // console.log(dispatch)
  // console.log(pedidoRecebido)



  //localStorage.setItem(pedidoEscolhido.key, JSON.stringify(pedidoEscolhido))
  dispatch({ type: types.ENVIA_PARA_VARIAVELCONTEXTOGERAL, payload: pedidoRecebido})

};

export const removeDa_Sacola = (dispatch, numPedidoDeRemocao) => {
  //console.log("Passando pela action enviaParaSacola")



  //localStorage.setItem(pedidoEscolhido.key, JSON.stringify(pedidoEscolhido))
  dispatch({ type: types.REMOVERA_PEDIDO_SACOLA, payload: numPedidoDeRemocao})

};
export const EnviaPedidosFinalizadosDa_Sacola = (dispatch, pedidosFinalizados) => {
  //console.log("Passando pela action enviaParaSacola")



  //localStorage.setItem(pedidoEscolhido.key, JSON.stringify(pedidoEscolhido))
  dispatch({ type: types.ENVIARA_PEDIDOS_DA_SACOLA, payload: pedidosFinalizados})

};
/*export const enviaParaSacola = (dispatch, pedidoRecebido) => {
  console.log("Passando pela action enviaParaSacola")


  //localStorage.setItem(pedidoEscolhido.key, JSON.stringify(pedidoEscolhido))
  dispatch({ type: types.ENVIA_PARA_SACOLA, payload: pedidoRecebido})

};*/
