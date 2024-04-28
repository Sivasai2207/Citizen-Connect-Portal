import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { AuthProvider } from './context/AuthContext';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Suspense>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Suspense>
  </BrowserRouter>
);
