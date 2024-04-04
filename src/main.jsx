import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Home from './components/Home.jsx';
import Customerlist from './components/Customerlist.jsx';
import Traininglist from './components/Trainginlist.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:
      [
        {
          element: <Home />,
          index: true
        },
        {
          path: "customerlist",
          element: <Customerlist />
        },
        {
          path: "traininglist",
          element: <Traininglist />
        }

      ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
