import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Anecdotes from './pages/Anecdotes';
import HomePage from './pages/HomePage';
import Counter from './pages/Counter';
import LeftRight from './pages/LeftRight';
import ListaCompra from './pages/ListaCompra';
import Part1 from './pages/Part1';
import Unicafe from './pages/Unicafe';

function App() {

  return (
    <BrowserRouter>
      <HomePage />

      <hr />
      <Suspense fallback={<div>Cargando proyecto...</div>}>
        <Routes>
          <Route path="/anecdotes" element={<Anecdotes />} />
          <Route path="/left-right" element={<LeftRight />} />
          <Route path="/lista-compra" element={<ListaCompra />} />
          <Route path="/part1" element={<Part1 />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/unicafe" element={<Unicafe />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;