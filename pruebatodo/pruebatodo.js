
let manchas = [];
let puntosDibujados = []; //posiciones donde ya fuimos dibujamos
let totalManchas = 13; 

function preload() {
  for (let i = 0; i < totalManchas; i++) {
    manchas.push(loadImage(`Assets/mancha${i}.png`)); 
  }
}
function setup() {
  createCanvas(700, 900);
  noLoop();
  noStroke();
}

function draw() {
  fondo();
  capaBordo();
  capaRosa();
  capaCrema();
  grano();
  
  // GENERACIÓN DE PUNTOS AMONTONADOS
  let intentosTotales = 150000; 
  
  for (let i = 0; i < intentosTotales; i++) {
    let x = random(width);
    let y = random(height);
    
    let tamBase = 16;
    let tam = tamBase + random(-1, 1); 
    
    let radioSeguridad = (tam / 2) + 0.3; 

    if (esPosicionValida(x, y, radioSeguridad)) {
      let alfa = random(25, 130); 
      tint(255, alfa); 

      // !!! DIBUJO SIN ROTACIÓN 
      push();
      translate(x, y);
      image(random(manchas), 0, 0, tam, tam);
      pop();

      puntosDibujados.push({ x: x, y: y, r: radioSeguridad }); //para nod ibujar en el mismo lugar
    }
  }}


function esPosicionValida(nx, ny, nr) {
  for (let p of puntosDibujados) {
    let d = dist(nx, ny, p.x, p.y);
    if (d < (nr + p.r)) {
      return false; 
    }
  }
  return true;
}


// ====================================================
// 1. FONDO
// ====================================================

function fondo() {
  background(238, 225, 210); // crema cálida
}

// ====================================================
// 2. BORDÓ — sólido arriba, llega al 60%
// ====================================================

function capaBordo() {

  // bloque sólido tope — llega hasta el 60%
  for (let i = 0; i < 6000; i++) {
    let x = random(width);
    let y = random(-30, height * 0.60);
    let alpha = map(y, -30, height * 0.60, 62, 8); // cuanto más abajo más transparente
    fill(random(92, 128), random(10, 30), random(18, 48), alpha);
    ellipse(x, y, random(20, 90), random(12, 45));
  }

  // bordó más difuso, refuerza el tope hasta el 42%
  for (let i = 0; i < 4000; i++) {
    let x = random(width);
    let y = random(0, height * 0.42);
    let alpha = map(y, 0, height * 0.42, 38, 2);
    fill(random(105, 150), random(18, 45), random(30, 68), alpha);
    ellipse(x, y, random(35, 160), random(18, 70));
  }

  // bordó oscuro para generar la transición hacia la zona baja
  for (let i = 0; i < 1800; i++) {
    let x = random(width);
    let y = random(height * 0.38, height * 0.82);
    let alpha = map(y, height * 0.38, height * 0.82, 9, 1);
    fill(random(130, 155), random(30, 55), random(45, 75), alpha);
    ellipse(x, y, random(45, 190), random(22, 85));
  }
}

// ====================================================
// 3. ROSA — zona media-baja, producto de la fusión
//    bordó + crema, no una capa encima del bordó
// ====================================================

function capaRosa() {

  // arranca en 0.52, donde el bordó ya se disolvió bastante
  // el resultado se lee como crema teñida por el bordó
  for (let i = 0; i < 1200; i++) {
    let x = random(width);
    let y = random(height * 0.52, height * 0.92);
    let alpha = map(y, height * 0.52, height * 0.92, 16, 3);
    fill(183, 96, 90, alpha); // #b7605a
    ellipse(x, y, random(55, 220), random(28, 100));
  }
}

// ====================================================
// 4. CREMA — aclara abajo
// ====================================================

function capaCrema() {

  for (let i = 0; i < 2000; i++) {
    let x = random(width);
    let y = random(height * 0.62, height);
    let alpha = map(y, height * 0.62, height, 3, 18);
    fill(random(235, 248), random(220, 235), random(208, 225), alpha);
    ellipse(x, y, random(70, 270), random(35, 125));
  }

  for (let i = 0; i < 500; i++) {
    let x = random(width);
    let y = random(height * 0.60, height);
    let alpha = map(y, height * 0.60, height, 12, 2);
    fill(205, 148, 158, alpha);
    ellipse(x, y, random(50, 190), random(6, 20));
  }
}

// ====================================================
// 5. GRANO de tela
// ====================================================

function grano() {
  noStroke();
  for (let i = 0; i < 20000; i++) {
    fill(255, random(2, 8));
    rect(random(width), random(height), 1, 1);
    fill(0, random(1, 4));
    rect(random(width), random(height), 1, 1);
  }
}

// ====================================================
// REGENERAR
// ====================================================

function mousePressed() {
  redraw();
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    redraw();
  }
}
