import '../css/style.css';
import '../css/normalize.css';
import 'nouislider/dist/nouislider.css';
import '../index.html';
import './assets.js';

import {setUserFormSubmit} from './load-picture.js';
import {getData, sendData} from './api.js';
import {showAlertLoad} from './util.js';
import {renderPictures} from './preview-pictures.js';
import {turnFilterOn, filterPictures, setOnFilterClick} from './images-filter.js';
import {showSuccessAlert, showFailAlert} from './messages.js';

const onGetDataSuccess = (data) => {
  turnFilterOn(data);
  renderPictures(filterPictures());
  setOnFilterClick(renderPictures);
};

setUserFormSubmit(async (data) => {
  await sendData(showSuccessAlert, showFailAlert, data);
});

getData(onGetDataSuccess, showAlertLoad);
