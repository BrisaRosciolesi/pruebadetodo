
//codigo con comentarios d bri 



let manchas = []; //donde guardamos las img
let puntosDibujados = []; //donde se guarda info de c/manchita (posicion, tamaño, etc)
let totalManchas = 13; //xq hay 13 fts

let fondoGuardado = null; //hacemos variable q actua como una foto  del fondo para no tener q hacerlo mil veces
let capaManchitas = null; //lo mismo con las manchitas, son otra capa en bloque
let lloviendo = false; //no empiezan lloviendo
let velocidadLluvia = 15; //pix x frame q bajan las manchitas

function preload() {
  for (let i = 0; i < totalManchas; i++) {
    manchas.push(loadImage(`Assets/mancha${i}.png`));
  }
}

function setup() {
  createCanvas(700, 900);
  noLoop();
  noStroke(); //para q no haya borde en las formas
  capaManchitas = createGraphics(700, 900); //es como q creamos una hoja encima del fondo de solo las manchitas asi cuando hay interaccion no se regenera una y otra vez todo.
  capaManchitas.noStroke();
}

function draw() {

  // --- LLUVIA ---
  if (lloviendo) {
    image(fondoGuardado, 0, 0);
    for (let p of puntosDibujados) { //llama a cada manchita de la lista P
      p.y += velocidadLluvia; //agarra el dato de la Y de P y le suma 15 pixeles en y para q bajen
      if (p.y > height + p.tam) p.y = -p.tam; // si se fue de la pantalla a abajo hace q vuelva a arruba
      tint(255, p.alfa);
      push();
      translate(p.x, p.y);
      image(p.img, 0, 0, p.tam, p.tam);
      pop();  //dibuja cada manchita
    }
    noTint();
    return;
  }

  // --- GENERACIÓN NORMAL ---
  fondo();
  capaBordo();
  capaRosa();
  capaCrema();
  grano();

  fondoGuardado = get(); //es como si saca una foto el canvas en ese momento q se dibujo el fondo y la guarda 

  puntosDibujados = []; //vacia la lista, si habia puntitos dibujados los borra
  capaManchitas.clear(); //limpia la "hoja" q hicimos con getgraphics de las manchitas
  let intentosTotales = 15000; //intentos d manchitas q queremos para q se llene el espacio bien, no se van a poner todas xq las q s episan no se ponen

  for (let i = 0; i < intentosTotales; i++) {
    let x = random(width);
    let y = random(height);
    let tamBase = 16;
    let tam = tamBase + random(-1, 1); //no todan son iguales pero varian un poquitito
    let radioSeguridad = (tam / 2) + 0.3; //hacemos un radio para q no se toquen entre si

    if (esPosicionValida(x, y, radioSeguridad)) { //si se puede dibujar en esa pos, procede.
      let alfa = random(25, 130);
      let img = random(manchas); //elige random una d las 13 img

      capaManchitas.tint(255, alfa); //le pone la transparencia q eleegimos a la img
      capaManchitas.push(); 
      capaManchitas.translate(x, y);
      capaManchitas.image(img, 0, 0, tam, tam); //dibujamos la img
      capaManchitas.pop(); //deshace el translate

      puntosDibujados.push({ x, y, yOrig: y, r: radioSeguridad, tam, alfa, img });//guarda estos datos d la manchita
    }
  }
  capaManchitas.noTint();

  image(fondoGuardado, 0, 0);
  image(capaManchitas, 0, 0);
  noLoop();
}


function redibujarManchitas() {
  capaManchitas.clear();
  for (let p of puntosDibujados) {
    capaManchitas.tint(255, p.alfa);
    capaManchitas.push();
    capaManchitas.translate(p.x, p.y);
    capaManchitas.image(p.img, 0, 0, p.tam, p.tam);
    capaManchitas.pop();
  }
  capaManchitas.noTint();
  image(fondoGuardado, 0, 0);
  image(capaManchitas, 0, 0);
}


function esPosicionValida(nx, ny, nr) {
  for (let p of puntosDibujados) {
    if (dist(nx, ny, p.x, p.y) < (nr + p.r)) return false;
  }
  return true;
}


// ====================================================
// 1. FONDO
// ====================================================

function fondo() {
  background(238, 225, 210);
}

// ====================================================
// 2. BORDÓ
// ====================================================

function capaBordo() {
  for (let i = 0; i < 6000; i++) {
    let x = random(width);
    let y = random(-30, height * 0.60);
    let alpha = map(y, -30, height * 0.60, 62, 8);
    fill(random(92, 128), random(10, 30), random(18, 48), alpha);
    ellipse(x, y, random(20, 90), random(12, 45));
  }
  for (let i = 0; i < 4000; i++) {
    let x = random(width);
    let y = random(0, height * 0.42);
    let alpha = map(y, 0, height * 0.42, 38, 2);
    fill(random(105, 150), random(18, 45), random(30, 68), alpha);
    ellipse(x, y, random(35, 160), random(18, 70));
  }
  for (let i = 0; i < 1800; i++) {
    let x = random(width);
    let y = random(height * 0.38, height * 0.82);
    let alpha = map(y, height * 0.38, height * 0.82, 9, 1);
    fill(random(130, 155), random(30, 55), random(45, 75), alpha);
    ellipse(x, y, random(45, 190), random(22, 85));
  }
}

// ====================================================
// 3. ROSA
// ====================================================

function capaRosa() {
  for (let i = 0; i < 1200; i++) {
    let x = random(width);
    let y = random(height * 0.52, height * 0.92);
    let alpha = map(y, height * 0.52, height * 0.92, 16, 3);
    fill(183, 96, 90, alpha);
    ellipse(x, y, random(55, 220), random(28, 100));
  }
}

// ====================================================
// 4. CREMA
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
// 5. GRANO
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
// REGENERAR / TEMBLAR / OPACIDAD
// ====================================================

function mousePressed() {
  redraw();
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    redraw();

  } else if (key === 'g' || key === 'G') {
    lloviendo = !lloviendo;
    if (lloviendo) {
      frameRate(30);
      loop();                // retoma desde donde estaba
    } else {
      noLoop();              // pausa, posiciones quedan guardadas en p.y
    }

  } else if (key === 't' || key === 'T') {
    for (let p of puntosDibujados) {
      p.alfa = random(25, 130);
    }
    redibujarManchitas();
  }
}
