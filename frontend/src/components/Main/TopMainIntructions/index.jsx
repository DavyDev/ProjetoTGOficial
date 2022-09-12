import React, { Component } from 'react';
import "./style.css"

import ImgBox1 from '../../../assets/images/escolheImgsBox/imgBox1.png';
import ImgBox2 from '../../../assets/images/escolheImgsBox/imgBox2.png';
import SetaVerOpcoes from '../../../assets/icons/SetBoxs/SetaBoxs.svg';

function TopMainIntructionn() {



    return(
        <div className="umdoitres">
            <div className="DicasBox">
            <h1>Como fazer seu pedido mais rápido ?</h1>

            <div className="EtapasDicas">
                <div className="Dica1">
                <h2>1</h2>
                <p>Selecione os produtos</p>
                </div>
                <div className="Dica2">
                <h2>2</h2>
                <p>Siga as instruções</p>
                </div>
                <div className="Dica3">
                <h2>3</h2>
                <p>Seu pedido será enviado por Whatsapp</p>
                </div>
            </div>
            </div>

            <div className="divCaféPaes">
            <div className="boxOne">
                <h1>Café e Pães</h1>
                <div className="divButtonImage1">
                <a href="">
                    Ver opções <img src={SetaVerOpcoes} alt="Café e Pães" />
                </a>
                <div className="escolheImg1">
                    <img src={ImgBox1} alt="Café e Pães" />
                </div>
                </div>
            </div>
            <div className="boxTwo">
                <h1>Salgados, Tortas e Combos</h1>
                <div className="divButtonImage2">
                <a href="">
                    Ver opções <img src={SetaVerOpcoes} alt="Salgados, Tortas e Combos" />
                </a>
                <div className="escolheImg2">
                    <img src={ImgBox2} alt="Salgados, Tortas e Combos" />
                </div>
                </div>
            </div>
            </div>
        </div>
    )

}

export default TopMainIntructionn;