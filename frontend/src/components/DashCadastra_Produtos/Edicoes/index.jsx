
import './style.css';
import { useEffect, useRef, useState } from 'react';

import axios from 'axios'

import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import "./style.css";
import { storageFirebase } from "../../../firebase";
import Swal from 'sweetalert2'


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
  const [nomeDoProdutoParaSerEditado, setNomeDoProdutoParaSerEditado] = useState('')
  const [valuesInputs, SetValuesInputs] = useState(initialValuesFormUpdate)
  console.log(valuesInputs)
  const [lidaComPedidosCadastrar, SetLidaComPedidosCadastrar] = useState([])
  const [guardaSecaoDoCardapio, setGuardaSecaoDoCardapio] = useState("")
  const estadoBotao = toggleClick ? 'BotaoON' : 'BotaoOFF'
  const estadoMain = toggleClick ? 'MainON' : 'MainOFF'

  const [itensParaSelecaoEdicao, setItensParaSelecaoEdicao] = useState([]);
  const [armazenaItemsEcolhidosEdicao, setArmazenaItemsEcolhidosEdicao] = useState([])

  const itemDeMontagemProdutoEdicao = useRef(null);
  const qntItemDeMontagemProdutoEdicao = useRef(null);

  //Firebase-------------------------------------
  const imgEscolhidaFirebaseEdicao = useRef(produtoParaSerEditado.imagem)
  const [progressaoUploadEdicao, setProgressaoUploadEdicao] = useState(0)
  const [imgUrlEdicao, setImgUrlEdicao] = useState('')

  const handleUoloadImageFirebaseEdicao = (event) => {
    setImgUrlEdicao("")
    // const fileImg = event.split("\\", -1)

    console.log(event.files)

    const file = event.files[0]
    
    console.log(file)
    if(!file) return;

    const storageRef = ref(storageFirebase, `images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
        setProgressaoUploadEdicao(progress)
      },
      error => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          setImgUrlEdicao(url)
          SetProdutoParaSerEditado({ ...produtoParaSerEditado, imagem: url})
          Swal.fire({
            title: 'Sucesso!',
            text: 'Upload de atualização da imagem realizado com sucesso. Não esqueça de salvar as alterações realizadas.',
            imageUrl: url,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        })
      }
    )
  }



  //Firebase-------------------------------------
  
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
    if(telaDeEdição == false) {
      switch (event.target.id) {
        case "tapiocacrepioca":
          console.log("Este id aqui é o da tapioca")
          fetch(`http://localhost:3002/produtosParaEdicao/tapiocacrepioca`)
          .then(response => response.json())
          .then(resposta => SetLidaComPedidosCadastrar(resposta))
          break;
  
        case "lanches":
          console.log("Este id aqui é o da tapioca")
          fetch(`http://localhost:3002/produtosParaEdicao/lanches`)
          .then(response => response.json())
          .then(resposta => SetLidaComPedidosCadastrar(resposta))
          break;
  
        case "saladas":
          console.log("Este id aqui é o da tapioca")
          fetch(`http://localhost:3002/produtosParaEdicao/saladas`)
          .then(response => response.json())
          .then(resposta => SetLidaComPedidosCadastrar(resposta))
          break;
  
        case "bebidas":
          console.log("Este id aqui é o da tapioca")
          fetch(`http://localhost:3002/produtosParaEdicao/bebidas`)
          .then(response => response.json())
          .then(resposta => SetLidaComPedidosCadastrar(resposta))
          break;
  
        case "sobremesas":
          console.log("Este id aqui é o da tapioca")
          fetch(`http://localhost:3002/produtosParaEdicao/sobremesas`)
          .then(response => response.json())
          .then(resposta => SetLidaComPedidosCadastrar(resposta))
          break;
  
        case "doces":
          console.log("Este id aqui é o da tapioca")
          fetch(`http://localhost:3002/produtosParaEdicao/doces`)
          .then(response => response.json())
          .then(resposta => SetLidaComPedidosCadastrar(resposta))
          break;
      
        default:
          console.log("Não achou")
          break;
      }
    }
    else if(telaDeEdição == true){
      Swal.fire({
        title: 'Você tem certeza?',
        text: "Caso volte para a listagem, se foram feitas alterações no produto, elas serão perdidas",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Listar produtos',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

          SetTelaDeEdição(telaDeEdição == false)

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
          
          
        }
      })
      
    }
    

    /*console.log("O componente foi montado")
    fetch('http://localhost:3002/produtos')
    .then(response => response.json())
    .then(resposta => SetLidaComPedidosCadastrar(resposta))

    console.log(lidaComPedidosCadastrar)*/
  }
  const excluiProdutoCardapio = async (valorId) => {
    console.log(valorId)
    Swal.fire({
      title: 'Você deseja mesmo excluir este produto?',
      text: "Não sera possivel reverter esse processo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cancelar produto',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3002/produtos/${valorId}`)
        .then(response => console.log(response.data))
        
        await fetch(`http://localhost:3002/produtos/${guardaSecaoDoCardapio}`)
                .then(response => response.json())
                .then(resposta => SetLidaComPedidosCadastrar(resposta))
      }
      
    })
    
  }

  const habilitaTelaEditar = (produtoASerEditado) => {
    SetProdutoParaSerEditado(produtoASerEditado)
    setArmazenaItemsEcolhidosEdicao(JSON.parse(produtoASerEditado.dadosParaEstoque))
    setNomeDoProdutoParaSerEditado(produtoASerEditado.titulo)
    SetTelaDeEdição(!telaDeEdição)
  }
  
  const enviaAtualizacaoPedidoEdicao = async (event) => {
    event.preventDefault()
    axios.put(`http://localhost:3002/produtos/${produtoParaSerEditado.id}`, produtoParaSerEditado)
      //.then((resposta) => resposta.json())
      .then((resposta) => {
        console.log(resposta.data)
        // SetProdutoParaSerEditado(resposta.data.produtoAtualizado)
        Swal.fire(
          'Sucesso!',
          'Seu produto foi atualizado na plataforma.',
          'success'
          )
          
        })
        .catch(() => {
          console.log("Deu Errado")
          Swal.fire(
          'Erro!',
          'Não foi possivel atualizar o produto, verifique se todos os campos foram preenchidos.',
          'error'
          )
        });
        
        
        
        
        //  await axios.put(`http://localhost:3002/produtos/${trataValoresForms.id}`, `id=${trataValoresForms.id}&titulo=${trataValoresForms.titulo}&descricao=${trataValoresForms.descricao}&imagem=${trataValoresForms.imagem}&preco=${trataValoresForms.preco}&quantidade=${trataValoresForms.quantidade}&cardapio=${trataValoresForms.cardapio}`)
        //   .catch(erro => console.log(erro))
        
        
        // console.log("¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨")
        // console.log(produtoParaSerEditado)
        // console.log({
          //   // titulo: event.target.titulo.value,
          //   // // descricao: event.target.descricao.value,
          //   // imagem: event.target.imagem.value,
          //   // cardapio: event.target.cardapio.value,
          //   // preco: Number((event.target.preco.value).replace(",", ".")).toFixed(2),
          //   // itemsEquantidades: armazenaItemsEcolhidosEdicao
          // })
    
  }
  
  const vamosVer = (itemTeste) => {
    console.log(itemTeste)
  }
  
  const handleChange = (event) => {
    const { name, value } = event.target
    
    console.log(name)
    SetValuesInputs({ ...valuesInputs, [name]: value})
    SetProdutoParaSerEditado({ ...produtoParaSerEditado, [name]: value})
    
  }
  
  const adicionaItensEdicao = (event) => {
    event.preventDefault();
    const armazenaDadosItemEdicao = {
      nomeItem: itemDeMontagemProdutoEdicao.current.value,
      qntItem: Number((qntItemDeMontagemProdutoEdicao.current.value).replace(",", ".")),
    };
    console.log(itemDeMontagemProdutoEdicao.current.value);
    console.log(qntItemDeMontagemProdutoEdicao.current.value);
    console.log(armazenaDadosItemEdicao);
    // console.log(armazenaItemsEcolhidosEdicao);
    setArmazenaItemsEcolhidosEdicao([...armazenaItemsEcolhidosEdicao, armazenaDadosItemEdicao]);
  };
  
  
  
  useEffect(() => {
    axios
    .get(`http://localhost:3002/listaItensDosProdutos`)
    .then((response) => response.data)
    .then((resposta) => setItensParaSelecaoEdicao(resposta));
  }, []);
  
  useEffect(() => {
    SetProdutoParaSerEditado({...produtoParaSerEditado, dadosParaEstoque: JSON.stringify(armazenaItemsEcolhidosEdicao)})
  }, [armazenaItemsEcolhidosEdicao]);
  
  const excluiItemDoProdutoEdicao = (i) => {
    const nomeItemExcluidoEdicao = (armazenaItemsEcolhidosEdicao[i].nomeItem)
    
    const deixaSoItemsEscolhidosEdicao = armazenaItemsEcolhidosEdicao.filter((item, i) => item.nomeItem != nomeItemExcluidoEdicao)
    
    setArmazenaItemsEcolhidosEdicao(deixaSoItemsEscolhidosEdicao)
  }
  
  const voltarListaDeProdutos = () => {
    SetTelaDeEdição(!telaDeEdição)
    fetch(`http://localhost:3002/produtos/${guardaSecaoDoCardapio}`)
    .then(response => response.json())
    .then(resposta => SetLidaComPedidosCadastrar(resposta))
  }
  
  const congelamentodoProd = (dadosProd) => {
    
    const { idCongelamento, statusCongelamento } = dadosProd
    
    switch (statusCongelamento) {
      case 0:
        console.log("É para descongelar")
        console.log(dadosProd)
        
        // .then((resposta) => setItensParaSelecaoEdicao(resposta));
        Swal.fire({
          title: 'Você deseja descongelar o produto?',
          text: "Ao descongelar o produto ele ficará disponivel para compras na plataforma",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Descongelar produto',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            axios
            .put(`http://localhost:3002/comgelamentoProdutos/${idCongelamento}`, dadosProd)
            .then((response) => {
              console.log(response.status)
              // alert("produto atualizado")
              console.log(guardaSecaoDoCardapio)
                  Swal.fire(
                    'Sucesso!',
                    'Produto descongelado.',
                    'success'
                  ).then(response => {
                    fetch(`http://localhost:3002/produtosParaEdicao/${guardaSecaoDoCardapio}`)
                      .then(response => response.json())
                      .then(resposta => SetLidaComPedidosCadastrar(resposta))
                      .catch(error => {
                        Swal.fire(
                          'Erro!',
                          'Houve algum erro ao atualizar a listagem dos produtos, recarregue a pagina.',
                          'error'
                        )
                      })
                    }) 
                })
                .catch(error => {
                  console.log(error)
                  // alert("produto Não atualizado")
                  Swal.fire(
                    'Erro!',
                    'Não foi descongelar o produto, tente novamente.',
                    'error'
                  )
                })
                }
              })
        break;
      case 1:
        console.log("É para congelar")
        console.log(dadosProd)
        Swal.fire({
          title: 'Você deseja congelar o produto?',
          text: "Ao congelar o produto ele não ficará disponivel na plataforma",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Congelar produto',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            axios
            .put(`http://localhost:3002/comgelamentoProdutos/${idCongelamento}`, dadosProd)
            .then((response) => {
                console.log(response.status)
                // alert("produto atualizado")
                Swal.fire(
                  'Sucesso!',
                  'Produto congelado.',
                  'success'
                ).then(response => {
                  fetch(`http://localhost:3002/produtosParaEdicao/${guardaSecaoDoCardapio}`)
                    .then(response => response.json())
                    .then(resposta => SetLidaComPedidosCadastrar(resposta))
                    .catch(error => {
                      Swal.fire(
                        'Erro!',
                        'Houve algum erro ao atualizar a listagem dos produtos, recarregue a pagina.',
                        'error'
                      )
                    })
                  }) 
              })
              .catch(error => {
                console.log(error)
                // alert("produto Não atualizado")
                Swal.fire(
                  'Erro!',
                  'Não foi congelar o produto, tente novamente.',
                  'error'
                )
              })
              }
            })
        
          // .then((resposta) => setItensParaSelecaoEdicao(resposta));
        break;
    
      default:
        break;
    }
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
              {telaDeEdição == false ? (<table>

                {/* <div className="tabelaItensEscolhidos"> */}
                  
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Produto</th>
                        <th>Categ.</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lidaComPedidosCadastrar.map((itemSelecionado, i) => {
                        return (
                          <tr>
                            <th className="algun">{itemSelecionado.id}</th>
                            <td className="algun2">{itemSelecionado.titulo}</td>
                            <td className="algun3">{itemSelecionado.cardapio}</td>
                            <td className="algun4">
                              <button  onClick={() => habilitaTelaEditar(itemSelecionado)}>Editar</button>
                              <button onClick={() => excluiProdutoCardapio(itemSelecionado.id)}>Excluir</button>
                              {itemSelecionado.ativo == 0 ? <button className='deveSerCongelado' onClick={() => congelamentodoProd({idCongelamento: itemSelecionado.id, statusCongelamento: 1})}>Congelar</button> : <button className='naoDeveSerCongelado' onClick={() => congelamentodoProd({idCongelamento: itemSelecionado.id, statusCongelamento: 0})}>Descongelar</button>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  
                {/* </div> */}
                {/* --------------------------------------------------- */}
                {/* <thead>
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
                        <td className="">{carro.id}</td>
                        <td className="">{carro.titulo}</td>
                        <td className="">{carro.cardapio}</td>
                        <td className="">
                          <button  onClick={() => habilitaTelaEditar(carro)}>Editar</button>
                          <button onClick={() => excluiProdutoCardapio(carro.id)}>Excluir</button>
                        </td>
                      </tr>)
                    })}
                </tbody> */}
                
              
                </table>) : (
                
                <div className='areaEditProduto'>
                  <div className="edicaoTopo">
                    <div className="edicaoVoltar"><button onClick={() => voltarListaDeProdutos()}>Voltar</button></div>
                    <div className="edicaoTitulo">Edição do produto: <span>{nomeDoProdutoParaSerEditado}</span></div>
                  </div>

                  <div>
                    <form onSubmit={(event) => enviaAtualizacaoPedidoEdicao(event)} >
                      <div className="edicaoInputsoForm">
                        <label  htmlFor="id">Id</label><br />
                        <input name="id" id="IdForm" className="InputsForm" type="text" value={produtoParaSerEditado.id} disabled/>
                      </div>

                      <div className="edicaoInputsoForm">
                        <label  htmlFor="titulo">Titulo</label><br />
                        <input name="titulo" id="TituloForm" className="InputsForm" type="text" onChange={(event) => handleChange(event)} value={produtoParaSerEditado.titulo}/>
                      </div>

                      <div className="edicaoInputsoForm">
                        <label htmlFor="descricao">Descrição (programar analisar certinho)</label>
                        <input name="descricao" id="DescricaoForm" className="InputsForm" type="text" onChange={(event) => handleChange(event)} value={produtoParaSerEditado.descricao}/>
                      </div>

                      <div className="divLabeledicao_imagemProd">
                        Imagem atual do produto
                      </div>
                      <div className="edicaoInputsoForm, edicao_imagemProd">
                        <div className='edicao_imagemProdBorda1'>
                          <img src={produtoParaSerEditado.imagem} alt="" srcset="" />
                        </div>
                        <div className='escolherEditarImagem edicao_imagemProdBorda2'>
                          <div className=''>
                            <input ref={imgEscolhidaFirebaseEdicao} name="imagem" id="ImagemForm" className="InputsForm" type="file" onChange={(event)=> handleUoloadImageFirebaseEdicao(imgEscolhidaFirebaseEdicao.current)} placeholder={produtoParaSerEditado.imagem}/>
                            <br />{!imgUrlEdicao && <progress value={progressaoUploadEdicao} max="100"/>}
                          </div>
                        </div>
                      </div>
                      
                      <div className="edicaoInputsoForm">
                        <label htmlFor="cardapio">Menu do Cardapio</label>
                        <select name="cardapio" id="CardapioForme" className="InputsForm" onChange={(event) => handleChange(event)} >
                          <option value="">Selecione uma opção</option>
                          <option selected={produtoParaSerEditado.cardapio == "tapiocacrepioca" ? true : false} value="tapiocacrepioca">Tapioca/Crepioca</option>
                          <option selected={produtoParaSerEditado.cardapio == "lanches" ? true : false} value="lanches">Lanches</option>
                          <option selected={produtoParaSerEditado.cardapio == "saladas" ? true : false} value="saladas">Saladas</option>
                          <option selected={produtoParaSerEditado.cardapio == "bebidas" ? true : false} value="bebidas">Bebidas</option>
                          <option selected={produtoParaSerEditado.cardapio == "sobremesas" ? true : false} value="sobremesas">Sobremesas</option>
                          <option selected={produtoParaSerEditado.cardapio == "doces" ? true : false} value="doces">Doces</option>
                        </select>
                      </div>

                      <div className="edicaoInputsoForm">
                        <label htmlFor="preco" onClick={() => vamosVer(armazenaItemsEcolhidosEdicao)}>Preço</label>
                        <input name="preco" id="PrecoForm" className="InputsForm"  type="number" onChange={(event) => handleChange(event)} value={produtoParaSerEditado.preco}/>
                      </div>
                      

                      {/* <div className="edicaoInputsoForm">
                        <label htmlFor="Quantidade" >Quantidade no estoque</label>
                        <input name="quantidade" id="QuantidadeForm" className="InputsForm" type="number" onChange={(event) => handleChange(event)} />
                      </div> */}

                      <div className="edicaoInputsoForm">
                        
                        {/* <label htmlFor="descricao">Items do produto (Programar)</label>
                        <input name="descricao" id="DescricaoForm" className="InputsForm" type="text" onChange={(event) => handleChange(event)} placeholder={produtoParaSerEditado.descricao}/>*/}
                        <div className='divEdicaoDosItensDoProduto'>
                          <div className='divSelecionaItensEdit'>

                            <div className="selecionaOsItems">
                              <label htmlFor="itens">Selecione os itens </label> <br />
                              <select name="itens" ref={itemDeMontagemProdutoEdicao}>
                                <option value="">Selecione uma opção</option>
                                {itensParaSelecaoEdicao.map((item, i) => {
                                  return <option value={item.nomeItem}>{item.nomeItem}</option>;
                                })}
                              </select>
                            </div>

                            <div className="selecionaQntItemsEdit">
                              <label htmlFor="itens">Quantidade do item </label><br />
                              <input ref={qntItemDeMontagemProdutoEdicao} type="" name="" />
                            </div>

                            <div className="adicionaItemsEQuantEdit">
                              <button type="button" onClick={(event) => adicionaItensEdicao(event)}>Adicionar item</button>
                            </div>

                          </div>
                          <div>
                            <table>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Itens do Produto</th>
                                  <th>Quanti.</th>
                                  <th>Ações</th>
                                </tr>
                              </thead>
                              <tbody>
                                {armazenaItemsEcolhidosEdicao.map((itemSelecionado, i) => {
                                  return (
                                    <tr>
                                      <th>{i + 1}</th>
                                      <td>{itemSelecionado.nomeItem}</td>
                                      <td>{itemSelecionado.qntItem}</td>
                                      <td>
                                        <button
                                          type="button"
                                          className="inputDaQntPorItem"
                                          onClick={() => excluiItemDoProdutoEdicao(i)}
                                        >
                                          X
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>

                      </div>

                      <div className="edicaoInputsoFormEdit">
                        <button type="submit">Salvar alterações</button>
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
