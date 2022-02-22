
import React, { useState, useEffect, useContext } from 'react'
import './style.css'

import tipoDeServico from "../../../assets/images/tipoDeServico/tipoDeServico.svg";

import { ContextoSacola } from "../../../contexts/ContextoSacola/context"
import { enviaPara_VariavelGlobal } from '../../../contexts/ContextoSacola/action';

let numeroRandon = (1 + Math.random())

function ModalPedidos(props) {

  const guardaContextoSacola = useContext(ContextoSacola)
  const { pedidoState, pedidoDispatch } = guardaContextoSacola
  //Quando o cliente clicar no pedido ele é armazenado na variável de estado abaixo

  //Essa é uma variável global do armazenamento do pedido
  let pedido = props.pedidoEscolhido
  console.log("1234567890_______")
  console.log(pedido)

  const [quantiEVal, setQuantiEVal] = useState(1)
  const [habilitaBotaoMenos ,setHabilitaBotaoMenos] = useState(false)

  const diminuirDropOn = habilitaBotaoMenos ? "DiminuirOFF" : "DiminuirON"

  useEffect(() => {
    //console.log(quantiEVal)
    //console.log(quantiEVal)
    pedido = {...pedido, quantidade: quantiEVal }
    pedido = {...pedido, preco: (pedido.preco * quantiEVal).toFixed(2) }
    console.log(pedido)

    if (quantiEVal <= 1){
      console.log("Aqui émenor ou igual a 1")
      setHabilitaBotaoMenos(true)
    }
    else{
      console.log("Aqui é MAIOR ou igual a 1")
      setHabilitaBotaoMenos(false)
    }


  },[quantiEVal])

  //quantiEVal//useEffect(() => {
    //console.log("UseEffct 2")
    //console.log(teste)


  //},[teste])






  if (!props.isOpen) {
    return null
  }
  else{
  }

  //Função que faz diminuir a quantidade e chama outra função (alteraValorObjeto) para alterar o valor
  function diminuir (passaOPedido) {
    //console.log("Estou na funcção (Diminuir)")

    setQuantiEVal(quantiEVal - 1)
    //console.log(passaOPedido)
    //alteraValorObjeto(passaOPedido)

    console.log(pedidoState)

  }

  function aumentar (passaOPedido) {
    //console.log("Estou na funcção (Diminuir)")

    setQuantiEVal(quantiEVal + 1)
    console.log(passaOPedido)
    //alteraValorObjeto(passaOPedido)

  }

  function enviaProContextGeral() {
    enviaPara_VariavelGlobal(pedidoDispatch, {...pedido, codRandon: numeroRandon})
    props.onClickClose()

    numeroRandon = (numeroRandon + 1)
  }








  //console.log(`props.isOpen está : ${props.isOpen}`)
  //console.log(props.pedidoEscolhido)
  //props.pedidoEscolhido.preco = 2
  //console.log(props.pedidoEscolhido)





  /*




  console.log(props.pedidoEscolhido.titulo)


  //const [guardaContexto, setGuardaContexto] = useState()

  const { pedidoState, pedidoDispatch } = useContext(guardaContextoSacola)

  console.log('---------------------------------')
  //const [valQuantidade, setValQuantidade] = useState(1)
  // const [disabled, setDisabled] = useState(true)

  const diminuiQnt = () => {
    if (valQuantidade === 1) {
      return console.log("Não é possível diminuir a quantidade")
    }
    else {
      setValQuantidade((valQuantidade - 1))
    }
  }

  const aumentaQnt = () => {

    setValQuantidade((valQuantidade + 1))
    setDisabled(false)
  }

  //useEffect(() => {

  //}, [])

  //useEffect(() => {
  //  console.log(valQuantidade)

  //  if(valQuantidade === 1){
  //    setDisabled(true)


//},[valQuantidade])



const addSacola = async () => {
  await console.log("Aqui chamo a action")
  //await pedidoDispatch({ type: actions.INSERE_LOCAL_STORAGE, payload: props.pedidoEscolhido})
  await inserePedidoLocalStorage(pedidoDispatch, props.pedidoEscolhido)
  //console.log("estou aqui")
  //console.log(guardaContextoSacola)

  await console.log("A sacola foi fechada")
  console.log("oi")
  await props.onClickClose()

  -----------------------------------------------------------------------------------------------
  <div className="ModalOverlay">
        <div className='ModalPedidos'>
          <button className="ModalPedidos_botaoFechar" onClick={props.onClickClose}>X</button>


          <div className="boxDetalhesPedidoEscolhido">
            <div className="ImagemPedidoEscolhido">
              imagem
            </div>
            <div className="PedidoEscolhido">
              <div className="PedidoEscolhidoTitulo">
                {props.pedidoEscolhido.titulo}
              </div>
              <div className="PedidoEscolhidoDescricao">
                <p>{props.pedidoEscolhido.descricao}</p>
              </div>
              <div className="TipoDeServicos">
                <div className="TituloDeServicos">
                  Tipo de serviço
                </div>
                <div className="ImgTipoServicos">
                  <img src={tipoDeServico} alt="" /> <span>No local</span>
                </div>
              </div>

              <div className="PedidoEscolhidoPreco">
                R$ {props.pedidoEscolhido.preco}
              </div>
              <div className="PeddoEscolhidoQntVal">
                <div className="Qnt">
                  <button disabled={Boolean(disabled)} className="Diminuir" onClick={() => { diminuiQnt() }}> - </button> {valQuantidade} <button className="Aumentar" onClick={() => { aumentaQnt() }}> + </button>
                </div>
                <div className="Val">
                  <button onClick={() => { addSacola() }}><span>Adicionar</span> R$ {(props.pedidoEscolhido.preco * valQuantidade).toFixed(2)}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  */









  return (
    <>
      <div className="ModalOverlay">
        <div className='ModalPedidos'>
          <button className="ModalPedidos_botaoFechar" onClick={props.onClickClose}>X</button>


          <div className="boxDetalhesPedidoEscolhido">
            <div className="ImagemPedidoEscolhido">
              imagem
            </div>
            <div className="PedidoEscolhido">
              <div className="PedidoEscolhidoTitulo">
                {props.pedidoEscolhido.titulo}
              </div>
              <div className="PedidoEscolhidoDescricao">
                <p>{props.pedidoEscolhido.descricao}</p>
              </div>
              <div className="TipoDeServicos">
                <div className="TituloDeServicos">
                  Tipo de serviço
                </div>
                <div className="ImgTipoServicos">
                  <img src={tipoDeServico} alt="" /> <span>No local</span>
                </div>
              </div>

              <div className="PedidoEscolhidoPreco">
                R$ {(props.pedidoEscolhido.preco).toFixed(2)}
              </div>
              <div className="PeddoEscolhidoQntVal">
                <div className="Qnt">
                  <button disabled={Boolean(!props.isOpen)} className={diminuirDropOn} onClick={() => diminuir(props.pedidoEscolhido)} disabled={habilitaBotaoMenos}> - </button> {quantiEVal} <button className="Aumentar" onClick={() => aumentar(props.pedidoEscolhido)}> + </button>
                </div>
                <div className="Val">
                  <button onClick={() => enviaProContextGeral()}><span>Adicionar</span> R$ {(pedido.preco * quantiEVal).toFixed(2)}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}



export default ModalPedidos







