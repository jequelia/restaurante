import React, { useState } from 'react';
import './App.css';
import BancoDeDados from './db/BancoDeDados';

function App() {
  const [pedidos, setPedidos] = useState([]);

  const pedir = (produto) => {
    setPedidos([...pedidos, produto]);
  };

  const calculaTotal = () => {
    let total = 0.0;
    pedidos.forEach(p => total += p.valor);
    return total;
  };

  const renderProduto = (produto) => {
    return (
      <tr>
        <td><img src={produto.foto}/></td>
        <td>{produto.nome}</td>
        <td>{produto.tipo}</td>
        <td>R$ {produto.valor.toFixed(2)}</td>
        <td><a href="#" class="myButton" onClick={() => pedir(produto)}>Pedir</a></td>
      </tr>
    );
  };

  return (
    <div className="table-cardapio">
      <div className="header">Cardápio - 💰 R$ {calculaTotal().toFixed(2)}</div>
      <table cellspacing="0">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Preço</th>
            <th>Pedir</th>
          </tr>
        </thead>
        <tbody>
          {BancoDeDados.getProdutos().map(renderProduto)}
        </tbody>
      </table>
    </div>
  );
}

export default App;
