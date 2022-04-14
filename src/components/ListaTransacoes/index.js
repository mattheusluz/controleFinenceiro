import './style.css';
import UserContext from '../../contexts/userContext';
import { useContext, useEffect } from 'react';
import lapis from '../../assets/lapis.svg';
import lixeira from '../../assets/lixeira.svg';
import { format } from 'date-fns';

function ListaTransacoes() {
  const { transacoes, setTransacoes, filtrando, filtrados, setFiltrados } = useContext(UserContext);

  const todasTransacoes = async () => {
    try {
      const resposta = await fetch('https://sistemacontrolefinanceiro.herokuapp.com/transacoes', {
        method: 'GET',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5NTEyNDAyfQ.vKMxjFCSoC3NEvQrJ4Pge6TQcIt-dtPBjgTRe5v-OLs`,
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

  // const editarTransacao = (transacao) => {
  //   handleModal();
  //   setEditar(true);
  //   setIdTransacao(transacao.id);
  //   todasTransacoes();
  //   setTransacaoEditada(transacao);
  // }

  return (
    <table className='table'>
      <th className='table-head'>
        <div id='date' className='column-title date'>
          <span>Data</span>
        </div>
        <div id='week-day' className='column-title day'>
          <span>Dia da Semana</span>
        </div>
        <div className='column-title'>
          <span>Categoria</span>
        </div>
        <div className='column-title description'>
          <span>Descrição</span>
        </div>
        <div id='value' className='column-title value'>
          <span>Valor</span>
        </div>
        <div id='editDelete' className='editDelete'>
          .
        </div>
      </th>
      {(filtrando ? filtrados : transacoes && transacoes).map((transacao) => (
        <tbody className='table-body' key={transacao.id} >
          <tr className='table-line'>
            <td className='date line-items'>
              <span>{format(new Date(transacao.data), 'dd/MM/yyy')}</span>
            </td>
            <td className='day line-items'>
            <span className='day'>{transacao.dia_semana}</span>
            </td>
            <td className='line-items category'>
            <span>{transacao.categoria}</span>
            </td>
            <td className='line-items description'>
            <span>{transacao.descricao}</span>
            </td>
            <td
              className='line-items'
              style={{ color: transacao.tipo ? '#7B61FF' : '#FA8C10' }}
            >
              <span>{!transacao.tipo && '-'} R$ {transacao.valor / 100}</span>
            </td>
            <td className='editDele'>
              <img src={lapis} alt="Editar" className='edit-icon'/*  onClick={() => editarTransacao(transacao)} */ />
              <img src={lixeira}
                alt="Deletar"
                className='delete-icon'
              // onClick={() => {
                //   handlePopUp()
              //   setIdTransacao(transacao.id)
              // }}
              />
            </td>
          {/* <ConfirmarEscolha /> */}
          </tr>
        </tbody>
      ))}
    </table>
  )
}

export default ListaTransacoes;