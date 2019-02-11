class Bubble {
  float x;
  float y;
  float diameter;
  float yspeed;


  Bubble(float tempD) {
    x = random(width);
    y = random(height);
    diameter = tempD;
    yspeed = random (0.25, 4);
  }
    
  void ascend() {
    y = y - yspeed;
    x = x + random (-2, 2);
  }

  void display() { 
    ellipse(x, y, diameter, diameter);
    fill(100,random(100,250),random(100,250),80);
    strokeWeight(random(0, 1));
  }

  void top() {
    if (y < -diameter) {
      y = height + diameter;
    }

 
  }
}
