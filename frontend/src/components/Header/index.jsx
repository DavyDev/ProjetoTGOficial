import './styles.css';
import NavTop from './NavTop';



function Header() {
  return (
    <div className="header">
      
      <div id='topHeaderFixed'>
        <NavTop />
        <hr id="hr_1" />
        <hr id="hr_2" />
      </div>
    </div>
  );
}

export default Header;
