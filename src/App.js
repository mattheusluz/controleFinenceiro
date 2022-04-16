import { useEffect, useState } from 'react';
import './App.css';
import UserContext from './contexts/userContext';
import './globalStyles/styles.css';
import Rotas from './roteador/Rotas';

function App() {
  const [hidden, setHidden] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [transacoes, setTransacoes] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [filtrando, setFiltrando] = useState(false);
  const [editar, setEditar] = useState(false);
  const [transacaoEditada, setTransacaoEditada] = useState(null);
  const [idTransacao, setIdTransacao] = useState();
  const [popup, setPopup] = useState(false);
  const [token, setToken] = useState(false);
  const [excluir, setExcluir] = useState(false);

  const todasTransacoes = async () => {
    try {
      const resposta = await fetch('https://sistemacontrolefinanceiro.herokuapp.com/transacoes', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await resposta.json();
      setTransacoes(data);
      setFiltrados(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    todasTransacoes();
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{
        todasTransacoes,
        transacoes,
        setTransacoes,
        filtrando,
        setFiltrando,
        filtrados,
        setFiltrados,
        hidden,
        setHidden,
        openModal,
        setOpenModal,
        popup,
        setPopup,
        editar,
        setEditar,
        transacaoEditada,
        setTransacaoEditada,
        idTransacao,
        setIdTransacao,
        token,
        setToken,
        excluir,
        setExcluir,
      }}>
        <Rotas />
      </UserContext.Provider>
    </div>
  );
}

export default App;
