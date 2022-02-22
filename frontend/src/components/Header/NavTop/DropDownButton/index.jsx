
import React, { useState } from 'react';
import './styles.css';

import CardapioHeader from '../../../../assets/icons/CardapioHeader/CardapioHeader.png';
import setaCardapio from '../../../../assets/icons/CardapioHeader/SetaCardapio.png';

const DropDownButton = () => {
  const [resFetchData, setResFetchData] = useState('');

  const [isDrop, setIsDrop] = useState(false);
  const [setaIsOn, setSetaIsOn] = useState(false);

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


  return (
    <>
      <div className="menu" onClick={handleClick}>
        <img src={CardapioHeader} alt="Cardápio" />
        <div>
          <h3 className={setaON}>
            Cardápio <img className={setaON} src={setaCardapio} alt="Cardapio" />
          </h3>
          <ul className={ClasDropMenu}>
            <li onClick={buscaFetch}>
              Tapioca/Crepioca <hr />
            </li>
            <li>
              Lanches <hr />
            </li>
            <li>
              Saladas <hr />
            </li>
            <li>
              Bebidas <hr />
            </li>
            <li>
              Sobremesas <hr />
            </li>
            <li>
              Doces <hr />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DropDownButton;
