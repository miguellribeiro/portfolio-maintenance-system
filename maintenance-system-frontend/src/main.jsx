import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import './styles/app.css'
import './styles/global.css'
import './assets/icons/css/all.min.css'
import { AuthProvider, ModalProvider, ToastProvider, LoaderProvider } from './contexts';
import { BrowserRouter } from 'react-router-dom';
import { GlobalLoader } from './components/common/Loader/GlobalLoader.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <ToastProvider>
            <LoaderProvider>
              <GlobalLoader />
              <App />
            </LoaderProvider>
          </ToastProvider>
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
