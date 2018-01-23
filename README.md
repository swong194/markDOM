# markDOM

markDOM is a Javascript library used to simplify client scripting of HTML. A todo-app was built using markDOM to highlight it's ability in manipulating the DOM.

<a target="_blank" href='http://sunnygwong.com/Todo-with-markDOM/'>Todo app demo</a>

markDOM has many features to manipulate HTML. Methods include adding/removing event listeners,

``` javascript

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

```

adding/removing class

``` javascript

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

```

DOM traversal

``` javascript
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

```
# markDOM api

$m(arg)
- takes in a string, HTML element, or function and returns a DOMNodeCollection object

.html()
- gets or sets the innerHTML of the DOMNodeCollection

.val()
- gets or sets the value of first element of the DOMNodeCollection

.empty()
- sets the innerHTML of each DOMNodeCollection to empty

.append()
- inserts content to the end of each element in the DOMNodeCollection

.attr(attrName, attrVal)
- gets or sets attribute of the first element of the DOMNodeCollection

.addClass()
- adds class to each element of the DOMNodeCollection

.removeClass()
- removes class from each element of the DOMNodeCollection

.children()
- gets the unique children of each element of the DOMNodeCollection

.parent()
- gets the unique parent of each element of the DOMNodeCollection

.find()
- finds the unique children specified by the parameter of each element of the DOMNodeCollection

.remove()
- removes each element of the DOMNodeCollection from the DOM

.on(eventType, callback)
- adds event listener

.off(eventType)
- removes event listener

$m.ajax()
- performs an ajax call, and returns a promise
