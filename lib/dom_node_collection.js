class DOMNodeCollection {
  constructor(nodeListArray){
    this.nodeListArray = nodeListArray;
  }

  _eachElement(callback){
    this.nodeListArray.forEach( (el) => {
      callback(el);
    });
  }

  html(parameter){
    if(typeof parameter === 'string' || typeof parameter === 'number' ){
      this._eachElement(el => { el.innerHTML = parameter ;});
      return this;
    } else {
      return this.nodeListArray[0].innerHTML;
    }
  }

  val(parameter){
    if(typeof parameter === 'string'){
      this.nodeListArray[0].value = parameter;
    }
    return this.nodeListArray[0].value;
  }

  empty(){
    return this.html('');
  }

  append(elementToAppend){
    if(elementToAppend instanceof DOMNodeCollection){
      let outerHTMLList = '';
      elementToAppend.forEach(htmlEl => {
        outerHTMLList += htmlEl.outerHTML;
      });
      this._eachElement(el => {el.innerHTML += outerHTMLList;});
      elementToAppend.remove();
    } else if (typeof elementToAppend === 'string'){
      this._eachElement(el => {el.innerHTML += elementToAppend;});
    } else {
      this._eachElement(el => {el.innerHTML += elementToAppend.outerHTML;});
    }
    return this;
  }

  attr(attrName, attrValue){
    if(attrValue === undefined){
      return this.nodeListArray[0].getAttribute(attrName);
    } else {
      return this.nodeListArray[0].setAttribute(attrName, attrValue);
    }
  }

  addClass(className){
    this._eachElement( el => {
      el.classList.add(className);
    });
    return this;
  }

  removeClass(className){
    this._eachElement( el => {
      el.classList.remove(className);
    });
    return this;
  }

  children(){
    let childArray = [];
    this._eachElement( parentNode => {
      Array.from(parentNode.children).forEach(child => {
        if(!childArray.includes(child)){
          childArray.push(child);
        }
      });
    });
    return new DOMNodeCollection(childArray);
  }

  parent(){
    let parentArray = [];
    this._eachElement(childNode => {
      if(!parentArray.includes(childNode.parentNode)){
        parentArray.push(childNode.parentNode);
      }
    });
    return new DOMNodeCollection(parentArray);
  }

  find(selector){
    let findArray = [];
    this._eachElement( el => {
      Array.from(el.querySelectorAll(selector)).forEach(
        queryEl => {
        if(!findArray.includes(queryEl)){
          findArray.push(queryEl);
        }});
    });
    return new DOMNodeCollection(findArray);
  }

  remove(){
    this._eachElement(el => {el.remove();});
    return this;
  }

  on(eventType, callback){
    this._eachElement(el => {
      el.addEventListener(eventType, callback);
      el[eventType] = callback;
    });
    return this;
  }

  off(eventType){
    this._eachElement(el => {
      el.removeEventListener(eventType, el[eventType]);
    });
    return this;
  }

}


export default DOMNodeCollection;
