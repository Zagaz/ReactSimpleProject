import {
    createRoot} from 'react-dom/client';
   
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App';

createRoot(document.querySelector('#root')).render( < App / > );