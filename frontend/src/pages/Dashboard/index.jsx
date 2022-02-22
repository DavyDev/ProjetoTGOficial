import './style.css';



import { Route, Switch } from 'react-router';
import DashCadastraPedidos from '../../components/DashCadastra_Produtos';
import DashConsultaPedidos from '../../components/DashConsulta_Pedidos';
import DashConsultaEstoque from '../../components/DashConsulta_Estoque';
import DashConsultaSujestoes from '../../components/DashConsulta_Sujestoes';

function Dashboard() {
  return (
    <div>
      
      <Switch>
        <Route path='/dashboard' exact component={DashCadastraPedidos} />
        <Route path='/dashboard/consultarPedidos' exact component={DashConsultaPedidos} />
        <Route path='/dashboard/consultarEstoque' exact component={DashConsultaEstoque} />
        <Route path='/dashboard/consultarSujestoes' exact component={DashConsultaSujestoes} />
      </Switch>
      
    </div>
  );
}

export default Dashboard;
