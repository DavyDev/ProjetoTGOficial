import axios from 'axios';
import { useEffect, useState } from 'react';
import { ContextoSacolaProvider } from '../../contexts/ContextoSacola';
import Footer from '../Footer';
import Header from '../Header';
import Main from '../Main';
import './style.css';
import naoFezPedidoAinda from '../../assets/images/naoFezPedidoAinda/refeicao.png'
import { useHistory } from 'react-router-dom';

function ComponentTesteDoMain() {

    const identficaIdCliente = JSON.parse(localStorage.getItem('user'))
    const direcionaparaOPedidoDetalhado_ouHome = useHistory()
    const [listandoPedidosFeitoPeloCliente, setListandoPedidosFeitoPeloCliente] = useState([])
    const [listandoProdutosDosPedidosFeitoPeloCliente, setListandoProdutosDosPedidosFeitoPeloCliente] = useState([])

    const [armazenaProdutosDosPedidos, setArmazenaProdutosDosPedidos] = useState([])

    console.log("identficaIdCliente")
    console.log(identficaIdCliente)

    // function teste12121 () {
    //     axios.get(`http://localhost:3002/listagemDosMeusPedidosFeitos/${identficaIdCliente.id}`)
    //     .then(response => setListandoPedidosFeitoPeloCliente(response.data))
    // }

    useEffect(() => {
        // console.log("O componente foi montado")
        //  fetch('http://localhost:3002/listaPedidosFeitos/cliente')
        // .then(response => response.json())
        // .then(resposta => setpedidis(resposta))

        axios.get(`http://localhost:3002/listagemDosMeusPedidosFeitos/${identficaIdCliente.id}`)
        .then(response => setListandoPedidosFeitoPeloCliente(response.data))
        //Aqui temos os pedidos ja sendo trazidos

        // console.log("mudou misteriosamente")
        // console.log(listandoPedidosFeitoPeloCliente)

         

        
        // console.log(armazenaProdutosDosPedidos)
    }, [])

    // useEffect(() => {

    //     listandoPedidosFeitoPeloCliente.map((pedido, i) => {
    //         axios.get(`http://localhost:3002/listagemDosprodutosDosPedidosFeitos/${pedido.id}`)
    //         .then(response => armazenaProdutosDosPedidos.push(response.data))
    //     })
    // }, [listandoPedidosFeitoPeloCliente])

    // useEffect( () => {
    //     // const armazenaProdutos = []
        

    // }, [listandoPedidosFeitoPeloCliente])

    const testeFunçao = (numeroDoPedido) => {
        // console.log(armazenaProdutosDosPedidos.length)
        // console.log(listandoPedidosFeitoPeloCliente[1].dataValues.pertenceColumn)
        // console.log(listandoPedidosFeitoPeloCliente[1].primeiroProduto)
        direcionaparaOPedidoDetalhado_ouHome.push(`/home/clientePedidos/pedido/${numeroDoPedido}`)
        console.log()
    }

    
    return(
        <>
            <div className="DivHome">
        
                <ContextoSacolaProvider>
                <header className="headerHome">
                    <Header/>
                </header>

                <main className="DivMainPedidosDoCliente">
                    {/* <h1>irá mostrar os pedidos que essecliente já fez</h1> */}
                    <div className=''>
                        <div className='tituloMeusPedidos'>Meus pedidos</div>
                        <div className='hitoricoDePedidos'>Historico</div>

                        {listandoPedidosFeitoPeloCliente.length >= 1 ? 
                        <div className="apresentaTodosOSPedidos">

                            {listandoPedidosFeitoPeloCliente.map((pedido, i) => {
                                return(
                                    <div className="pedido1">
                                        <div className="numero_StatusDoPedido">
                                            <div className="numeroDoPedido">Pedido Nº {pedido.dataValues.id}</div>
                                            <div className="StatusDoPedido"> <span className='spanStatus' >Status:</span> <span className='spanInformaStatus'>
                                                {pedido.dataValues.pertenceColumn == "fazer" ? 'Aguardando confirmação' : "" }
                                                {pedido.dataValues.pertenceColumn == "preparando" ? 'Sendo preparado' : "" }
                                                {pedido.dataValues.pertenceColumn == "pronto" ? 'Pedido pronto' : "" }
                                                
                                            </span></div>
                                        </div>
                                        <hr />
                                        <div className="descricaoDosItens">
                                            <div className='divProdEQuant'>
                                                
                                                <span className='destaqueNaQuantidadeDoProduto'>{pedido.qntDoProduto} </span> <span>{pedido.primeiroProduto}</span>
                                            </div>

                                            {pedido.dataValues.qntItems == 2 ? <div>mais {pedido.dataValues.qntItems - 1} item</div> : "" }
                                            {pedido.dataValues.qntItems > 2 ? <div>mais {pedido.dataValues.qntItems - 1} itens</div> : "" }
                                        </div>
                                        <hr />
                                        <div className="verdetalhesDoPedido" onClick={() => testeFunçao(pedido.dataValues.id)}>
                                            Ver detalhes →
                                        </div>
                                    </div>
                                )
                            })}

                            
                        
                        </div> : 
                        <div className='semPedidosFeitos'>
                            <div className='imagemDeSemPedidos'>
                                <img src={naoFezPedidoAinda} />
                            </div>
                            <div className='msgNenhumPedido'>Você ainda não fez nenhum pedido</div>
                            <div className='msgSejestaoMenu'>Conheça as melhores opções no menu, você vai adora-las! </div>
                            <div className='voltaProInicio'> <a onClick={() => direcionaparaOPedidoDetalhado_ouHome.push('/home')}>Ir para o início</a></div>
                        </div>}

                    </div>
                        
                    
                    
                </main>
                </ContextoSacolaProvider>

                {/* <footer className="DivFooter">
                <Footer />
                </footer> */}
            </div>    
        </>
    )
}

export default ComponentTesteDoMain;