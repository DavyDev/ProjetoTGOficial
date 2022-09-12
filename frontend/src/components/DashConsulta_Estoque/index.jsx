
import './style.css';
import { useState } from 'react';
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

  const handleClick = () => {
    SetToggleClick(!toggleClick)


  }
  console.log(estadoBotao)
  console.log(estadoMain)

  const cadastrandoItens = (event) => {
    event.preventDefault()

    console.log(event.target.nomeDoItem.value)
    console.log(event.target.qntEstoqueDoItem.value)

    axios.post("http://localhost:3002/registraItensDosProdutos", {
      nomeDoItem: event.target.nomeDoItem.value,
      qntEstoqueDoItem: Number(event.target.qntEstoqueDoItem.value)
    })
    //.then((resposta) => resposta.json())
      .then((resposta) => console.log(resposta.data))
      .catch(() => console.log("Deu Errado"))
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
        
        <div >
          <p>teste Consultar Estoque</p>
          <form className='registraItemsEstoque' onSubmit={(event) => cadastrandoItens(event)}>
            <div className="edicaoInputsoForm">
              <label  htmlFor="nomeDoItem">Nome do item</label><br />
              <input name="nomeDoItem"/>
            </div>

            <div className="edicaoInputsoForm">
              <label  htmlFor="quntEstoqueDoItem">Quantidade (Inicial) em estoque</label><br />
              <input type="number" name="qntEstoqueDoItem"/>
            </div>

            <button type="submit">Cadastrar Item</button>
          </form>
        </div>


      </div>
    </div>
  )
}

export default DashConsultaEstoque;
