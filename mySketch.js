//Tutorial Video of the work.This is my YouTube channel video.↓URL
//https://www.youtube.com/watch?v=9lRGWPOXMCk
let Nr;
let Ng;
let Nb;
/*
//thumbnail
let img;
function preload(){
	img = loadImage("スクリーンショット 2025-07-10 231920.png");
}
function setup(){
	createCanvas(500,500);
	image(img,0,0,width,height);
}
*/

function setup() {
  createCanvas(500, 500,WEBGL);  // WEBGLモードでウィンドウを作成
  strokeWeight(3);
  Nr = noise(random(1000)); 
  Ng = noise(random(1000)); 
  Nb = noise(random(1000)); 
}

let Nred;
let Ngreen;
let Nblue;
function draw() {
  Nred  = map(Nr,0,1,0,50);
  Ngreen = map(Ng,0,1,200,255);
  Nblue =  map(Nb,0,1,0,50);
  
  background(255);

  // カメラ位置を調整
  orbitControl();
  
  ambientLight(frameCount*255);
  ambientMaterial(Nred,Ngreen,Nblue); 
  drawSierpinski3D(400, 400, 3);
}
function drawPyramid3D(w, h) {
  let halfW = w / 2;

  // 頂点座標
  let top = createVector(0, -h/2, 0);

  // 底面の4つの頂点（正方形）
   let base = [
    createVector(-halfW, h/2, -halfW),
    createVector( halfW, h/2, -halfW),
    createVector( halfW, h/2, halfW),
    createVector(-halfW, h/2, halfW)
  ];


  // 側面（4つの三角形）
  beginShape(TRIANGLES);
  for (let i = 0; i < 4; i++) {
    let next = (i + 1) % 4;
    vertex(top.x, top.y, top.z);
    vertex(base[i].x, base[i].y, base[i].z);
    vertex(base[next].x, base[next].y, base[next].z);
  }
  endShape();

  // 底面（正方形）
  beginShape(QUADS);
  for (let i = 0; i < 4; i++) {
    vertex(base[i].x, base[i].y, base[i].z);
  }
  endShape();
}
function drawSierpinski3D(w, h, n) {
  if (n>0) {
    let Sh = h/2;
    let Sw = w / 2;
    push();
    translate(0, -Sh/2, 0);
    drawSierpinski3D(Sh, Sw, n-1);
    translate(-Sw/2, Sh, -Sw/2);
    drawSierpinski3D(Sh, Sw, n-1);
    translate(Sw, 0, 0);
    drawSierpinski3D(Sh, Sw, n-1);
    translate(0, 0, Sw);
    drawSierpinski3D(Sh, Sw, n-1);
    translate(-Sw, 0, 0);
    drawSierpinski3D(Sh, Sw, n-1);
    pop();
  } else   drawPyramid3D(w, h);
}

