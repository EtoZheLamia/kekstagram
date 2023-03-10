const getData = (onSuccess, onFail) => {
  fetch ('https://25.javascript.pages.academy/kekstagram/data')
    .then((response)=>response.json())
    .then((photos)=> {
      onSuccess(photos);
    })
    .catch(() =>{
      onFail();
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
