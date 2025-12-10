import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { store, persistor } from './RTK/store'
import { PersistGate } from 'redux-persist/integration/react'
import 'antd/dist/reset.css';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>
)
