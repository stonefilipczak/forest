
let X = 0;
let Y = 0;
let Z = 0;
let camX = 0;
let camY = 0;
 // let centerX = 1;
 // let centerY = 1;
 // let centerZ = 1;
// let h = 20;
let trees = [];
let cam;
let sphereX = 1;
let sphereZ = 1;
let img;
let collision = false;
let distance;
let delay;
let slider;
let treeCount = 40;
let area = 666;
let autoPilot = false;
let turn;
let notes = ['E4', 'G4', 'A4', 'B4', 'D4', 'E5', 'G5', 'A5', 'B5', 'D5', 'E6', 'G6', 'A6', 'B6', 'D6'];
let birdview = false;


function preload() {
  img = loadImage('img/incognito.png');
}

function setup() {
  div = createDiv('welcome to the forest synth. for best results run on a laptop or desktop running google chrome. if you experience performance issues try setting the tree count slider to a lower value. walk around with the arrow keys. have fun');
  div.style('color: lightgreen; background-color: black; padding: 10px; width: 200px; padding-right: 2000px')
    createCanvas(windowWidth, windowHeight, WEBGL);
  
       button = createButton('ENTER');
  button.position(10, 200);
 
  button.mousePressed(Enter);
  
  
  
  
  
  cam = createCamera();
  cam.setPosition(0, 0, 0)
  
  
//   slider = createSlider(0, 360, 0, 0);
//   slider.position(width / 20, height / 20);
//   slider.style("width", "80px");
 
//   delay = new p5.Delay();
  
  
}

function changeTrees(){
  //console.log(slider.value())
  treeCount = slider.value();
  refreshTrees();
} 

function toggleBirdview() {
  if (birdview == false){
    cam.move(0, 75, 0)
    birdview = true;
  } else {
    cam.move(0, -75, 0);
    birdview = false;
  } 
}

function changeNotes () {
 
  if (sel.value() == 'major'){
    notes = ['E4', 'F#4', 'G#4', 'A4', 'B4', 'C#4', 'D#4', 'E5', 'F#5', 'G#5', 'A5', 'B5', 'C#5', 'D#5', 'E6', 'F#6', 'G#6', 'A6', 'B6', 'C#6', 'D#6'];
  } else if (sel.value() == 'pentatonic'){
    notes = ['E4', 'G4', 'A4', 'B4', 'D4', 'E5', 'G5', 'A5', 'B5', 'D5', 'E6', 'G6', 'A6', 'B6', 'D6'];
  } else if (sel.value() == 'minor'){
    notes = ['E4', 'F#4', 'G4', 'A4', 'B4', 'C4', 'D4', 'E5', 'F#5', 'G5', 'A5', 'B5', 'C5', 'D5', 'E6', 'F#6', 'G6', 'A6', 'B6', 'C6', 'D6'];
  };
  
  refreshTrees();
}

function refreshTrees(){
  for (const tree of trees) {
    tree.synth.dispose();
  }
  trees = [];
  loadTrees();
}

function togglePilot() {
  if (autoPilot == false){
    autoPilot = true;
  } else {
    autoPilot = false;
  }
}



function loadTrees(){
  for (let i=0;i<treeCount;i++){
  let tree = {};  
  // tree.x = noise(i)*100;
  tree.x = random(area, -area);  
  tree.y = 0;
  tree.z = random(area, -area);
  tree.i = i;  
  tree.synth = new p5.MonoSynth();
  tree.synth.isPlaying = false;  
  tree.distance = 0;  
  tree.next = random(1, 100)  
  tree.note = random(notes);  
  trees.push(tree);
  }
}

function drawTree(x, y, z, i) {
   
  push()
  translate(x, y, z)
  collisionDetect(x, z, i);
  push()
  
  angleMode(RADIANS)
 
  
  // rotateY(millis() / 4000);
  angleMode(DEGREES)
   stroke(0)
 strokeWeight(1)
  // fill(random(255, 0), random(255, 0), 200, 255);
  distance = dist(cam.eyeX, 0, -cam.eyeZ, x, 0, z);
  fill(400-distance, distance, 0)
  cone(30, 65, 16, 15);
  translate(0, -50, 0)
  fill(165,42,42)
  cylinder(5, 50, 16, 1);
  translate(0, 50, 0)
  
  pop()
  // rotateY(139)
  //draw ground 
  push()
  translate(0, -75, 0)
  stroke(255);
  fill(0);
  if (i < treeCount - 1) {
    beginShape();
vertex(0, 0, 0);
vertex(2000, 0, trees[i+1].z);
endShape();
  }
  
  
  translate(0, 75, 0)
  pop()
  
  pop();
  
 
  
}

function Enter () {
  slider = createSlider(0, 100, 30, 5);
  slider.position(10, 10);
  slider.changed(changeTrees);
  // loadFont('Helvetica')
  // text('treecount', 100, 10)
  
  // frameRate(24);
//    sel = createSelect();
//   sel.position(15, 90);
//   sel.option('pentatonic');
//   sel.option('minor');
//   sel.option('major');
//   sel.selected('pentatonic');
//   sel.changed(changeNotes);
  
 
  
  // ortho(-width, width, height, -height/2, 0.1, 100);
  
 // loadTrees();
 
  
 
//   checkbox = createCheckbox('autopilot', false);
//   checkbox.position(10, 60)
//   checkbox.style('color: white')
//   checkbox.changed(togglePilot);
  
    birdview = createCheckbox('birdview', false);
  birdview.position(10, 35)
  birdview.style('color: white')
  birdview.changed(toggleBirdview);
  loadTrees();
  button.remove();
  div.remove();
}


function draw() {
  
  

  

  stroke(0)
  angleMode(DEGREES)
  
  if (keyIsDown(UP_ARROW) || (autoPilot == true)){
    Z++;
    cam.move(0, 0, -1)
    
  }
  
  if (keyIsDown(LEFT_ARROW)){
      cam.pan(1)
      }    
  
    if (keyIsDown(RIGHT_ARROW)){
      cam.pan(-1)
      }  
  
   if (keyIsDown(DOWN_ARROW)){
      Z--;
     cam.move(0, 0, 1)
     
  }
 
  
  
  
  
  
  
  
  
  angleMode(DEGREES)
   
  
 
  background(0)
  
  
  
  rotateX(180);
  // rotateX(mouseX)
  push()
  
  trees.map(tree => drawTree(tree.x, tree.y, tree.z, tree.i))
  pop()
  //trees.map(tree => collisionDetect(tree.x, tree.z));
  
  
  
  
  //draw moon
  push()
  translate(4000, 1000, 20)
  strokeWeight(1)
  texture(img);
  angleMode(RADIANS)
 
  
  rotateY(millis() / 6000);
  angleMode(DEGREES)
 
  rotateX(180)
  sphere(1000)
  pop()
  
  //draw ground 
  // push()
  // rotateX(90)
  // translate(0, 0, 80)
  // square(0, 0, 50000)
  // translate(0, 80, 0)
  // pop()
  
  //draw bug
  
  //sphere(200)


  
  
  
  
  
  
 
  
  
  
 
}

function collisionDetect(x, z, i) {
  push()
  // console.log(`tree number ${i}: X: ${round(x)}, Z: ${round(z)}`);
  // console.log(`eyeZ: ${round(cam.eyeZ)}`)
  // console.log(`Z: ${round(z)}`)
  // console.log(`eyeX: ${round(cam.eyeX)}`)
  // console.log(`X: ${round(x)}`)
  
//   console.log(round(x))
  
  // console.log("mother" + dist(cam.eyeX, 0, -cam.eyeZ, x, 0, z))
  distance = round(dist(cam.eyeX, 0, -cam.eyeZ, x, 0, z));
  
     
  d = map(distance, 100, 200, 0, 1, true);
  trees[i].synth.amp(1-d)
   // var val = slider.value();
  // var mappedVal = map(val, 0, 360, 0, 0.999);
  // delay.process(trees[i].synth, mappedVal, 0.7, 2300);
  // delay.drywet([mappedVal]);
  // delay.feedback(mappedVal);
  
  // console.log(d);
  
  if (distance == 200) {
    playTree(x, z, i);
    turn = random(['right', 'left']);
    //console.log(distance)
    
  };
  if (distance == 100 && autoPilot == true) {
     
     cam.move(0, 0, 1);
    if (turn == 'right'){
    cam.pan(-1)
    } else {
      cam.pan(1);
    }  
  }
  
  if (distance < 100 && autoPilot == true){
    cam.move(0, 0, 100)
  }
  
  if (distance > area*3) {
     cam.move(0, 0, 20);
    cam.pan(-180)
 
  }

  pop()
  
}  

function playTree(x, z, i){
    


  synth =  trees[i].synth;
  

    
    if (synth.isPlaying == false) {
       synth.triggerAttack(trees[i].note);
      synth.isPlaying = true;
    } else {
      synth.triggerRelease();
      synth.isPlaying = false;
    }
    
   
}
