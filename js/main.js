import './form.js';
import {renderPictures} from './preview-pictures.js';
import {showAlertLoad} from './util.js';

fetch ('https://25.javascript.pages.academy/kekstagram/data')
  .then((response)=>response.json())
  .then((photos)=> {
    renderPictures(photos);
  })
  .catch(() =>{
    showAlertLoad();
  });
