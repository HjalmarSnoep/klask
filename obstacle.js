  function obstacleBehaviour(o)
  {
    o.dx*=0.95;
    o.dy*=0.95;
    
    attractToObject(o,model.hero);
    attractToObject(o,model.ai);
  }
  function attractToObject(o,a)
  {
    // check if too close to hero or ai.
    var dx=a.x-o.x;
    var dy=a.y-o.y;
    var len=Math.sqrt(dx*dx+dy*dy);
    if(len<50)
    {
      var len2=len*len;
      // get some attraction;
      o.dx+=10*dx/len2;
      o.dy+=10*dy/len2;
    }
    
  }
