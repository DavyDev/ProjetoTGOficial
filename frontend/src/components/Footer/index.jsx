
import './styles.css';

import ImgFacebook from '../../assets/images/RedesSociaisFooter/facebook.png'
import ImgInstagram from '../../assets/images/RedesSociaisFooter/instagram.png'


function Footer() {
  return (
    <div className="DivFooter">
      <div className="footerDiv3">
        <div className="separacao1">
          <div className="linhaHr1">
            <hr />
          </div>
    
        </div>
        <div className="separacao2">
          <div className="titleLogo">
            <h1>DeckCafé</h1>
          </div>
        </div>
        <div className="separacao3">
          <div className="linhaHr2">
            <hr />
          </div>
        </div>
      </div>
      <div className='SegundaDivFooter'>
        <div className='SobreNos'>
          <h1>Sobre nós</h1>
          <p> O Deck Café é uma empresa de Franca (SP), é uma lanchonete estabelecida atualmente dentro do complexo da antiga empresa HB, onde hoje se tornou propriedade da empresa Magazine Luiza. Somos uma lanchonete que atende os clientes com a melhor qualidadee sempre com um sorriso no rosto para que possamos sempre dar o nosso melhor todos os dias. Comtamos atualmente, somente com o atendimento presencial dentro do complexodo Magazine Luiza, Porem pretendemos expandir as fronteiras e atender os mais diversos clientes da região. </p>
        </div>
        <div className='RedesFooter'>
          <div className="Redes">
            <a href="" className="RedeFace">
              <img src={ImgFacebook} alt="" />
            </a>
            <a href="" className="RedeInsta">
              <img src={ImgInstagram} alt="" />
            </a>
          </div>

          <div className="Separador">
            <div className="LinhaSeparadora"> </div>
          </div>
        </div>
        <div className='Contato'>
          <h1>Contato</h1>
          <p>Franca, SP</p>
          <p>
            R. Pedro Silveiras, Casa 2030,
            Jd.Palmeiras  CEP: 14406 -709
            silva.davybrenon@gmail.com
            Tel. +55 16 98244-6120</p>
        </div>
      </div>
      <div className="TerceiraDivFooter">

        <div className="BoxDeSujestoes">
          <form className="Form" action="">
            <p className="LabelAerea" >
              Deixe suas Sujestões a baixo !
            </p>
            <div className='BoxArea'>
              <textarea name="" id="" cols="30" rows="10" placeholder="Digite aqui...">
              </textarea>
            </div>
            <input className="Submit" type="submit" />
          </form>
        </div>
      </div>
      <div className="Desenvolvedor">
        <p>Created in 2021 │ By Davy Brenon</p>
      </div>
    </div>
  );
}

export default Footer;
