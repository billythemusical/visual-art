/* 2018, written in Processing 3.3.7, 
based on Dan Schiffman's Coding Train web series on Bubble objects
*/

//Bubble b1;
//Bubble b2;
float t;
float r; 
float g;
float blue;

Bubble[] b = new Bubble[100];

void setup() {
  size(800, 800);
  for (int i = 0; i < b.length; i++) {
    b[i] = new Bubble(random(40, 100));
  }
}

void draw () {
  //r = 50 * noise(t + 15);
  //g = 100 * noise(t + 20);
  //blue = 200 * noise(t + 25);
  //println(r , g , blue);
  background(30, 50, 100);
  for (int i = 0; i < b.length; i++) {
    b[i].ascend();
    b[i].display();
    b[i].top();
  }
  t = t + 0.01;

  //saveFrame("output/psych_bubbles_#######.png");
}
