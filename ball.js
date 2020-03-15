  function ballBehaviour(o)
  {
    o.dx*=0.997;
    o.dy*=0.997;
  }
  function playerHitBall(o)
  {
    // check if you hit the ball, if so, make it move.
    var b=model.ball;
    
    // distance between ball and hero.
    dx=b.x-o.x;
    dy=b.y-o.y;
    len=Math.sqrt(dx*dx+dy*dy);
    
    var totallen=(o.r+b.r); // min dist.
    
    // calc system speed before collision.
    var totalspeed=Math.sqrt(o.dx*o.dx+o.dy*o.dy)+Math.sqrt(b.dx*b.dx+b.dy*b.dy);
    if(len<totallen)
    {
      b.dx+=dx/5;
      b.dy+=dy/5;
      b.x=o.x+totallen*dx/len;
      b.y=o.y+totallen*dy/len;
      
  // get the hero some knockback as well.
      o.dx-=dx/15;
      o.dy-=dy/15;

      // check if totalspeed didn´t increase.
      var totalspeed2=Math.sqrt(o.dx*o.dx+o.dy*o.dy)+Math.sqrt(b.dx*b.dx+b.dy*b.dy);
      var f=totalspeed/totalspeed2;
      // correct for speed increases.
      o.dx=o.dx*f;
      o.dy=o.dy*f;
      b.dx=b.dx*f;
      b.dy=b.dy*f;
      b.dx*=0.9;
      b.dy*=0.9;

    }

  
  }
