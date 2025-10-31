import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

//Importación proyectos 
const Anecdotes = React.lazy(() => import('@proyectos/anecdotes'));
const LeftRight = React.lazy(() => import('@proyectos/left-right'));
const ListaCompra = React.lazy(() => import('@proyectos/lista-compra'));
const Part1 = React.lazy(() => import('@proyectos/part1'));
const Part1Counter = React.lazy(() => import('@proyectos/part1-counter'));
const Unicafe = React.lazy(() => import('@proyectos/unicafe'));

//Componente principal con el Layout y las Rutas ---
function App() {
  const padding = {
    padding: 5
  };

  return (
    <BrowserRouter>
      {/* --- 3. La Navegación Principal --- */}
      <div>
        <h1>Mis Proyectos de React</h1>
        <nav>
          <Link style={padding} to="/anecdotes">Anecdotes</Link>
          <Link style={padding} to="/left-right">Left-Right</Link>
          <Link style={padding} to="/lista-compra">Lista Compra</Link>
          <Link style={padding} to="/part1">Part 1</Link>
          <Link style={padding} to="/part1-counter">Counter</Link>
          <Link style={padding} to="/unicafe">Unicafe</Link>
        </nav>
      </div>

      <hr />
      <Suspense fallback={<div>Cargando proyecto...</div>}>
        <Routes>
          <Route path="/anecdotes" element={<Anecdotes />} />
          <Route path="/left-right" element={<LeftRight />} />
          <Route path="/lista-compra" element={<ListaCompra />} />
          <Route path="/part1" element={<Part1 />} />
          <Route path="/part1-counter" element={<Part1Counter />} />
          <Route path="/unicafe" element={<Unicafe />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;