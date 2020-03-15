(function(){
  window.addEventListener("load",init);
  
  var model={}; // the game model
  var view={}; // the dom.
  
  function setAttr(el, init)
  {
    for(var all in init)
    {
//      el.setAttributeNS("http://www.w3.org/2000/svg",all, init[all]);
      el.setAttribute(all, init[all]);
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
     setAttr(view.svg,{width:"100%",height:"100%",viewBox:"0 0 500 500",preserveAspectRatio:"xMidYMid meet"});
     document.body.appendChild(view.svg);
   view.walls=create("rect",{x:0,y:0,width:500,height:500,fill:"#eee"})
     view.svg.appendChild(view.walls);
   view.hero=create("circle",{cx:15,cy:15,r:15,fill:"#f00"})
     view.svg.appendChild(view.hero);
  }
})();
