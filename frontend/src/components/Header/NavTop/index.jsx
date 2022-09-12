import './styles.css';
import {Link} from 'react-router-dom';
import LogoHeader from '../../../assets/images/LogoHeader/LogoHeader.png';


import SacolaTop from './SacolaTop';
import UserArea from './userArea';

import DropDownButton from './DropDownButton';
import Search from './Search';
import { ContextoSacola } from '../../../contexts/ContextoSacola/context';
import { useContext, useEffect, useState } from 'react';


function NavTop() {
  const nomeDoUserLogado = JSON.parse(localStorage.getItem('user')) 

  const usandoContexto = useContext(ContextoSacola)
  const { numeroTooltipo } = usandoContexto

  const [setaIsOn, setSetaIsOn] = useState(false);
  const setaON = setaIsOn ? 'userON' : 'user';
  const ClasDropMenu = setaIsOn ? 'menuUser-Drop-ON' : 'menuUser-Drop-OFF';

  


  useEffect(() => {

  })
  return (
    <div className="NavTop">
      <div className="LogoHeader">
        <Link to='/dashboard'>
          <img src={LogoHeader} alt="" />
        </Link>
      </div>
      <div className="CardapioHeader">
        <DropDownButton />
      </div>
      <div className="SearchHeader">
        <Search />
      </div>
      <div id="SacolaHeader">
        <SacolaTop/>
      </div>
      <div id="userSpace">
        <UserArea/>
      </div>
    </div>
  );
}

export default NavTop;
