(function(){
  window.addEventListener("load",init);
  
  var model={}; // the game model
  var view={}; // the dom.
  
  function setAttr(el, init)
  {
    for(var all in init)
    {
      el.setAttributeNS("http://www.w3.org/2000/svg",all, init[all]);
    }
  }
  function create(tag, init)
  {
    var el=document.createElementNS("http://www.w3.org/2000/svg", tag);
    setAttr(el, init);
    return el; 
  }
  function init()
  {
     // create elements we are going to use..
     view.svg=create("svg");
     setAttr(view.svg,{width:500,height:500,viewBox:"0 0 500 500"});
     document.body.appendChild(view.svg);
  }
})();
