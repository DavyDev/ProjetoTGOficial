import './styles.css';
import LogoHeader from '../../../assets/images/LogoHeader/LogoHeader.png';
import SacolaTop from './SacolaTop';

import DropDownButton from './DropDownButton';
import Search from './Search';

function NavTop() {
  return (
    <div className="NavTop">
      <div className="LogoHeader">
        <img src={LogoHeader} alt="" />
      </div>
      <div className="CardapioHeader">
        <DropDownButton />
      </div>
      <div className="SearchHeader">
        <Search />
      </div>
      <div id="SacolaHeader">
        <SacolaTop />
      </div>
    </div>
  );
}

export default NavTop;
