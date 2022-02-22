/* eslint-disable prettier/prettier */
import './style.css';
import { useState } from 'react';

import DashLogoDeck from '../../assets/icons/DashHeader/DashLogoDeck.svg'
import DashCadastraProdutos from '../../assets/icons/DashHeader/DashCadastraProdutos.png'
import DashPedidosEVendas from '../../assets/icons/DashHeader/DashPedidosEVendas.png'
import DashEstoque from '../../assets/icons/DashHeader/DashEstoque.png'
import DashSujestoes from '../../assets/icons/DashHeader/DashSujestoes.png'
import DashBarsToggle from '../../assets/icons/DashHeader/DashBarsToggle.png'
import DashSearch from '../../assets/icons/DashHeader/DashSearch.png'


function DashHeader() {

  const [toggleClick, SetToggleClick] = useState(true)
  const estadoBotao = toggleClick ? 'BotaoON' : 'BotaoOFF'
  const estadoMain = toggleClick ? 'MainON' : 'MainOFF'

  const handleClick = () => {
    SetToggleClick(!toggleClick)


  }
  console.log(estadoBotao)
  console.log(estadoMain)


  return(

    /*
      <ul>
          <li>
            <a href="#">
              <span className="Icon"> <img src={DashLogoDeck} alt="Dashboard Logo" /></span>
              <span className="Title"><h2>DeckCafé</h2></span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="Icon"><img src={DashCadastraProdutos} alt="" /></span>
              <span className="Title">Cadastar Produtos</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="Icon"><img src={DashPedidosEVendas} alt="" /></span>
              <span className="Title">Consultar Pedidos</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="Icon"><img src={DashEstoque} alt="" /></span>
              <span className="Title">Consultar Estoque</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="Icon"><img src={DashSujestoes} alt="" /></span>
              <span className="Title">Consultar Sujestões</span>
            </a>
          </li>
        </ul>
    */

    <div className='Container'>
      <div className={`Navegation ${estadoBotao}`}>
      <ul>
          <li>
            <a href="#">
              <span className="Icon"> <img src={DashLogoDeck} alt="Dashboard Logo" /></span>
              <span className="Title"><h2>DeckCafé</h2></span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="Icon"><img src={DashCadastraProdutos} alt="" /></span>
              <span className="Title">Cadastar Produtos</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="Icon"><img src={DashPedidosEVendas} alt="" /></span>
              <span className="Title">Consultar Pedidos</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="Icon"><img src={DashEstoque} alt="" /></span>
              <span className="Title">Consultar Estoque</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="Icon"><img src={DashSujestoes} alt="" /></span>
              <span className="Title">Consultar Sujestões</span>
            </a>
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
      </div>
    </div>
  )
}

export default DashHeader;
