import DOMNodeCollection from './dom_node_collection.js';

const $m = selector => {
  if(typeof selector === 'string'){
    const nodeList = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(nodeList));
  } else if (selector instanceof HTMLElement){
    return new DOMNodeCollection([selector]);
  } else if (typeof selector === 'function'){
    document.addEventListener('DOMContentLoaded', selector);
    return new DOMNodeCollection(document);
  }
};

window.$m = $m;

$m.ajaxCore = function(){
  return {
    type: 'GET',
    url: window.location.href,
    data: {},
    success(data){
      return data;
    },
    fail(data){
      return data;
    }
  };
};

$m.extend = function(...JSObjects){
  const extendObj = {};
  JSObjects.forEach( object => {
    for(let key in object){
      extendObj[key] = object[key];
    }
  });
  return extendObj;
};

$m.ajax = function(options){
  return new Promise((resolve, reject) => {
    const ajaxParams = $m.extend($m.ajaxCore(), options);
    const xhr = new XMLHttpRequest();

    xhr.open(ajaxParams.type, ajaxParams.url);
    xhr.onload = function(){
      if(xhr.status === 200){
        return resolve(JSON.parse(xhr.response));
      } else {
        return reject(JSON.parse(xhr.response));
      }
    };
    xhr.send(ajaxParams.data);
  });
};
