'use strict';

  var allForms = document.querySelectorAll('form');
  var fIndex;
  for (fIndex =0; fIndex < allForms.length; fIndex++ ){
      ajaxify(allForms[fIndex],onResponse);
  }

  function addListenerToCurrentForm(form,input){
    var formMethod = form.method;
    var formAction = form.getAttribute('action');
    form.addEventListener(formMethod, function (e)
       {e.preventDefault();
        sendRequest(formMethod, formAction, onResponse, input);});
        //sendRequest(formMethod, formAction, onResponse, input.name +' ' +input.value);});
      }


function serializeCurrFormInputs(form){
    var allInputs = form.getElementsByTagName('input');
    var i;
    var userData ='';
    for (i = 0; i < allInputs.length; ++i){
      userData += allInputs[i].name + ' ' + allInputs[i].value + ' ';
    }
    if (userData !== ''){
    userData = userData.replace(/^\s+|\s+$/g,'');
    }
    return userData;
  }


function ajaxify (form,callback){
          var returnedData ='';
          var formInputs = serializeCurrFormInputs(form);
          if (formInputs!== ''){
          addListenerToCurrentForm(form,formInputs);
          returnedData += ' ' + callback;
          console.log(returnedData);
        }
}
// Ajax
// sendRequest('GET', 'http://localhost:9001/status', onResponse);
// sendRequest('POST', 'http://localhost:9001/echo', onResponse, 'message=hi');


function sendRequest (method, url, callback, data) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', callback);
  xhr.open(method, url);
  xhr.send(data);
}

function onResponse (e) {
    console.log('Server responded with: ' + e.target.responseText);
}
