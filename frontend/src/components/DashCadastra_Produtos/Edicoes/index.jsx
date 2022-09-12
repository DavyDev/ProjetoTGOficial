
import './style.css';
import { useEffect, useState } from 'react';

import axios from 'axios'


/*import DashLogoDeck from '../../assets/icons/DashHeader/DashLogoDeck.svg'
import DashCadastraProdutos from '../../assets/icons/DashHeader/DashCadastraProdutos.png'
import DashPedidosEVendas from '../../assets/icons/DashHeader/DashPedidosEVendas.png'
import DashEstoque from '../../assets/icons/DashHeader/DashEstoque.png'
import DashSujestoes from '../../assets/icons/DashHeader/DashSujestoes.png'
import DashBarsToggle from '../../assets/icons/DashHeader/DashBarsToggle.png'
import DashSearch from '../../assets/icons/DashHeader/DashSearch.png'
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';*/

const initialValuesFormUpdate = {
  id: 0,
  titulo: "",
  descricao: "",
  imagem: "",
  preco: 0,
  quantidade: 0
}


function Edicoes() {

  const [toggleClick, SetToggleClick] = useState(true)
  const [telaDeEdição, SetTelaDeEdição] = useState(false)
  const [produtoParaSerEditado, SetProdutoParaSerEditado] = useState(false)
  const [valuesInputs, SetValuesInputs] = useState(initialValuesFormUpdate)
  console.log(valuesInputs)
  const [lidaComPedidosCadastrar, SetLidaComPedidosCadastrar] = useState([])
  const [guardaSecaoDoCardapio, setGuardaSecaoDoCardapio] = useState("")
  const estadoBotao = toggleClick ? 'BotaoON' : 'BotaoOFF'
  const estadoMain = toggleClick ? 'MainON' : 'MainOFF'

  

  const handleClick = () => {
    SetToggleClick(!toggleClick)


  }
  console.log(estadoBotao)
  console.log(estadoMain)

  /*const testeData = {
    id: 1,
    titulo: "HatunaMatata",
    descricao: "Batatinha frita 123",
    imagem: "URL1",
    preco: 10,
    quantidade: 8
  }*/

  /*function fazPost(event, dados) {
    // eslint-disable-next-line no-undef
    //event.preventDefault()
    axios.put("http://localhost:3002/produtos/", testeData)
    //.then((resposta) => resposta.json())
      .then((resposta) => console.log(resposta.data))
      .catch(() => console.log("Deu Errado"))
  }*/
  function fazPut(event) {
    event.preventDefault()

    const dadosDoForm = {
      id: 1,
      titulo: event.target.titulo.value,
      descricao: event.target.descricao.value,
      imagem: event.target.imagem.value,
      preco: event.target.preco.value,
      quantidade: event.target.quantidade.value
    }
    
    //console.log(event.target.titulo.value)
    
    //, `id=${1}&ids=${2}`

    //Esse aqui é o correto, esta funcionando corretamente
     /*axios.put(`http://localhost:3002/produtos/${4}`, `id=${dadosDoForm.id}&titulo=${dadosDoForm.titulo}&descricao=${dadosDoForm.descricao}&imagem=${dadosDoForm.imagem}&preco=${dadosDoForm.preco}&quantidade=${dadosDoForm.quantidade}`)
        .then(response => console.log(response.data))
        .catch(erro => console.log(erro))*/

    

    /*axios.put(`http://localhost:3002/produtos/1`, {
      "id": 1,
      "titulo": "Bananão",
      "descricao": "Batatinha frita 123",
      "imagem": "URL1",
      "preco": 17,
      "quantidade": 8
    })
    //.then((resposta) => resposta.json())
      .then((resposta) => console.log(resposta.data))
      .catch(() => console.log("Deu Errado"))*/
  }

  useEffect(() => {
    
  }, [])

  const identifica = (event) => {
  console.log(event.target.id)
    setGuardaSecaoDoCardapio(event.target.id)

    switch (event.target.id) {
      case "tapiocacrepioca":
        console.log("Este id aqui é o da tapioca")
        fetch(`http://localhost:3002/produtos/tapiocacrepioca`)
        .then(response => response.json())
        .then(resposta => SetLidaComPedidosCadastrar(resposta))
        break;

      case "lanches":
        console.log("Este id aqui é o da tapioca")
        fetch(`http://localhost:3002/produtos/lanches`)
        .then(response => response.json())
        .then(resposta => SetLidaComPedidosCadastrar(resposta))
        break;

      case "saladas":
        console.log("Este id aqui é o da tapioca")
        fetch(`http://localhost:3002/produtos/saladas`)
        .then(response => response.json())
        .then(resposta => SetLidaComPedidosCadastrar(resposta))
        break;

      case "bebidas":
        console.log("Este id aqui é o da tapioca")
        fetch(`http://localhost:3002/produtos/bebidas`)
        .then(response => response.json())
        .then(resposta => SetLidaComPedidosCadastrar(resposta))
        break;

      case "sobremesas":
        console.log("Este id aqui é o da tapioca")
        fetch(`http://localhost:3002/produtos/sobremesas`)
        .then(response => response.json())
        .then(resposta => SetLidaComPedidosCadastrar(resposta))
        break;

      case "doces":
        console.log("Este id aqui é o da tapioca")
        fetch(`http://localhost:3002/produtos/doces`)
        .then(response => response.json())
        .then(resposta => SetLidaComPedidosCadastrar(resposta))
        break;
    
      default:
        console.log("Não achou")
        break;
    }

    /*console.log("O componente foi montado")
    fetch('http://localhost:3002/produtos')
    .then(response => response.json())
    .then(resposta => SetLidaComPedidosCadastrar(resposta))

    console.log(lidaComPedidosCadastrar)*/
  }
  const excluiProdutoCardapio = async (valorId) => {
    console.log(valorId)
    await axios.delete(`http://localhost:3002/produtos/${valorId}`)
        .then(response => console.log(response.data))
        
    await fetch(`http://localhost:3002/produtos/${guardaSecaoDoCardapio}`)
            .then(response => response.json())
            .then(resposta => SetLidaComPedidosCadastrar(resposta))
  }

  const habilitaTelaEditar = (produtoASerEditado) => {
    SetProdutoParaSerEditado(produtoASerEditado)
    SetTelaDeEdição(!telaDeEdição)
  }
  
  const enviaAtualizcaoPedido =  async (event) => {
    const trataValoresForms = {
      id: produtoParaSerEditado.id,
      titulo: valuesInputs.titulo,
      descricao: valuesInputs.descricao,
      imagem: valuesInputs.imagem,
      preco: Number(valuesInputs.preco),
      quantidade: Number(valuesInputs.quantidade),
      cardapio: valuesInputs.cardapio,

    }
    event.preventDefault()

    await axios.put(`http://localhost:3002/produtos/${trataValoresForms.id}`, `id=${trataValoresForms.id}&titulo=${trataValoresForms.titulo}&descricao=${trataValoresForms.descricao}&imagem=${trataValoresForms.imagem}&preco=${trataValoresForms.preco}&quantidade=${trataValoresForms.quantidade}&cardapio=${trataValoresForms.cardapio}`)
        .then(response => console.log(response.data))
        
        .catch(erro => console.log(erro))


    console.log(trataValoresForms)
    
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    
    SetValuesInputs({ ...valuesInputs, [name]: value})
    
  }



  return(

    /*
      <ul>
          <li>
            <Link  to="">
              <span className="Icon"> <img src={DashLogoDeck} alt="Dashboard Logo" /></span>
              <span className="Title"><h2>DeckCafé</h2></span>
            </Link>
          </li>
          <li>
            <Link  to="">
              <span className="Icon"><img src={DashCadastraProdutos} alt="" /></span>
              <span className="Title">Cadastar Produtos</span>
            </Link>
          </li>
          <li>
            <Link  to="">
              <span className="Icon"><img src={DashPedidosEVendas} alt="" /></span>
              <span className="Title">Consultar Pedidos</span>
            </Link>
          </li>
          <li>
            <Link  to="">
              <span className="Icon"><img src={DashEstoque} alt="" /></span>
              <span className="Title">Consultar Estoque</span>
            </Link>
          </li>
          <li>
            <Link  to="">
              <span className="Icon"><img src={DashSujestoes} alt="" /></span>
              <span className="Title">Consultar Sujestões</span>
            </Link>
          </li>
        </ul>
    */


      

        <div>

          <div className="listaCriaEdita">
            <div className="listagemOpçõesMenus">
              <div id="tapiocacrepioca" className="OptionTapiocaCrepioca" onClick={(event) => identifica(event)}>
                <img src="" alt="" />
                Tapioca/Crepiocs
              </div>
              <div id="lanches" className="OptionLanches" onClick={(event) => identifica(event)}>
                Lanches
              </div>
              <div id="saladas" className="OptionSaladas"onClick={(event) => identifica(event)}>
                Saladas
              </div>
              <div id="bebidas" className="OptionBebidas"onClick={(event) => identifica(event)}>
                Bebidas
              </div>
              <div id="sobremesas" className="OptionSobremesas"onClick={(event) => identifica(event)}>
                Sobremesas
              </div>
              <div id="doces" className="OptionDoces" onClick={(event) => identifica(event)}>
                Doce
              </div>
            </div>
            <div className="pedidosRelacionados">
              {telaDeEdição == false ? (<ul>
                <thead>
                  <tr>
                    <td>Id</td>
                    <td>Produto</td>
                    <td>Categ.</td>
                    <td>Ações</td>
                  </tr>
                </thead>
                  

                  <tbody >
                    <br />
                      {lidaComPedidosCadastrar.map((carro, i) => {
                        return (<tr key={i}>
                          <td className="algun">{carro.id}</td>
                          <td className="algun2">{carro.titulo +"  "+ carro.descricao}</td>
                          <td className="algun3">{carro.cardapio}</td>
                          <td className="algun4">
                            <button  onClick={() => habilitaTelaEditar(carro)}>Editar</button>
                            <button onClick={() => excluiProdutoCardapio(carro.id)}>Excluir</button>
                          </td>
                        </tr>)
                      })}
                  </tbody>
                
              
              </ul>) : (
                
                <div>
                  <div className="edicaoTopo">
                    <div className="edicaoVoltar"><button onClick={() => habilitaTelaEditar()}>Voltar</button></div>
                    <div className="edicaoTitulo"><h1 onClick={() => console.log(produtoParaSerEditado)}>Edição de pedidos {produtoParaSerEditado.id}</h1></div>
                  </div>

                  <div>
                    <form onSubmit={(event) => enviaAtualizcaoPedido(event)} >
                      <div className="edicaoInputsoForm">
                        <label  htmlFor="id">Id</label><br />
                        <input name="id" id="IdForm" className="InputsForm" type="text" value={produtoParaSerEditado.id} disabled/>
                      </div>

                      <div className="edicaoInputsoForm">
                        <label  htmlFor="titulo">Titulo</label><br />
                        <input name="titulo" id="TituloForm" className="InputsForm" type="text" onChange={(event) => handleChange(event)} placeholder={produtoParaSerEditado.titulo}/>
                      </div>

                      <div className="edicaoInputsoForm">
                        <label htmlFor="descricao">Descrição</label>
                        <input name="descricao" id="DescricaoForm" className="InputsForm" type="text" onChange={(event) => handleChange(event)} placeholder={produtoParaSerEditado.descricao}/>
                      </div>

                      <div className="edicaoInputsoForm">
                        <label htmlFor="imagem">Imagem</label>
                        <input name="imagem" id="ImagemForm" className="InputsForm" type="text" onChange={(event) => handleChange(event)} placeholder={produtoParaSerEditado.imagem}/>
                      </div>
                      
                      <div className="edicaoInputsoForm">
                        <label htmlFor="cardapio">Menu do Cardapio</label>
                        <select name="cardapio" id="CardapioForme" className="InputsForm" onChange={(event) => handleChange(event)} >
                          <option value="">Selecione uma opção</option>
                          <option value="tapiocacrepioca">Tapioca/Crepioca</option>
                          <option value="lanches">Lanches</option>
                          <option value="saladas">Saladas</option>
                          <option value="bebidas">Bebidas</option>
                          <option value="sobremesas">Sobremesas</option>
                          <option value="doces">Doces</option>
                        </select>
                      </div>

                      <div className="edicaoInputsoForm">
                        <label htmlFor="preco">Preço</label>
                        <input name="preco" id="PrecoForm" className="InputsForm"  type="number" onChange={(event) => handleChange(event)} placeholder={produtoParaSerEditado.preco}/>
                      </div>

                      <div className="edicaoInputsoForm">
                        <label htmlFor="Quantidade">Quantidade no estoque</label>
                        <input name="quantidade" id="QuantidadeForm" className="InputsForm" type="number" onChange={(event) => handleChange(event)} />
                      </div>
                      <div className="edicaoInputsoForm">
                        <button type="submit">Salvar</button>
                      </div>
                    </form>
                  </div>
                </div>
                
                

              )}
              
            </div>
          </div>
        </div>
      
  )
}

export default Edicoes;
