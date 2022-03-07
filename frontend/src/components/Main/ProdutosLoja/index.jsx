import React, { useState, useEffect, useContext } from 'react';
import { ContextoSacola } from '../../../contexts/ContextoSacola/context';
import ModalPedidos from '../ModalPedidos';
import "./style.css"




const pedidosCadastrados = []
const pedidosSelecionados = []


function ProdutosLoja() {

  //Pedidos do menu que serão mostrados na tela
  const [pedidosMenu, setpedidosMenu] = useState([pedidosCadastrados])

  //Pedidos do menu que foram escolhidos pelo cliente pra efetuar a compra
  const [armazenaPedidos, setArmazenaPedidos] = useState("Nenhum pedido armazenado")


  const [pedidoValidaModal, setPedidoValidaModal] = useState(null)
  //ComponentDidMount irá executar 1x após o componente ser montado
  // Aqui servirápara chamar os pedidos do menu





  const { armazenaOsPedidos } = useContext(ContextoSacola)

  useEffect(() => {
    console.log("O componente foi montado")
    fetch('http://localhost:3002/produtos')
    .then(response => response.json())
    .then(resposta => setpedidosMenu(resposta))

  }, [])


  

  const escolhendoPedido = (pedidoSelecionado) => {


    pedidosSelecionados.push(pedidoSelecionado)


    setArmazenaPedidos(pedidosSelecionados)

    setPedidoValidaModal(pedidoSelecionado)
  }


  //console.log(pedidoValidaModal)


  const mostrandoDados = () => {
    console.log(pedidosMenu)
  }


 

  return (
    <>

      <div className='Pedidos'>
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
      </div>

      <ModalPedidos isOpen={Boolean(pedidoValidaModal)} onClickClose={() => setPedidoValidaModal(null) } pedidoEscolhido={pedidoValidaModal}/>

    </>

  );
}

console.log(pedidosSelecionados)

export default ProdutosLoja;
