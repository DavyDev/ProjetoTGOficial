
import './style.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import DashLogoDeck from '../../assets/icons/DashHeader/DashLogoDeck.svg'
import DashCadastraProdutos from '../../assets/icons/DashHeader/DashCadastraProdutos.png'
import DashPedidosEVendas from '../../assets/icons/DashHeader/DashPedidosEVendas.png'
import DashEstoque from '../../assets/icons/DashHeader/DashEstoque.png'
import DashSujestoes from '../../assets/icons/DashHeader/DashSujestoes.png'
import DashBarsToggle from '../../assets/icons/DashHeader/DashBarsToggle.png'
import DashSearch from '../../assets/icons/DashHeader/DashSearch.png'
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';


function DashConsultaEstoque() {

  const [toggleClick, SetToggleClick] = useState(true)
  const estadoBotao = toggleClick ? 'BotaoON' : 'BotaoOFF'
  const estadoMain = toggleClick ? 'MainON' : 'MainOFF'

  const [itensCadastrados, setItensCadastrados] = useState([]);
  const [telaDeEdicaoEstoque, setTelaDeEdicaoEstoque] = useState(false);
  const [produtoParaSerEditadoEstoque, setProdutoParaSerEditadoEstoque] = useState("");

  const handleClick = () => {
    SetToggleClick(!toggleClick)


  }
  console.log(estadoBotao)
  console.log(estadoMain)

  const cadastrandoItens = async (event) => {
    event.preventDefault()

    console.log(event.target.nomeDoItem.value)
    console.log(event.target.qntEstoqueDoItem.value)

    await axios.post("http://localhost:3002/registraItensDosProdutos", {
      nomeDoItem: event.target.nomeDoItem.value,
      qntEstoqueDoItem: Number(event.target.qntEstoqueDoItem.value)
    })
    //.then((resposta) => resposta.json())
      .then((resposta) => console.log(resposta.data))
      .catch(() => console.log("Deu Errado"))

      await axios.get("http://localhost:3002/listaItensDoEstoque")
        .then((resposta) => setItensCadastrados(resposta.data))
        .catch(() => console.log("Deu Errado"))
  }

  useEffect(() => {
    axios.get("http://localhost:3002/listaItensDoEstoque")
    .then((resposta) => setItensCadastrados(resposta.data))
      .catch(() => console.log("Deu Errado"))
    },[])
    
    const testeEstoque = () => {
      console.log(itensCadastrados)
    }
    
    const habilitaTelaEditarEstoque = (produtoASerEditado) => {
      console.log(produtoASerEditado)
      setProdutoParaSerEditadoEstoque(produtoASerEditado)
      // setArmazenaItemsEcolhidosEdicao(JSON.parse(produtoASerEditado.dadosParaEstoque))
      setTelaDeEdicaoEstoque(!telaDeEdicaoEstoque)
    }
    
    const handleChangeEstoqueEdicao = (event) => {
      const { name, value } = event.target
      setProdutoParaSerEditadoEstoque({...produtoParaSerEditadoEstoque, [name]: value})
      console.log(produtoParaSerEditadoEstoque)
    }
    
    useEffect(() => {
      console.log(produtoParaSerEditadoEstoque)
  }, [produtoParaSerEditadoEstoque])

  const testeDeDataCadastradaNoEstoque = (dataDaMensagem) => {
    const data = new Date(dataDaMensagem)
    const dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
    const horaFormatada = data.toLocaleTimeString('pt-BR', { hour12: false })
    
    console.log("--------------")
    return(`${dataFormatada}`)
  } 
  
  const testeDeDataAtualizadaNoEstoque = (dataDaMensagem) => {
    const data = new Date(dataDaMensagem)
    const dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
    const horaFormatada = data.toLocaleTimeString('pt-BR', { hour12: false })
    
    console.log("--------------")
    return(`${dataFormatada} - ${horaFormatada}`)
  } 
  
  const atualizaDadosDoItemNoEstoque = () => {
    axios.put("http://localhost:3002/atualizaItensDoEstoque", {
      id: produtoParaSerEditadoEstoque.id,
      qntEstoque: produtoParaSerEditadoEstoque.qntEstoque
    })
    .then((resposta) => setItensCadastrados(resposta.data))
    .then((resposta) => alert("Item atualizado com sucesso"))
      .catch(() => alert("Deu Errado"))
    
  }

  const excluiItemDoEstoque = (idDoItemQueSeraExcluido) => {
    console.log(idDoItemQueSeraExcluido)
    axios.delete(`http://localhost:3002/excluiItensDoEstoque/${idDoItemQueSeraExcluido}`)
    .then((resposta) => setItensCadastrados(resposta.data))
    .then((resposta) => alert("Item deletado com sucesso"))
    .catch(() => alert("Deu Errado"))
    
  }
  
  return(
    
    /*
    <ul>
    <li>
            <Link  to="">
              <span className="Icon"> <img src={DashLogoDeck} alt="Dashboard Logo" /></span>
              <span className="Title"><h2>DeckCafé</h2></span>
            </Link>
          </li>
          <li>
            <Link  to="">
              <span className="Icon"><img src={DashCadastraProdutos} alt="" /></span>
              <span className="Title">Cadastar Produtos</span>
            </Link>
          </li>
          <li>
            <Link  to="">
              <span className="Icon"><img src={DashPedidosEVendas} alt="" /></span>
              <span className="Title">Consultar Pedidos</span>
            </Link>
          </li>
          <li>
            <Link  to="">
              <span className="Icon"><img src={DashEstoque} alt="" /></span>
              <span className="Title">Consultar Estoque</span>
            </Link>
          </li>
          <li>
            <Link  to="">
              <span className="Icon"><img src={DashSujestoes} alt="" /></span>
              <span className="Title">Consultar Sujestões</span>
            </Link>
          </li>
        </ul>
    */

    <div className='Container'>
      <div className={`Navegation ${estadoBotao}`}>
      <ul>
          <li>
            <Link  to="/dashboard">
              <span className="Icon"> <img src={DashLogoDeck} alt="Dashboard Logo" /></span>
              <span className="Title"><h2>DeckCafé</h2></span>
            </Link>
          </li>
          <li>
            <Link  to="/dashboard">
              <span className="Icon"><img src={DashCadastraProdutos} alt="" /></span>
              <span className="Title">Cadastar Produtos</span>
            </Link>
          </li>
          <li>
            <Link  to="/dashboard/consultarPedidos">
              <span className="Icon"><img src={DashPedidosEVendas} alt="" /></span>
              <span className="Title">Consultar Pedidos</span>
            </Link>
          </li>
          <li>
            <Link  to="/dashboard/consultarEstoque" id="pintaDeAzul">
              <span className="Icon"><img src={DashEstoque} alt="" /></span>
              <span className="Title">Consultar Estoque</span>
            </Link>
          </li>
          <li>
            <Link  to="/dashboard/consultarSujestoes">
              <span className="Icon"><img src={DashSujestoes} alt="" /></span>
              <span className="Title">Consultar Sujestões</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className={`main ${estadoMain}`}>
        <div className="TopBar">
          <div className="Toggle" onClick={handleClick}><img src={DashBarsToggle} alt="" /></div>
          <div className="search">
            <label htmlFor="">
              <input clas type="text" name="" id="" placeholder="Procure algo.." />
              <img src={DashSearch} alt="" />
            </label>
          </div>
        </div>
        
        <div className='divConsultaEstoque'>
          <p>Adicionar novo item ao estoque</p>
          <form className='registraItemsEstoque' onSubmit={(event) => cadastrandoItens(event)}>
            <div className="item_Quantidade">
              <div className="edicaoInputsoForm">
                <label  htmlFor="nomeDoItem" onClick={() => testeEstoque()}>Nome do item</label><br />
                <input name="nomeDoItem"/>
              </div>

              <div className="edicaoInputsoForm">
                <label  htmlFor="quntEstoqueDoItem">Quantidade (Inicial) em estoque</label><br />
                <input type="number" name="qntEstoqueDoItem"/>
              </div>

              <div className='adicionaItemEstoque'>
                <button type="submit">Cadastrar Item</button>
              </div>
            </div>
          </form>
        </div>

        {telaDeEdicaoEstoque == false ?  
          <div className='divListagemDeItensDoEstoque'>
            <p>Adicionar novo item ao estoque</p>
            <div className="tabelaDeListagenDosItens">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Itens do Produto</th>
                    <th>Quantidade</th>
                    <th>Cadastrado em</th>
                    <th>Atualizado em</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {itensCadastrados.map((itemSelecionado, i) => {
                    return (
                      <tr>
                        <th>{i + 1}</th>
                        <td>{itemSelecionado.nomeItem}</td>
                        <td>{itemSelecionado.qntEstoque}</td>
                        <td>{testeDeDataCadastradaNoEstoque(itemSelecionado.createdAt)}</td>
                        <td>{testeDeDataAtualizadaNoEstoque(itemSelecionado.updatedAt)}</td>
                        <td>
                          <button  onClick={() => habilitaTelaEditarEstoque(itemSelecionado)}>Editar</button>
                          <button onClick={() => excluiItemDoEstoque(itemSelecionado.id)}>Excluir</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        : 
        <div className='divListagemDeItensDoEstoque'>
          <p>Edição do item "{produtoParaSerEditadoEstoque.nomeItem}"</p>
          <div className="divEditandoItemDoEstoque">
            <div>
              <label htmlFor="idDoItemDaEdicaoNoEstoque">Item</label> <br />
              <input className='inputsNotAlloweds' type="text" name='idDotIemDaEdicaoNoEstoque' value={produtoParaSerEditadoEstoque.nomeItem} disabled/>
            </div>
            <div>
              <label htmlFor="nomeDoItemDaEdicaoNoEstoque">Item</label><br />
              <input className='inputsNotAlloweds' type="text" name='nomeDotIemDaEdicaoNoEstoque' value={produtoParaSerEditadoEstoque.nomeItem} disabled/>
            </div>
            <div>
            <div>
              <label htmlFor="qntEstoque">Quantidade</label><br />
              <input type="number" name='qntEstoque'onChange={(event) => handleChangeEstoqueEdicao(event)} value={produtoParaSerEditadoEstoque.qntEstoque}/>
            </div>
            </div>
            <div className='botoesAtualizaEVolta'>
              <button onClick={() => atualizaDadosDoItemNoEstoque()}>Atualizar estoque</button>
              <button onClick={() => setTelaDeEdicaoEstoque(!telaDeEdicaoEstoque)}>Voltar</button>
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default DashConsultaEstoque;
