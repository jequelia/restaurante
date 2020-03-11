import React, { useState } from 'react';
import './App.css';
import BancoDeDados from './db/BancoDeDados';
import Pedido from './entidades/Pedido';
import StatusPedido from './entidades/StatusPedido';
import Cardapio from './componentes/Cardapio';
import CarrinhoDeCompras from './componentes/CarrinhoDeCompras';

function App() {
  const [pedidos, setPedidos] = useState([]);

  const pedir = (produto) => {
    // converte produto em pedido - define o status do pedido como 'na fila'
    let pedido = new Pedido(produto.nome, produto.valor, produto.tipo, produto.foto, StatusPedido.NA_FILA);
    setPedidos([...pedidos, pedido]);
  };

  const cancelarPedido = (indice) => {
    setPedidos([...pedidos.slice(0, indice), ...pedidos.slice(indice + 1)]);
  };

  // Gambiarra para simular o funcionamento do restaurante
  const progrideStatus = () => {
    let novosPedidos = [...pedidos];
    novosPedidos.forEach(p => {
      if (p.status == StatusPedido.NA_FILA) {
        p.status = StatusPedido.PREPARANDO;
      } else if (p.status == StatusPedido.PREPARANDO) {
        p.status = StatusPedido.SAIU_PARA_ENTREGA;
      } else if (p.status == StatusPedido.SAIU_PARA_ENTREGA) {
        p.status = StatusPedido.ENTREGUE;
      }  
    });
    setPedidos(novosPedidos);
  };  

  return (
    <>
      <button onClick={progrideStatus}>Progride o Status</button>
      <CarrinhoDeCompras pedidos={pedidos} onCancelar={cancelarPedido}/>
      <Cardapio produtos={BancoDeDados.getProdutos()} onPedir={pedir}/>
    </>
  );
}

export default App;
