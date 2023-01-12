import {showAlertLoad} from './util.js';
import {renderPictures} from './preview-pictures.js';

const getData = () => {
  fetch ('https://25.javascript.pages.academy/kekstagram/data')
    .then((response)=>response.json())
    .then((photos)=> {
      renderPictures(photos);
    })
    .catch(() =>{
      showAlertLoad();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
