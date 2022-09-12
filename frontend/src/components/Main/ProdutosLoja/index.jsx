import React, { useState, useEffect, useContext } from 'react';
import { ContextoSacola } from '../../../contexts/ContextoSacola/context';
import ModalPedidos from '../ModalPedidos';
import "./style.css"




const pedidosCadastrados = []
const pedidosSelecionados = []


function ProdutosLoja() {

  //Pedidos do menu que serão mostrados na tela
  const [pedidosTapiocaCrepioca, setPedidosTapiocaCrepioca] = useState([pedidosCadastrados])
  const [pedidosLanches, setPedidosLanches] = useState([pedidosCadastrados])
  const [pedidosSaladas, setPedidosSaladas] = useState([pedidosCadastrados])
  const [pedidosBebidas, setPedidosBebidas] = useState([pedidosCadastrados])
  const [pedidosSobremesas, setPedidosSobremesas] = useState([pedidosCadastrados])
  const [pedidosDoces, setPedidosDoces] = useState([pedidosCadastrados])

  //Pedidos do menu que foram escolhidos pelo cliente pra efetuar a compra
  const [armazenaPedidos, setArmazenaPedidos] = useState("Nenhum pedido armazenado")


  const [pedidoValidaModal, setPedidoValidaModal] = useState(null)
  //ComponentDidMount irá executar 1x após o componente ser montado
  // Aqui servirápara chamar os pedidos do menu





  const { armazenaOsPedidos } = useContext(ContextoSacola)

  useEffect(() => {
    console.log("O componente foi montado")
    // fetch('http://localhost:3002/produtos')
    // .then(response => response.json())
    // .then(resposta => setpedidosMenu(resposta))
    fetch(`http://localhost:3002/produtos/tapiocacrepioca`)
        .then(response => response.json())
        .then(resposta => setPedidosTapiocaCrepioca(resposta))

  }, [])

  useEffect(() => {
    console.log("O componente foi montado")
    // fetch('http://localhost:3002/produtos')
    // .then(response => response.json())
    // .then(resposta => setpedidosMenu(resposta))
    fetch(`http://localhost:3002/produtos/lanches`)
        .then(response => response.json())
        .then(resposta => setPedidosLanches(resposta))

  }, [])

  useEffect(() => {
    console.log("O componente foi montado")
    // fetch('http://localhost:3002/produtos')
    // .then(response => response.json())
    // .then(resposta => setpedidosMenu(resposta))
    fetch(`http://localhost:3002/produtos/saladas`)
        .then(response => response.json())
        .then(resposta => setPedidosSaladas(resposta))

  }, [])

  useEffect(() => {
    console.log("O componente foi montado")
    // fetch('http://localhost:3002/produtos')
    // .then(response => response.json())
    // .then(resposta => setpedidosMenu(resposta))
    fetch(`http://localhost:3002/produtos/bebidas`)
        .then(response => response.json())
        .then(resposta => setPedidosBebidas(resposta))

  }, [])

  useEffect(() => {
    console.log("O componente foi montado")
    // fetch('http://localhost:3002/produtos')
    // .then(response => response.json())
    // .then(resposta => setpedidosMenu(resposta))
    fetch(`http://localhost:3002/produtos/sobremesas`)
        .then(response => response.json())
        .then(resposta => setPedidosSobremesas(resposta))

  }, [])

  useEffect(() => {
    console.log("O componente foi montado")
    // fetch('http://localhost:3002/produtos')
    // .then(response => response.json())
    // .then(resposta => setpedidosMenu(resposta))
    fetch(`http://localhost:3002/produtos/doces`)
        .then(response => response.json())
        .then(resposta => setPedidosDoces(resposta))

  }, [])


  

  const escolhendoPedido = (pedidoSelecionado) => {


    pedidosSelecionados.push(pedidoSelecionado)


    setArmazenaPedidos(pedidosSelecionados)

    setPedidoValidaModal(pedidoSelecionado)
  }


  //console.log(pedidoValidaModal)


  const mostrandoDados = () => {
    console.log(pedidosTapiocaCrepioca)
  }


 

  return (
    <div className='secaoDasSecoes'>
      <div className='SecaoMenu'>
        <h2 id="Tapiocas" className="title_MenuMain">Tapiocas/Crepiocas</h2>

        <div className='Pedidos'>
          {/* <button onClick={mostrandoDados}>Tesando</button> */}
          {pedidosTapiocaCrepioca.map((carro, i) => {
            return (<div key={i} className="ProdutosLoja" onClick={() => { escolhendoPedido({key: i, id: carro.id, titulo: carro.titulo, descricao: carro.descricao, preco: carro.preco, imagem: carro.imagem, quantidade: 1, dadosParaEstoque: JSON.parse(carro.dadosParaEstoque) }) }}>

              <div className="Grid1" id={`ProdId_${carro.id}`}>
                <p className="TituloPedido">
                  {carro.titulo}
                </p>

                <div className="DescricaoPedido">
                  {carro.descricao}
                </div>
                <div className="PrecoPedido">
                  R$ {carro.preco}
                </div>
              </div>
              <div className="ImagemPedido">
                {carro.imagem}
              </div>
            </div>)
          })}
        </div>
      </div>

      <div className='SecaoMenu'>
        <h2 id="Lanches" className="title_MenuMain">Lanches</h2>

        <div className='Pedidos'>
          {/* <button onClick={mostrandoDados}>Tesando</button> */}
          {pedidosLanches.map((carro, i) => {
            return (<div key={i} className="ProdutosLoja" onClick={() => { escolhendoPedido({key: i, id: carro.id, titulo: carro.titulo, descricao: carro.descricao, preco: carro.preco, imagem: carro.imagem, quantidade: 1, dadosParaEstoque: JSON.parse(carro.dadosParaEstoque) }) }}>

              <div className="Grid1" id={`ProdId_${carro.id}`}>
                <p className="TituloPedido">
                  {carro.titulo}
                </p>

                <div className="DescricaoPedido">
                  {carro.descricao}
                </div>
                <div className="PrecoPedido">
                  R$ {carro.preco}
                </div>
              </div>
              <div className="ImagemPedido">
                {carro.imagem}
              </div>
            </div>)
          })}
        </div>

      </div>

      <div className='SecaoMenu'>
        <h2 id="Saladas" className="title_MenuMain">Saladas</h2>
        
        <div className='Pedidos'>
          {/* <button onClick={mostrandoDados}>Tesando</button> */}
          {pedidosSaladas.map((carro, i) => {
            return (<div key={i} className="ProdutosLoja" onClick={() => { escolhendoPedido({key: i, id: carro.id, titulo: carro.titulo, descricao: carro.descricao, preco: carro.preco, imagem: carro.imagem, quantidade: 1, dadosParaEstoque: JSON.parse(carro.dadosParaEstoque) }) }}>

              <div className="Grid1" id={`ProdId_${carro.id}`}>
                <p className="TituloPedido">
                  {carro.titulo}
                </p>

                <div className="DescricaoPedido">
                  {carro.descricao}
                </div>
                <div className="PrecoPedido">
                  R$ {carro.preco}
                </div>
              </div>
              <div className="ImagemPedido">
                {carro.imagem}
              </div>
            </div>)
          })}
        </div>

      </div>

      <div className='SecaoMenu'>
        <h2 id="Bebidas" className="title_MenuMain">Bebidas</h2>

        <div className='Pedidos'>
          {/* <button onClick={mostrandoDados}>Tesando</button> */}
          {pedidosBebidas.map((carro, i) => {
            return (<div key={i} className="ProdutosLoja" onClick={() => { escolhendoPedido({key: i, id: carro.id, titulo: carro.titulo, descricao: carro.descricao, preco: carro.preco, imagem: carro.imagem, quantidade: 1, dadosParaEstoque: JSON.parse(carro.dadosParaEstoque) }) }}>

              <div className="Grid1" id={`ProdId_${carro.id}`}>
                <p className="TituloPedido">
                  {carro.titulo}
                </p>

                <div className="DescricaoPedido">
                  {carro.descricao}
                </div>
                <div className="PrecoPedido">
                  R$ {carro.preco}
                </div>
              </div>
              <div className="ImagemPedido">
                {carro.imagem}
              </div>
            </div>)
          })}
        </div>
      </div>

      <div className='SecaoMenu'>
        <h2 id="Sobremesas" className="title_MenuMain">Sobremesas</h2>

        <div className='Pedidos'>
          {/* <button onClick={mostrandoDados}>Tesando</button> */}
          {pedidosSobremesas.map((carro, i) => {
            return (<div key={i} className="ProdutosLoja" onClick={() => { escolhendoPedido({key: i, id: carro.id, titulo: carro.titulo, descricao: carro.descricao, preco: carro.preco, imagem: carro.imagem, quantidade: 1, dadosParaEstoque: JSON.parse(carro.dadosParaEstoque) }) }}>

              <div className="Grid1" id={`ProdId_${carro.id}`}>
                <p className="TituloPedido">
                  {carro.titulo}
                </p>

                <div className="DescricaoPedido">
                  {carro.descricao}
                </div>
                <div className="PrecoPedido">
                  R$ {carro.preco}
                </div>
              </div>
              <div className="ImagemPedido">
                {carro.imagem}
              </div>
            </div>)
          })}
        </div>
      </div>

      <div className='SecaoMenu'>
        <h2 id="Doces" className="title_MenuMain">Doces</h2>

        <div className='Pedidos'>
          {/* <button onClick={mostrandoDados}>Tesando</button> */}
          {pedidosDoces.map((carro, i) => {
            return (<div key={i} className="ProdutosLoja" onClick={() => { escolhendoPedido({key: i, id: carro.id, titulo: carro.titulo, descricao: carro.descricao, preco: carro.preco, imagem: carro.imagem, quantidade: 1, dadosParaEstoque: JSON.parse(carro.dadosParaEstoque) }) }}>

              <div className="Grid1" id={`ProdId_${carro.id}`}>
                <p className="TituloPedido">
                  {carro.titulo}
                </p>

                <div className="DescricaoPedido">
                  {carro.descricao}
                </div>
                <div className="PrecoPedido">
                  R$ {carro.preco}
                </div>
              </div>
              <div className="ImagemPedido">
                {carro.imagem}
              </div>
            </div>)
          })}
        </div>
      </div>

      {/* <div className='Pedidos'>
        <button onClick={mostrandoDados}>Tesando</button>
        {pedidosMenu.map((carro, i) => {
          return (<div key={i} className="ProdutosLoja" onClick={() => { escolhendoPedido({key: i, id: carro.id, titulo: carro.titulo, descricao: carro.descricao, preco: carro.preco, imagem: carro.imagem, quantidade: carro.quantidade }) }}>

            <div className="Grid1">
              <p className="TituloPedido">
                {carro.titulo}
              </p>

              <div className="DescricaoPedido">
                {carro.descricao}
              </div>
              <div className="PrecoPedido">
                R$ {carro.preco}
              </div>
            </div>
            <div className="ImagemPedido">
              {carro.imagem}
            </div>
          </div>)
        })}
      </div> */}

      <ModalPedidos isOpen={Boolean(pedidoValidaModal)} onClickClose={() => setPedidoValidaModal(null) } pedidoEscolhido={pedidoValidaModal}/>

    </div>

  );
}

console.log(pedidosSelecionados)

export default ProdutosLoja;
