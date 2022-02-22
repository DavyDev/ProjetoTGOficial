import './styles.css'
import SearchHeader from '../../../../assets/images/SearchHeader/SearchHeader.png'

function Search() {
  return (
    <div id="divBusca">
      <img src={SearchHeader} alt="Buscar..."/>
      <input className="SearchInputHeader" type="search"  placeholder="Busque por um item"/>
    </div>
  );
};
export default Search;
