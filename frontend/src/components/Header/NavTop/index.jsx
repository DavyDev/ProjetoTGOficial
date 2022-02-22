import './styles.css';
import {Link} from 'react-router-dom';
import LogoHeader from '../../../assets/images/LogoHeader/LogoHeader.png';
import SacolaTop from './SacolaTop';

import DropDownButton from './DropDownButton';
import Search from './Search';
import { ContextoSacola } from '../../../contexts/ContextoSacola/context';
import { useContext, useEffect } from 'react';

import { ContextoLogin } from "../../../contexts/ContextoLogin/context"

function NavTop() {
  const usandoContexto = useContext(ContextoSacola)
  const { authenticated, logout } = useContext(ContextoLogin)
  const { numeroTooltipo } = usandoContexto

  const handleLogout = () => {
    logout();
  }


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
        <p>{String(authenticated)}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default NavTop;
