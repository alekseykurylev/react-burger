import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import './index.scss'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter as Router } from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);