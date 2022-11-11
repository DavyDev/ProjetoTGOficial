import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import "./style.css";
import { storageFirebase } from "../../../firebase";
import Swal from 'sweetalert2'

function Cadastros() {
  const [observaExclusaoDeItens, setObservaExclusaoDeItens] = useState([]);
  const [itensParaSelecao, setItensParaSelecao] = useState([]);
  const [armazenaItemsEcolhidos, setArmazenaItemsEcolhidos] = useState([]);
  const itemDeMontagemProduto = useRef(null);
  const qntItemDeMontagemProduto = useRef(null);
  const prodCongelado = useRef("0");


  //Relacionadas ao Firebase e suas configurações
  const [imgUrl, setImgUrl] = useState("")
  const [progressaoUpload, setProgressaoUpload] = useState(0)

  const imgEscolhidaFirebase = useRef(null)

  const handleUoloadImageFirebase = (event) => {
    setImgUrl("")
    // const fileImg = event.split("\\", -1)

    const file = event.files[0]
    
    console.log(file)
    if(!file) return;

    const storageRef = ref(storageFirebase, `images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
        setProgressaoUpload(progress)
      },
      error => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          setImgUrl(url)
          Swal.fire({
            title: 'Obaa!',
            text: 'Upload da imagem realizado com sucesso.',
            imageUrl: url,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        })
      }
    )
  }  
  
  //---------------------------------------------

  const testezinhobb = (event) => {
    event.preventDefault();
    const armazenaDadosItem = {
      nomeItem: itemDeMontagemProduto.current.value,
      qntItem: Number((qntItemDeMontagemProduto.current.value).replace(",", ".")),
    };
    console.log(itemDeMontagemProduto.current.value);
    console.log(qntItemDeMontagemProduto.current.value);
    console.log(armazenaDadosItem);
    console.log(armazenaItemsEcolhidos);
    setArmazenaItemsEcolhidos([...armazenaItemsEcolhidos, armazenaDadosItem]);
  };

  const cadastrandoDadosProduto = (event) => {
    event.preventDefault();

    Swal.fire({
      title: 'Você tem certeza?',
      text: "Seu produto sera criado e ficara disponivel para compra",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, criar produto',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("http://localhost:3002/produtos", {
          titulo: event.target.titulo.value,
          ativo: prodCongelado.current.value,
          imagem: imgUrl,
          cardapio: event.target.cardapio.value,
          preco: Number((event.target.preco.value).replace(",", ".")).toFixed(2),
          itemsEquantidades: armazenaItemsEcolhidos
        })
          //.then((resposta) => resposta.json())
          .then((resposta) => {
            Swal.fire(
              'Sucesso!',
              'Seu produto foi criado, e está disponivel para compra na plataforma.',
              'success'
            )
            event.target.titulo.value = ''
            event.target.cardapio.value = ''
            event.target.preco.value = ''
            event.target.imagem.value = ''
            event.target.itens.value = ''
            event.target.qntItens.value = ''
            setArmazenaItemsEcolhidos([])
          })
          .catch(() => {
            Swal.fire(
              'Erro!',
              'Não foi possivel realizar a criação do produto, verifique se todos os campos foram preenchidos.',
              'error'
            )
            console.log()
          });
        
      }
    })

    
    // axios
    //   .post("http://localhost:3002/produtos", {
    //     titulo: event.target.titulo.value,
    //     // descricao: event.target.descricao.value,
    //     imagem: imgUrl,
    //     cardapio: event.target.cardapio.value,
    //     preco: Number((event.target.preco.value).replace(",", ".")).toFixed(2),
    //     itemsEquantidades: armazenaItemsEcolhidos
    //   })
    //   //.then((resposta) => resposta.json())
    //   .then((resposta) => console.log(resposta.data))
    //   .catch(() => console.log("Deu Errado"));

    // console.log({
    //     titulo: event.target.titulo.value,
    //     // descricao: event.target.descricao.value,
    //     imagem: imgUrl,
    //     cardapio: event.target.cardapio.value,
    //     preco: Number((event.target.preco.value).replace(",", ".")).toFixed(2),
    //     itemsEquantidades: armazenaItemsEcolhidos
    //   }
    // )
    
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3002/listaItensDosProdutos`)
      .then((response) => response.data)
      .then((resposta) => setItensParaSelecao(resposta));
  }, []);

  const excluiItemDoProduto = (i) => {
    const nomeItemExcluido = (armazenaItemsEcolhidos[i].nomeItem)
    
    const deixaSoItemsEscolhidos = armazenaItemsEcolhidos.filter((item, i) => item.nomeItem != nomeItemExcluido)

    setArmazenaItemsEcolhidos(deixaSoItemsEscolhidos)
  }

  

  useEffect(() => {
    console.log("Observa  exclusão mudou");
  }, [armazenaItemsEcolhidos]);

  console.log(progressaoUpload)

  return (
    <div className="divCadastraProduto">
      <div>
        <form  onSubmit={(event) => cadastrandoDadosProduto(event)}>
          <div className="tituloCadastraProdutos">Cadastre seu produto</div>
          <div className="cadastraProdutos">
            <div className="edicaoInputsoForm">
              <label htmlFor="titulo">Titulo</label>
              <br />
              <input required name="titulo"  />
            </div>
            <div className="edicaoInputsoForm">
              <label htmlFor="cardapio">Menu do Cardapio</label> <br />
              <select required name="cardapio" >
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
              <label htmlFor="preco">Preço </label> <br />
              <input required name="preco" placeholder="R$"/>
            </div>

            <div className="edicaoInputsoForm">
              <label htmlFor="ativo">Congelar pedido </label> <br />
              <select required name="ativo" ref={prodCongelado}>
                  <option value="">Selecione uma opção</option>
                  <option value={1}>Sim</option>
                  <option value={0}>Não</option>
                </select>
            </div>

            <div className="edicaoInputsoForm">
              <label htmlFor="imagem">Imagem</label> <br />
              <input required name="imagem" ref={imgEscolhidaFirebase} type="file" onChange={()=> handleUoloadImageFirebase(imgEscolhidaFirebase.current)} />
              <br />{!imgUrl && <progress value={progressaoUpload} max="100"/>}
            </div>
          </div>

          <div className="ingredientesEQuantidades">
            <div className="tituloCadastraProdutos">Ingredientes e Quantidades</div>
            <div className="edicaoInputsoFormTeste">
              <div className="selecionaOsItems">
                <label htmlFor="itens">Selecione os itens </label> <br />
                <select required name="itens" ref={itemDeMontagemProduto}>
                  <option value="">Selecione uma opção</option>
                  {itensParaSelecao.map((item, i) => {
                    return <option value={item.nomeItem}>{item.nomeItem}</option>;
                  })}
                  {/* <option value="lanches">Lanches</option>
                    <option value="saladas">Saladas</option>
                    <option value="bebidas">Bebidas</option>
                    <option value="sobremesas">Sobremesas</option>
                    <option value="doces">Doces</option> */}
                </select>
              </div>
              <div className="selecionaQntItems">
                
                <label htmlFor="itens">Quantidade do item </label>{" "} <br />
                <input required ref={qntItemDeMontagemProduto} type="" name="qntItens" />
                 
              </div>
              <div className="adicionaItemsEQuant">
                <button type="button" onClick={(event) => testezinhobb(event)}>Adicionar item</button>
              </div>
              
              <div className="tabelaItensEscolhidos">
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
                    {armazenaItemsEcolhidos.map((itemSelecionado, i) => {
                      return (
                        <tr>
                          <th>{i + 1}</th>
                          <td>{itemSelecionado.nomeItem}</td>
                          <td>{itemSelecionado.qntItem}</td>
                          <td>
                            <button
                              type="button"
                              className="inputDaQntPorItem"
                              onClick={() => excluiItemDoProduto(i)}
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
            <div className="edicaoInputSalvar">
              <button type="submit" /*onClick={() => console.log()}*/>Criar produto</button>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Cadastros;
