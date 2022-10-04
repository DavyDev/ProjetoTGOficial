import './styles.css'
import SearchHeader from '../../../../assets/images/SearchHeader/SearchHeader.png'
import { useEffect, useState } from 'react';
import axios from 'axios'

function Search() {
  const [listIsOpen, setListIsOpen] = useState(false)
  const classeAbreLista = listIsOpen ? "listCanBeOpen" : "listCantBeOpen"

  const [busca, setBusca] = useState('')
  const [carregaPedidosParaBusca, setCarregaPedidosParaBusca] = useState([{titulo: ""}])
  

  useEffect(() => {
    axios.get(`http://localhost:3002/produtos`)
        .then(response => response.data)
        .then(resposta => setCarregaPedidosParaBusca(resposta))

  }, [])

  const filtragemProdutosPesquisados = carregaPedidosParaBusca.filter((pedidoPesquisado) => {
    if(pedidoPesquisado.titulo.toLowerCase().includes(busca.toLowerCase()) || pedidoPesquisado.descricao.toLowerCase().includes(busca.toLowerCase())){
      return pedidoPesquisado
    }
    
  })
  console.log(filtragemProdutosPesquisados)
  // const selecionouOptionDeBusca = async (event) => {
  //   console.log("Selecionou")
  //   console.log(event.target.value)
  //   const papum = carregaPedidosParaBusca.filter((value) => {
  //     if(value.titulo == "Monumento "){
  //       console.log(value.id)
  //       return value}
  //   })

  //  console.log(papum)

  // }

  const levaAoProduto = (idprodutoSelecionado) => {
    let positionElement = document.getElementById(idprodutoSelecionado).getBoundingClientRect().y
    positionElement = (positionElement - 150)
    
    document.documentElement.scrollBy(0 , positionElement)
  
  
    console.log(idprodutoSelecionado)

  }

  useEffect(() => {
    if(busca != '' && listIsOpen == false){
      console.log(listIsOpen)
      setListIsOpen(!listIsOpen)
    }
    else if(busca == '' && listIsOpen == true){
      console.log(listIsOpen)
      setListIsOpen(!listIsOpen)
    }
  }, [busca])

  return (
    <div>

      <div id="divBusca">
        <img src={SearchHeader} alt="Buscar..."/>

        <input value={busca} className="SearchInputHeader" onChange={(event) => setBusca(event.target.value)} type="search"  placeholder="Busque por um item" list='pesquisasCardapio'/>

        {/* <datalist id='pesquisasCardapio'>
          <option value="Teste"></option>
          <option value="Udemy"></option>
          <option value="Ucaca"></option>
          <option value="Terere"></option> */}
          {/* {carregaPedidosParaBusca.map((itemDoMenu) => {
            return(<option value={itemDoMenu.titulo} >{itemDoMenu.descricao}</option>)
          
          })} */}
        {/* </datalist> */}

      </div>
      <div className={`listDasBuscas ${classeAbreLista}`}>
      {filtragemProdutosPesquisados.length == 0 ? 
        <div className='nenhumResultadoEncontrado'>Nenhum resultatdo encontrados...</div> : 
        filtragemProdutosPesquisados.map((itemDoMenu) => {
          return(
            // <div>Não teve resultados</div>
            <ul className='listaTodosProcurados' >
              <li onClick={() => levaAoProduto(`ProdId_${itemDoMenu.id}`)}>
                <h4>{itemDoMenu.titulo}</h4>
                <p>{itemDoMenu.descricao}</p>
                
              </li>
            </ul>
          )
        })
      }
      </div>
    </div>
  );
};
export default Search;
