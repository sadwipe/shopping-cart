import { Outlet } from 'react-router';

import './styles/App.scss';

import Header from './components/Header/Header';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
