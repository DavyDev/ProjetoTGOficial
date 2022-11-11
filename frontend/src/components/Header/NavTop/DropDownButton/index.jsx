
import React, { useContext, useRef, useState } from 'react';
import './styles.css';

import CardapioHeader from '../../../../assets/icons/CardapioHeader/CardapioHeader.png';
import setaCardapio from '../../../../assets/icons/CardapioHeader/SetaCardapio.png';
import { ContextoLogin } from '../../../../contexts/ContextoLogin/context';

import Swal from 'sweetalert2'

const DropDownButton = () => {
  
  const [resFetchData, setResFetchData] = useState('');

  const [isDrop, setIsDrop] = useState(false);
  const [setaIsOn, setSetaIsOn] = useState(false);

  // const secao = useRef(null)
  const { lidaComAncora } = useContext(ContextoLogin)

  const ClasDropMenu = isDrop ? 'menu-Drop-ON' : 'menu-Drop-OFF';
  const setaON = setaIsOn ? 'font-CardapioON' : 'font-Cardapio';

  const handleClick = () => {
    setIsDrop(!isDrop);
    setSetaIsOn(!setaIsOn);

  };

  const buscaFetch = () => {
    fetch('http://localhost:3002/produtos')
      .then(response => response.json())
      .then(resposta => console.log(resposta))
  };

  let um = "";
  let dois = ""
  let três = ""
  let quatro = ""
  let cinco = ""
  let seis = ""
  
  const achaPosicaoElemento = (idElemento) => {
    if(document.getElementById(`${idElemento}`)){
      let positionElement = document.getElementById(`${idElemento}`).getBoundingClientRect().y
      positionElement = (positionElement - 150)
      
      document.documentElement.scrollBy(0 , positionElement)
    }
    else{
      console.log("teste")
      Swal.fire(
        'Aviso!',
        'No momento não foram lançados produtos para essa seção do cardápio, aguarde para os proximos lançamentos que virão.',
        'warning'
      )
    }
    //     positionElement = positionElement.y - 824
  //     // positionElement = 824 + positionElement
  //   // positionElement.addEventListener('click', (ev) => {
  // //   })
  //   console.log(window.innerHeight)
  //   console.log(positionElement)
  
  console.log(um)

}


  return (
    <>
      <div className="menu" onClick={handleClick} >
        <img src={CardapioHeader} alt="Cardápio" />
        <div>
          <h3 className={setaON}>
            Cardápio <img className={setaON} src={setaCardapio} alt="Cardapio" />
          </h3>
          <ul className={ClasDropMenu}>
            <li onClick={() => achaPosicaoElemento("Tapiocas")}>
              <a >Tapioca/Crepioca</a><hr />
            </li>
            <li onClick={() => achaPosicaoElemento("Lanches")}>
             <a>Lanches</a> <hr />
            </li>
            <li onClick={() => achaPosicaoElemento("Saladas")}>
              <a>Saladas</a><hr />
            </li>
            <li onClick={() => achaPosicaoElemento("Bebidas")}>
              <a>Bebidas</a><hr />
            </li>
            <li onClick={() => achaPosicaoElemento("Sobremesas")}>
             <a>Sobremesas</a><hr />
            </li>
            <li onClick={() => achaPosicaoElemento("Doces")}>
             <a>Doces</a><hr />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DropDownButton;
