import axios from 'axios'
import './styles.css'
import Sacola from '../../../../assets/images/Sacola/Sacola.png'
import Lixeira from '../../../../assets/icons/sacola/lixeira.svg'
import ProdutosLoja from '../../../Main/ProdutosLoja';
import { useState, useContext, useEffect } from 'react';
import { ContextoSacola } from '../../../../contexts/ContextoSacola/context';
import { EnviaPedidosFinalizadosDa_Sacola, removeDa_Sacola } from '../../../../contexts/ContextoSacola/action';

import InputMask from 'react-input-mask'
import { useRef } from 'react';

//import { ContextoLogin } from "../../../../contexts/ContextoLogin/context"


let armazenaPedidosRemovidos = []
function SacolaTop(props) {


  const usandoContexto = useContext(ContextoSacola)
  const { pedidoState, pedidoDispatch, remocaoState, remocaoDispatch, armazenaOsPrecos, contador, setFinalizaPedidosSacolaDispatch } = usandoContexto
  let { armazenaOsPedidos } = usandoContexto
  const [sacolaIsDrop, setSacolaIsDrop] = useState(false)
  const [teste, setTeste] = useState("Variavel teste")
  const [nomeCliente, setNomeCliente] = useState('')
  const [numeroCliente, setNumeroCliente] = useState("")

  const refDoSelectDePagamento = useRef(null)
  //const { loggedUser } = useContext(ContextoLogin)


  const sacolaDropOn = sacolaIsDrop ? "SacolaPedidosON" : "SacolaPedidosOFF"

  //Variáveis Principais de fornecimento dos dados


  //------------------------------------------------
  
  /*axios.post(`http://localhost:3002/listaProdutosDoPedido/cliente`, {method: 'POST', body: '{"foo":"bar"}'})
  .then((resposta) => console.log(resposta))
  .catch(() => console.log("Deu Errado"))*/




  const handleClickSacola = () => {
    setSacolaIsDrop(!sacolaIsDrop)
    console.log(armazenaOsPedidos)

  }

  useEffect(() => {

  })


 function pegaPedidosRemovidos(numRemocao) {
  armazenaPedidosRemovidos =

  console.log(armazenaPedidosRemovidos)
  //console.log(loggedUser.id)
  
  removeDa_Sacola(remocaoDispatch, numRemocao)
  
 }
 
 async function enviaTodosOsPedidos(pedidosQueSeraoEnviados) {
   const idDoClienteDoPedido = JSON.parse(localStorage.getItem('user')) 
   console.log("pppppppppppppp")
   console.log(idDoClienteDoPedido)

   console.log("Aqui irá enviar os pedidos")
   console.log(pedidosQueSeraoEnviados)
   console.log(armazenaOsPedidos)

   

   /*axios.post(`http://localhost:3002/pedidosFeitos/cliente/${nomeCliente}/`)
    //.then((resposta) => resposta.json())
      .then((resposta) => console.log(resposta.data))
      .catch(() => console.log("Deu Errado"))*/
      
      if(pedidosQueSeraoEnviados.length <= 0){
        return
      }
      else if(pedidosQueSeraoEnviados.length >= 1 && refDoSelectDePagamento.current.value != "#"){

        console.log(pedidosQueSeraoEnviados)
        console.log("[[[[[[[[[[[[[[[[")

        axios.post(`http://localhost:3002/pedidosFeitos2/cliente`, {
            idDoCliente: idDoClienteDoPedido.id,
            preco: armazenaOsPrecos,
            nomeUsuario: idDoClienteDoPedido.nomeUsuario,
            qntItems: contador,
            formaDePagamento: refDoSelectDePagamento.current.value
          })
          //.then((resposta) => resposta.json())
          .then((resposta) => {
            console.log(resposta.data)

            for(let i = 0; i < pedidosQueSeraoEnviados.length; i++){
              console.log("oi*******")
              console.log(pedidosQueSeraoEnviados[i].titulo)

              axios.post(`http://localhost:3002/produtosNosPedidos/cliente`, {
                titulo: pedidosQueSeraoEnviados[i].titulo,
                descricao: pedidosQueSeraoEnviados[i].descricao,
                imagem: pedidosQueSeraoEnviados[i].imagem,
                preco: Number(pedidosQueSeraoEnviados[i].preco),
                quantidade: Number(pedidosQueSeraoEnviados[i].quantidade),
                pertenceColumn: "fazer",
                IdPedidos: resposta.data.idDoPedido,
                dadosParaEstoque: pedidosQueSeraoEnviados[i].dadosParaEstoque,
                comentario: pedidosQueSeraoEnviados[i].comentario
              })
                .then((resposta) => console.log("Deu certo"))
                .catch(() => console.log("Deu Errado"))
              
              console.log("oi*******")
    

            }


          })
          .catch(() => console.log("Deu Errado"));

        console.log("------------------------");  
        alert("Colocar mensagem de sucesso do pedido feito");  
        
        //este é o que estava sendo usado vvvvv
        /*for(let i = 0; i < pedidosQueSeraoEnviados.length; i++){
          console.log("oi*******")
          console.log(pedidosQueSeraoEnviados)
          console.log(nomeCliente)
          console.log(numeroCliente)
          console.log("oi*******")
          
          axios.post(`http://localhost:3002/teste/${nomeCliente}/${pedidosQueSeraoEnviados[i].titulo}/${pedidosQueSeraoEnviados[i].descricao}/${pedidosQueSeraoEnviados[i].preco}/${pedidosQueSeraoEnviados[i].quantidade}`)
          //.then((resposta) => resposta.json())
          .then((resposta) => console.log(resposta.data))
          .catch(() => console.log("Deu Errado"))
          //oficial vvvvvv
          //axios.post(`http://localhost:3002/pedidosFeitos/cliente/${nomeCliente}/${numeroCliente}/${pedidosQueSeraoEnviados[i].titulo}/${pedidosQueSeraoEnviados[i].descricao}/${pedidosQueSeraoEnviados[i].preco}/${pedidosQueSeraoEnviados[i].quantidade}`)
          
          //Testes vvvvvv
          
          
          
          //res.data.form; // { hello: 'world' }
          //res.data.headers['Content-Type'];
        }*/
          EnviaPedidosFinalizadosDa_Sacola(setFinalizaPedidosSacolaDispatch, false)
        }
        else{

          alert("Informar que uma forma de pagemento deve ser selecionada");  
        }
          
        
      

    }

    const handleChangeName = (event) => {
      setNomeCliente((event.target.value))
      
    } 
    {/* Você parou aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii*/}
 const handleChangeNumero = (event) => {
  setNumeroCliente('55' + event.replace(/[^0-9]/g, ''))
 } 

 console.log(nomeCliente)
 console.log(numeroCliente)
//  console.log(refDoSelectDePagamento.current.value); 

  return (
    <div id="divSacola" >
      <div className="AreaSacola">
        <img  src={Sacola} alt="Sacola" onClick={handleClickSacola}/>
        <span className="ToolTipSacola">{contador}</span>
      </div>

      <div className={sacolaDropOn}>
      {armazenaOsPedidos.length === 0 ?
      <>
        <p className="tituloSacola">Sacola de pedidos </p>

        <div className="sacolaVazia" >Sacola de pedidos vazia</div>
        <div className="sacolaVazia2">Nenhum item foi adcionado a esta sacola</div>

      </> :

      <>
        <p className="tituloSacola">Sacola de pedidos </p>
        
        {armazenaOsPedidos.map((pedido, i) => {
          return (
            <div key={i} >
              <div className="cadaPedidoDaSacola">
                <div className="ajustaDadosPedidos">
                  <div className="pedidoTitulo">{pedido.quantidade}x {pedido.titulo}</div>
                  {pedido.comentario ? <div className='ObsComentarioNoProduto'>
                    Obs.: {pedido.comentario}
                  </div> : ""}
                  

                  <div className="gridEditarEPreco">
                    <div className='lixeiraProdutos'>
                      <img  className='lixeira' src={Lixeira} onClick={() => pegaPedidosRemovidos(pedido.codRandon)}/>
                    </div>
                    <div className='PrecoPedidosSacolas'>R$ {pedido.preco}</div>
                  </div>
                </div>
              </div>
            </div>
          )

        })}

        <div className="TotalPedidos">
          <div className="FormaPagamento">
            <div className='divTituloPagemento'>
              Forma de pagamento
            </div>

            
            <select ref={refDoSelectDePagamento} className='divEscolhaPagemento' name="" id=""   /*disabled="disabled"*/>
              <option value="#">Selecione uma opção</option>
              <option value="debito"> Débito</option>
              <option value="credito">Crédito</option>
              <option value="aleloAlimentacaoRefeicao">Alelo alimentação e refeição</option>
              <option value="ticketAlimentacaoRefeicao">Tiket alimentação e refeição</option>
              <option value="pix">Pix</option>
              <option value="dinheiro">Dinheiro</option>
            </select>
            
            
          </div>
          
          <div className="TotalPagamento">
            <div className="TotalValor">
              Total
            </div>

            <div className="PrecoTotalPedidosSacolas">
              R$ {armazenaOsPrecos.toFixed(2)}
            </div>
          </div>
          
          <div className="FinalizaPedidos">
            {/* <div className='divNomeCliente'>
              <div className='boxNomeCliente'>Nome</div>
              <input type="text" placeholder="Digite seu nome e finalize" onChange={(event) => setNomeCliente(event.target.value)}/>
            </div>

            <div className='divNumeroCliente'>
              <div className='boxNumeroCliente'>Celular</div>
              <InputMask mask="(99) 99999-9999" placeholder='Digite seu WhatsApp'  onChange={(event) => handleChangeNumero(event.target.value)}/>
            </div> */}

            <div className='divBotaoFinalizaPedido'>
              <button onClick={() => enviaTodosOsPedidos(armazenaOsPedidos)}>Finalizar Pedido</button>
            </div>
          </div>

        </div>
      </>}





      </div>





    </div>
  );
};
export default SacolaTop;


/*
  {pedidoState.map((pedido, i) => {
          return (

            <div key={i} >
              <div className="cadaPedidoDaSacola">
                <hr />
                <div className="ajustaDadosPedidos">
                  <div className="pedidoTitulo">{pedido.titulo}--------------------------------- {pedido.preco}</div>

                  <div className="gridEditarEPreco">
                    <div>
                      Remover
                    </div>
                    <div>{pedido.preco}</div>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          )
        })}
*/
