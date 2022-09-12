import React, { Component } from 'react';

import ProdutosLoja from "./ProdutosLoja/index"
import "./style.css"
import TopMainIntructionn from './TopMainIntructions';

function Main() {


  return (
    // <div className='mainSpace'>
    <div className='DivMain'>
      <TopMainIntructionn/>
      <div className="DivMainProdutos">
        <ProdutosLoja />
      </div>
    </div>
  );
}



export default Main;
