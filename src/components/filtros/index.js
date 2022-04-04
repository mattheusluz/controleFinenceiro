import { useEffect, useState } from 'react';

export default function Filtros({ setFiltrando, transacoes, setFiltrados, hidden }) {
  const [categorias, setCategorias] = useState([]);
  const [max, setMax] = useState();
  const [min, setMin] = useState();

  const limparFiltros = () => {
    setMax('');
    setMin('');
    setFiltrando(false);
    setFiltrados(transacoes);
  }

  const arrayCategorias = [];

  const aplicarFiltros = () => {
    const arrayFiltrado = transacoes.filter(item => {
      return (item.value / 100) >= min && (item.value / 100) <= max;
    })
    setFiltrados(arrayFiltrado);
    setFiltrando(true);
  }

  useEffect(() => {
    transacoes.map(item => {
      if (!arrayCategorias.includes(item.category)) {
        arrayCategorias.push(item.category);
      }
    });
    setCategorias(arrayCategorias);
  }, [transacoes]);

  const arrayDias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  return (
    <div className='container-filters' style={{ display: hidden && 'none' }}>
      <div className="filtro-diasemana">
        <h3 className=' filtro-titulo'>Dia da semana</h3>
        <ul className='lista-filtro'>
          {arrayDias.map((dia, id) => (
            <li className='container-chip font-normal' key={id}>
              <span>{dia}</span> <span>+</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="filtro-categoria">
        <h3 className=' filtro-titulo'>
          Categoria
        </h3>
        <ul className='lista-filtro'>
          {categorias.map(categoria => (
            <li className='container-chip font-normal' key={categoria}>
              <span>{categoria}</span> <span>+</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="filtro-valor">
        <h3 className="filtro-titulo">
          Valor
        </h3>
        <form action="">
          <div className="min">
            <label htmlFor="min-value">Min</label>
            <input type="number" id='min-value' onChange={(e) => setMin(e.target.value)} value={min} />
          </div>
          <div className="max">
            <label htmlFor="max-value">Max</label>
            <input type="number" id='max-value' onChange={(e) => setMax(e.target.value)} value={max} />
          </div>
        </form>
      </div>
      <div className="btns-filtro">
        <span className="btn-clear-filters" onClick={limparFiltros}>
          Limpar Filtros
        </span>
        <span className="btn-apply-filters" onClick={aplicarFiltros}>
          Aplicar Filtros
        </span>
      </div>
    </div>
  )
}