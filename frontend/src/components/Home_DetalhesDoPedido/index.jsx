import axios from 'axios';
import { useEffect, useState } from 'react';
import { ContextoSacolaProvider } from '../../contexts/ContextoSacola';
import Footer from '../Footer';
import Header from '../Header';
import Main from '../Main';
import setaCardapio from '../.././assets/icons/CardapioHeader/SetaCardapio.png';
import './style.css';
import naoFezPedidoAinda from '../../assets/images/naoFezPedidoAinda/refeicao.png'
import { useHistory, useParams } from 'react-router-dom';

function Home_DetalhesDoPedido() {

    const { detalhesDoPedido } = useParams()
    const [armazenaProdutosDoPedido, setArmazenaProdutosDoPedido] = useState([])
    const [armazenaDadosDoPedido, setAarmazenaDadosDoPedido] = useState([{pertenceColumn: ""}])

    const dataEHoraDoPedido = armazenaDadosDoPedido[0].createdAt
    const data = new Date(dataEHoraDoPedido)
    const dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
    const horaFormatada = data.toLocaleTimeString('pt-BR', {timeZone: 'UTC'})

    const [subTotal, setSubTotal] = useState(0)
    const voltaMenu = useHistory()
    let armazenaValores = 0
    console.log(detalhesDoPedido)

    useEffect(() => {
        axios.get(`http://localhost:3002/detalhesDoPedido/${detalhesDoPedido}`)
        .then(response => setArmazenaProdutosDoPedido(response.data.ListaDosProdutos))
        
    }, [])
    
    useEffect(() => {
        axios.get(`http://localhost:3002/detalhesDoPedido/${detalhesDoPedido}`)
        .then(response => setAarmazenaDadosDoPedido(response.data.dadosDoPedido))

        for(let i = 0; i < armazenaProdutosDoPedido.length; i++){
            console.log(armazenaProdutosDoPedido[i].preco)
            armazenaValores = (armazenaValores + armazenaProdutosDoPedido[i].preco)
            
        }

        setSubTotal(armazenaValores)

        // setSubTotal(armazenaValores)
    }, [armazenaProdutosDoPedido])

    const verDetalhes = () => {
        // console.log(armazenaProdutosDoPedido)
        // console.log(armazenaValores)
        console.log(armazenaDadosDoPedido)
    }



    


    return(
        <>
            <div className="DivHome">
        
                <ContextoSacolaProvider>
                <header className="headerHome">
                    <Header/>
                </header>

                <main className="detalhesDoPedido">

                    <div className="DivMainDetalhesDoPedido">
                        <div className="detalhesVoltar" onClick={() => voltaMenu.push('/home/clientePedidos')}> 
                            <div>
                                <img className='setaDetalhes' src={setaCardapio} alt="" srcset="" /> Voltar
                            </div>
                        </div>

                        <div className='tituloDoLocal'>Deck Café</div>
                        

                        <div className='listaProdutosDoPedido'>
                            {armazenaProdutosDoPedido.map((prod, i) => {
                                return(
                                    <div className='divDosProds'>
                                        <div>5x teste Eleonora</div>
                                        <div>R$ {prod.preco.toFixed(2)}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="subtotalETotal">
                            <div className='divSubtotal'>
                                <div>Subtotal</div>
                                <div>R$ {subTotal.toFixed(2)}</div>
                            </div>
                            <div className='divTotal'>
                                <div>Total</div>
                                <div>R$ {subTotal.toFixed(2)}</div>
                            </div>
                             
                        </div>
                        <div className="demaisInformacoes">
                            <div className='divTipoDeServico'>
                                <div className='tipo'>Tipo de serviço</div>
                                <div className='como'>Retirada no local</div>
                            </div>

                            <div className='divNumDoPedido'>
                                <div className='NumPedido'>Nº do pedido</div>
                                <div className='Num'>{detalhesDoPedido}</div>
                            </div>
                            <div className='divFormaDePagamento'>
                                <div className='FormaDePagamento'>Forma de pagamento</div>
                                <div className='formaEscolhida'>programar essa parte</div>
                            </div>
                            <div className='divStatusDoPedido'>
                                <div className='statusDoPedido' onClick={() => verDetalhes()}>Status do pedido</div>
                                <div className='status'>
                                    {armazenaDadosDoPedido[0].pertenceColumn == "fazer" ? 'Aguardando confirmação' : "" }
                                    {armazenaDadosDoPedido[0].pertenceColumn == "preparando" ? 'Sendo preparado' : "" }
                                    {armazenaDadosDoPedido[0].pertenceColumn == "pronto" ? 'Pedido pronto' : "" }
                                </div>
                            </div>
                            <div className='divDataDoPedido'>
                                <div className='dataDoPedido'>Data do pedido</div>
                                <div className='data'>
                                    {dataFormatada} - {horaFormatada}
                                </div>
                            </div>
                            <div className="visualizar_Cardapio" onClick={() => voltaMenu.push('/home')}>Visualizar cardápio</div>

                        </div>
                    
                    </div>
                    
                </main>
                </ContextoSacolaProvider>
       
            </div>    
        </>
    )
}

export default Home_DetalhesDoPedido;