
import './style.css';
import { useState } from 'react';

import DashLogoDeck from '../../assets/icons/DashHeader/DashLogoDeck.svg'
import DashCadastraProdutos from '../../assets/icons/DashHeader/DashCadastraProdutos.png'
import DashPedidosEVendas from '../../assets/icons/DashHeader/DashPedidosEVendas.png'
import DashEstoque from '../../assets/icons/DashHeader/DashEstoque.png'
import DashSujestoes from '../../assets/icons/DashHeader/DashSujestoes.png'
import DashBarsToggle from '../../assets/icons/DashHeader/DashBarsToggle.png'
import DashSearch from '../../assets/icons/DashHeader/DashSearch.png'
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { BigHead } from '@bigheads/core'
import { eyesMap } from '@bigheads/core'
import { useEffect } from 'react';
import axios from 'axios';

function DashConsultaSujestoes() {
  console.log("")
  const [toggleClick, SetToggleClick] = useState(true)
  const estadoBotao = toggleClick ? 'BotaoON' : 'BotaoOFF'
  const estadoMain = toggleClick ? 'MainON' : 'MainOFF'

  const [carregaAsMensagens, setCarregaAsMensagens] = useState([1,2])

  const testeDeData = (dataDaMensagem) => {
    const data = new Date(dataDaMensagem)
    const dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
    const horaFormatada = data.toLocaleTimeString('pt-BR', { hour12: false })
    
    console.log("--------------")
    return(`${dataFormatada} - ${horaFormatada}`)
  } 

  console.log(carregaAsMensagens)

  useEffect(() => {
    axios.get(`http://localhost:3002/carregaSujestoesDeClientes`)
            .then((resposta) => setCarregaAsMensagens(resposta.data))
            .catch(() => console.log("Deu Errado"))
  },[])

  const handleClick = () => {
    SetToggleClick(!toggleClick)


  }
  // console.log(carregaAsMensagens)
  // console.log(estadoMain)

  
  const mostra = () => {
    console.log(carregaAsMensagens)
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
            <Link  to="/dashboard/consultarEstoque">
              <span className="Icon"><img src={DashEstoque} alt="" /></span>
              <span className="Title">Consultar Estoque</span>
            </Link>
          </li>
          <li>
            <Link  to="/dashboard/consultarSujestoes" id="pintaDeAzul">
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
        <div className='divSujestoes'>
          <div className="tituloSujestoes">
            <h2 onClick={() => mostra()}>Comentários e sujestões deixados por clientes anônimos</h2>
          </div>

          <div className='containerDasMensagens'>
            {carregaAsMensagens.map((mensagen, id) => {
                return(
                  <div className="divSujestao">
                    <div className='imgAvatarCliente'>
                      <BigHead
                        accessory="roundGlasses"
                        body="chest"
                        circleColor="blue"
                        clothing="naked"
                        clothingColor="white"
                        eyebrows="angry"
                        eyes="happy"
                        faceMask={false}
                        faceMaskColor="red"
                        facialHair="mediumBeard"
                        graphic="gatsby"
                        hair="pixie"
                        hairColor="blonde"
                        hat="none"
                        hatColor="blue"
                        lashes={false}
                        lipColor="turqoise"
                        mask={true}
                        mouth="grin"
                        skinTone="light"
                      />
                    </div>
                    <div className='mensagemDeixada'>
                      <div className='dataDaMensagem'>Enviada em: {testeDeData(mensagen.createdAt)}</div>
                      <div className='mensagemEscrita'>{mensagen.sujestaoOuComentario}</div>
                    </div>
                  </div>
                )
              })}
          </div>
            
          
        </div>
      </div>
    </div>
  )
}

export default DashConsultaSujestoes;
