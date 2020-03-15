  function heroBehaviour(o)
  {
    var cursor={};
    cursor.x=-150+300*(control.cursor.x*1.2-0.1);
    cursor.y=300*(control.cursor.y*1.2-0.1);
    var wallx=150;
    var wally=200;
    if(cursor.x<(-wallx+20)) cursor.x=-wallx+15;
    if(cursor.x>(wallx-20)) cursor.x=wallx-20;
    if(cursor.y<20) cursor.y=20;
    if(cursor.y>(wally-20)) cursor.y=wally-20;
    setAttr(view.cursor,{cx:cursor.x,cy:cursor.y});
    
    // now get attracted by the cursor!
    var dx=cursor.x-o.x;
    var dy=cursor.y-o.y;
    var len=Math.sqrt(dx*dx+dy*dy);
    var len2=len*len;
    if(len<50 && len>3)
    {
      o.dx+=20*dx/len2;
      o.dy+=20*dy/len2;
      o.x=o.x*0.1+0.9*cursor.x;
      o.y=o.y*0.1+0.9*cursor.y;
    }
    if(len<40){
      o.x=o.x*0.2+0.8*cursor.x;
      o.y=o.y*0.2+0.8*cursor.y;
    }

    playerHitBall(o);
  }
