import App from './App';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Checkout from './pages/Checkout/Checkout';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ],
  },
];

export default routes;
