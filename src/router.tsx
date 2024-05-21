import { createBrowserRouter } from 'react-router-dom';
import { Wrapper } from './components';
import { EarnPage, HomePage, InvestPage, TaxSavingPage } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'invest',
        element: <InvestPage />,
      },
      {
        path: 'tax-saving',
        element: <TaxSavingPage />,
      },
      {
        path: 'earn',
        element: <EarnPage />,
      },
    ],
  },
]);
