import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppProvider } from '@/provider/AppProvider';

// Import de Layout y HomePage estático
import Layout from './Layout';
import HomePage from './pages/HomePage';

// Import del resto de páginas lazy
const Anecdotes = lazy(() => import('./pages/Anecdotes'));
const Counter = lazy(() => import('./pages/Counter'));
const LeftRight = lazy(() => import('./pages/LeftRight'));
const ListaCompra = lazy(() => import('./pages/ListaCompra'));
const ToDoListAPIContext = lazy(() => import('./pages/ToDoListAPIContext'));
const Part1 = lazy(() => import('./pages/Part1'));
const Unicafe = lazy(() => import('./pages/Unicafe'));
const MapaGoogle = lazy(() => import('./pages/MapaGoogle'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando proyecto...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <AppProvider>
                <Layout />
              </AppProvider>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/anecdotes" element={<Anecdotes />} />
            <Route path="/left-right" element={<LeftRight />} />
            <Route path="/lista-compra" element={<ListaCompra />} />
            <Route path="/lista-compra/:id" element={<ListaCompra />} />
            <Route path="/lista-compra/:id/edit" element={<ListaCompra isEditing={true} />} />
            <Route path="/to-do-list-API" element={<ToDoListAPIContext />} />
            <Route path="/to-do-list-API/:id" element={<ToDoListAPIContext />} />
            <Route path="/to-do-list-API/:id/edit" element={<ToDoListAPIContext isEditing={true} />} />
            <Route path="/part1" element={<Part1 />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/unicafe" element={<Unicafe />} />
            <Route path="/mapa-google" element={<MapaGoogle />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
