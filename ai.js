  function aiBehaviour(o)
  {
    if(o.y>o.r) o.dy=-Math.abs(o.dy)*0.6;
    // simplest, just go for the ball.
    
    
    var now=(new Date()).getTime();
    var b=model.ball;
    var gd=model.goals[0];// goal to defend
    var ga=model.goals[1];// goal to attack.


    var dx=b.x-o.x;
    var dy=b.y-o.y;
    var distance_to_ball=Math.sqrt(dx*dx+dy*dy);
    
    var tx=b.x;
    var ty=b.y-50;
    if(distance_to_ball<50)
    {
      dx=b.x-ga.x;
      dy=b.y-ga.y;
      var len=Math.sqrt(dx*dx+dy*dy);
      
      // aim for the others goal.
      tx=b.x-(b.r+o.r)*dx/len;
      ty=b.y-(b.r+o.r)*dy/len;
    }
    if(b.y>0)
    {
      // ball is on other players side, take up defensive posture.
      tx=b.x/5+40*Math.cos(now/300);
      ty=-100+40*Math.sin(now/600);
    }

/*    // try to stay away from the goal that you defend.
    dx=o.x-gd.x;
    dy=o.y-gd.y;
    len=Math.sqrt(dx*dx+dy*dy);
    var safe_dist=(gd.r+o.r)*4;
    console.log(Math.floor(len)+"/"+safe_dist);
    if(len<safe_dist)
    {
      console.log("target too close to home goal..");
      tx=gd.x+safe_dist*dx/len;
      ty=gd.y+safe_dist*dy/len;
    }*/
    

    // move towards target.
    var controlspeed=0.4  +1.5*Math.cos(now/200)*Math.sin(now/230)*Math.cos(now/120);
    if(controlspeed<0)controlspeed=0;
    if(controlspeed>0.8) controlspeed=0.8;
    if(distance_to_ball<50)
    {
      controlspeed=0.7;
    }
    dx=tx-o.x;
    dy=ty-o.y;
    len=Math.sqrt(dx*dx+dy*dy);
    o.dx+=controlspeed*dx/len;
    o.dy+=controlspeed*dy/len;
    o.dx*=0.93;
    o.dy*=0.93;
    
    if(controlspeed === 0.0)
    {
      o.dx*=0.80;
      o.dy*=0.80;
    }
    
    
    playerHitBall(o);


  }
