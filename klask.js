  window.addEventListener("load",init);
  
  var model={}; // the game model
  var view={}; // the dom.
  var control={cursor:{x:0,y:0}}; // the pointer.
  
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
  function createInstance(parent, id)
  {
    var el=document.createElementNS("http://www.w3.org/2000/svg", "use");
    el.setAttributeNS('http://www.w3.org/1999/xlink', "href","#"+id);
    parent.appendChild(el);
    return el;
  }
  function init()
  {
     // create elements we are going to use..
     view.svg=create("svg");
     setAttr(view.svg,{width:"100%",height:"100%",viewBox:"0 0 320 420",preserveAspectRatio:"xMidYMid meet"});
     document.body.appendChild(view.svg);
     view.lib=create("defs");
     view.svg.appendChild(view.lib);
     // create a mask for the back.
     view.mask=create("mask", {id: "mask-field"});
     var rect=create("rect", {x:10,y:10,width:300,height:400,fill:"#fff"});
     view.mask.appendChild(rect);
     view.lib.appendChild(view.mask);
     view.corner=create("circle", {id: "corner",cx:"0",cy:"0",r:"50",stroke:"#fff",fill: "none","stroke-width":"3"});
     view.lib.appendChild(view.corner);
     view.goal=create("circle", {id: "goal",cx:"0",cy:"0",r:"18",stroke:"#eda",fill: "#28e","stroke-width":"1.5"});
     view.lib.appendChild(view.goal);
     view.obstacledock=create("circle", {id: "obstdock",cx:"0",cy:"0",r:"4",stroke:"#fff",fill: "none","stroke-width":"0.5"});
     view.lib.appendChild(view.obstacledock);
     view.obstacle=create("circle", {id: "obstacle",cx:"0",cy:"0",r:"6",fill: "#fff"});
     view.lib.appendChild(view.obstacle);

     view.background=create("g",{id:"background"});
     
     view.walls=create("rect", {x:0,y:0,width:320,height:420,fill:"#eda"});
     
     view.background.appendChild(view.walls);
     
     view.field=create("rect", {id:"field",x:10,y:10,width:300,height:400,fill:"#24a"});
     view.background.appendChild(view.field);
     
     var g=create("g",{"mask":"url(#mask-field)"});
     view.corners=[{x:10,y:10},{x:310,y:10},{x:10,y:410},{x:310,y:410}];
     for(var i=0;i<view.corners.length;i++)
     {
       view.corners[i].dom=createInstance(g,"corner");
       setAttr(view.corners[i].dom,{x:view.corners[i].x,y:view.corners[i].y});
     }
     view.background.appendChild(g);
     for(i=0;i<3;i++)
     {
       var dock=createInstance(view.background,"obstdock");
       setAttr(dock,{x:10+75*(i+1),y:210});
     }
     
     view.svg.appendChild(view.background);
     
     view.game=create("g",{transform:"translate(160,210)"});
     view.svg.appendChild(view.game);

     view.goals=[];
     view.goals[0]=createInstance(view.game,"goal");
     setAttr(view.goals[0],{x:0,y:165});
     view.goals[1]=createInstance(view.game,"goal");
     setAttr(view.goals[1],{x:0,y:-165});

     for(i=0;i<3;i++)
     {
       view["obstacle"+i]=createInstance(view.game,"obstacle");
       setAttr(view["obstacle"+i],{x:-150+75*(i+1),y:0});
       model["obstacle"+i]={x:-150+75*(i+1),y:0,r:8,dx:0,dy:0,dynamic:true,collide:["obstacle1","obstacle2","obstacle0"]};
     }

     
     model.goals=[];
     model.goals[0]={x:0,y:165,r:18};
     model.goals[1]={x:0,y:-165,r:18};
     
     // ball
     view.ball=create("circle",{cx:-132,cy:-182,r:10,fill:"#fa0"})
     view.game.appendChild(view.ball);

     view.cursor=create("circle",{cx:0,cy:100,r:15,fill:"rgba(0,0,0,0.2)",stroke:"rgba(255,255,255,0.3)"})
     view.game.appendChild(view.cursor);

     // hero
     view.hero=create("circle",{cx:0,cy:100,r:13,fill:"#000"})
     view.game.appendChild(view.hero);

     // ai
     view.ai=create("circle",{cx:0,cy:-100,r:13,fill:"#000"})
     view.game.appendChild(view.ai);
     
     // also create the model accordingly.
     model.ball={x:-132,y:-182,r:10,dx:1,dy:1,dynamic:true,collide:["obstacle1","obstacle2","obstacle0"]};
     model.hero={x:-0,y:100,r:13,dx:0,dy:0,dynamic:true,collide:["obstacle1","obstacle2","obstacle0"]};
     model.ai={x:-0,y:-100,r:13,dx:1,dy:1,dynamic:true,collide:["obstacle1","obstacle2","obstacle0"]};
     
     // set up the listener for the mouse.
     document.body.addEventListener("pointermove",function(ev){control.cursor.x=ev.clientX/window.innerWidth; control.cursor.y=ev.clientY/window.innerHeight;});
     animate();
  }
  function stepModel()
  {
    var wallx=150;
    var wally=200;
    for(var all in model)
    {
      var o=model[all];
      if(typeof(o.dynamic)!="undefined")
      {
        o.x+=o.dx;
        o.y+=o.dy;
        if(o.x<(-wallx+o.r)) o.dx=Math.abs(o.dx);
        if(o.x>(wallx-o.r)) o.dx=-Math.abs(o.dx);
        if(o.y<(-wally+o.r)) o.dy=Math.abs(o.dy);
        if(o.y>(wally-o.r)) o.dy=-Math.abs(o.dy);
        switch(all)
        {
          case "hero":
            heroBehaviour(o);
          break;
          case "ai":
            aiBehaviour(o);
          break;
          case "ball":
            ballBehaviour(o);
          break;
          case "obstacle0":
          case "obstacle1":
          case "obstacle2":
            obstacleBehaviour(o);
          break;
        }
        // update the view.
        setAttr(view[all],{cx:o.x,cy:o.y,x:o.x,y:o.y});
      }
      // check ALL collisions for object with collision on.
      if(typeof(model[all].collide)!="undefined")
      {
        for(var i=0;i<model[all].collide.length;i++)
        {
          if(all!=model[all].collide[i])
          {
            doCollision(model[all],model[model[all].collide[i]]);
          }
        }
      }
    }
  }
  function doCollision(a,b)
  {
    var dx=a.x-b.x;
    var dy=a.y-b.y;
    var len=Math.sqrt(dx*dx+dy*dy);
    var mindist=a.r+b.r;
    if(len!=0)
    {
      if(len<mindist)
      {
        var f1=b.r/mindist;
        var f2=a.r/mindist;
        if(f1<f2) f2*=5;
        if(f2<f1) f1*=5;
        a.dx+=f1*dx/len;
        a.dy+=f1*dy/len;
        b.dx-=f2*dx/len;
        b.dy-=f2*dy/len;
      }
    }
  }
  function animate()
  {
      stepModel();
      window.requestAnimationFrame(animate);
  }
