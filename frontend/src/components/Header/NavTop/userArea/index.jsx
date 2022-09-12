import { useState } from 'react';
import './styles.css';
import UserSpace from '../../../../assets/icons/sair/user.svg';
import Sair from '../../../../assets/icons/sair/sair.svg';
import Pedidos from '../../../../assets/icons/sair/pedidos.svg';
import MeusDados from '../../../../assets/icons/sair/meusdados.svg';
import setaCardapio from '../../../../assets/icons/CardapioHeader/SetaCardapio.png';
import { useContext } from 'react';
import { ContextoLogin } from "../../../../contexts/ContextoLogin/context"
import { useHistory } from 'react-router-dom';



function UserArea(props) {
    
  const [setaIsOn, setSetaIsOn] = useState(false);
  const setaON = setaIsOn ? 'userON' : 'user';
  const ClasDropMenu = setaIsOn ? 'menuUser-Drop-ON' : 'menuUser-Drop-OFF';
  const nomeDoUserLogado = JSON.parse(localStorage.getItem('user'))

  const { authenticated, logout } = useContext(ContextoLogin)
  const navigateByUser = useHistory()

  const handleClick = () => {
    
    setSetaIsOn(!setaIsOn);
    console.log(setaIsOn)
    console.log(setaON)
    
  };

  const handleLogout = () => {
    logout();
  }


    return(
        <div className='userPerfil' onClick={handleClick}>
            <img className='userSpaces' src={UserSpace}/>
            <img className={setaON} src={setaCardapio}  />
            <ul className={ClasDropMenu}>
                <li className='saudacoesUser'>
                    <h2>Olá, {nomeDoUserLogado.nomeUsuario}</h2>
                </li>
                <li className='Li_Coloridos' onClick={() => navigateByUser.push("/home/clientePedidos")}>
                    <img className='imagensUser' src={Pedidos}/>
                    Pedidos
                </li>
                <li className='Li_Coloridos' onClick={() => navigateByUser.push("/home/clienteMeusDados")}>
                    <img className='imagensUser' src={MeusDados}/>
                    Meus dados
                </li>
                <li className='Li_Coloridos' onClick={handleLogout}>
                    <img className='imagensUser' src={Sair}/>
                    
                    {/* <p>{String(authenticated)}</p> */}
                    {/* <button onClick={handleLogout}>Logout</button> */}
                    Sair
                    
                </li>
            </ul>
        </div>
    )




}







export default UserArea;











