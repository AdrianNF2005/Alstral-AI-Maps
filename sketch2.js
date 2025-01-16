let chatHistory = [];
let speechRec;
let saidText = "";
let isSpeaking = false; // Control para saber si el bot está hablando
let isRecognizing = false; // Control manual para saber si el sistema está escuchando
let speech; // Variable para el sintetizador de voz
let frasesAdecir = 0;
let textochunks;

let AIGIF;
let AIBUTTON;
let BARVEL;
let C1;
let C2;
let C3;
let C4;
let WHITE;
let BACKGROUND;
let FOWARD;
let BACKWARD;
let LEDBUTTON;
let MAPHIDE;
let MICICON;
let PALANCA;
let STOP;
let STOP2;
let LOADING;
let TextoRadar;
let RightMenu;
let LeftMenu;
let PalancaLed;
let PalancaLed2;
let CarCamera;
let WarningAl;
let Cross;
let Tick;
let Danger;
let arrowImg;
let arrowImg2;
let arrowImgDER;
let arrowImgIZQ;
let arrowImgDER45;
let arrowImgIZQ45;
let arrowImgDER2;
let arrowImgIZQ2;
let arrowImgDER452;
let arrowImgIZQ452;
let Burujula;
let NoPath;
let Radar = [];

let PantallaInicio = true;

let ImagenesCarga = false;

let ACTIVAR_CHATBOT = false;

let Translucido = 0;

let TranslucidoWHITE = 0;

let TranslucidoCAR = 0;

let IncrementCar = true;

let TranslucidoWhite = 255;

let IncrementWhite = false;

let distances;

let Foward = true;

let FowardANT = true;

let LeftMenushow = false;

let LeftMenushowANT = false;

let RightMenushow = false;

let RightMenushowANT = false;

let capture;

let animacionCmara = 0;

let CarCameratint = 0

let IncrementCarCameratint = true;

let LeftDist = 0;

let RightDist = 0;

let DesplazamientoVentana = 0;

let AlstralAIPathX = 0;

let AlstralAIPathY = 0;

let PressedAITime = false;

let ShowWarning = false;

let PosicionXRGB = 892;

let PosicionYRGB = 307;

let HeadLight = 0;

let BlackWhite = 255;

let LedRed = 255;
let LedGreen = 255;
let LedBlue = 255;

let InicioCaminoAI = false;  //InicioCaminoAI variable que controla el inicio de camino

let DirEstado = 0;  //Variable, 0 -> 90º IZQ, 1 -> 45º IZQ, 2 -> CENTRADO, 3 -> 45º DER, 4 -> 90º DER
let PARADAEMER = false;

let StopTimeOut = 0;

let Speed = 0;

let latBase = 41.6697; // Base de la latitud
let lonBase = -0.8788; // Base de la longitud
let lat = "";
let lon = "";
let lastUpdateTime = 0; // Para controlar el tiempo de actualización


function preload() {
  
  LOADING = loadImage("ASSETS/loading.gif");
  AIGIF = loadImage("ASSETS/AI.gif");
  AIBUTTON = loadImage("ASSETS/AIBUTTON.png");
  BARVEL = loadImage("ASSETS/BARRAVEL.png");
  C1 = loadImage("ASSETS/CIRCLE1.png");
  C2 = loadImage("ASSETS/CIRCLE2.png");
  C3 = loadImage("ASSETS/CIRCLE3.png");
  C4 = loadImage("ASSETS/CIRCLE4.png");
  WHITE = loadImage("ASSETS/ColorWhite.png");
  BACKGROUND = loadImage("ASSETS/FondoAlstral2.png");
  FOWARD = loadImage("ASSETS/Foward Button.png");
  BACKWARD = loadImage("ASSETS/Reverse Button.png");
  LEDBUTTON = loadImage("ASSETS/LED BUTTON.png");
  MAPHIDE = loadImage("ASSETS/Map Hide 2.png");
  MICICON = loadImage("ASSETS/MicICON.png");
  PALANCA = loadImage("ASSETS/PalancaVEL.png");
  STOP = loadImage("ASSETS/STOP.png");
  STOP2 = loadImage("ASSETS/STOP2.png");
  FONDO = loadImage("ASSETS/Fondo.png");
  TextoRadar = loadImage("ASSETS/TextoRadar.png");
  CarWhite = loadImage("ASSETS/CarWHITE.png");
  RightMenu = loadImage("ASSETS/Lightning menu.png");
  LeftMenu = loadImage("ASSETS/Alstral AI Path.png");
  PalancaLed = loadImage("ASSETS/Palanca Led.png");
  PalancaLed2 = loadImage("ASSETS/Palanca Led2.png");
  CarCamera = loadImage("ASSETS/Car Camera2.png");
  WarningAl = loadImage("ASSETS/WarningAl.png");
  Cross = loadImage("ASSETS/Cross.png");
  Tick = loadImage("ASSETS/Tick.png");
  Danger = loadImage("ASSETS/Danger.gif");
  arrowImg = loadImage("ASSETS/Arrow.png");
  arrowImg2 = loadImage("ASSETS/Arrow2.png");
  arrowImgDER = loadImage("ASSETS/ArrowDer.png");
  arrowImgIZQ = loadImage("ASSETS/ArrowIzq.png");
  arrowImgDER45 = loadImage("ASSETS/ArrowDer45.png");
  arrowImgIZQ45 = loadImage("ASSETS/ArrowIzq45.png");
  arrowImgDER2 = loadImage("ASSETS/ArrowDer2.png");
  arrowImgIZQ2 = loadImage("ASSETS/ArrowIzq2.png");
  arrowImgDER452 = loadImage("ASSETS/ArrowDer452.png");
  arrowImgIZQ452 = loadImage("ASSETS/ArrowIzq452.png");
  NoPath = loadImage("ASSETS/NoPath.png");
  Burujula = loadImage("ASSETS/Burujula.png");
  VideoMap = createVideo("ASSETS/VideoMap.mp4");
  NASAFONT = loadFont('ASSETS/Fuente1.otf');
  
}

function setup() {
  createCanvas(1024, 600);
  frameRate(30);
  textFont(NASAFONT);
  
   
  distances = Array(500).fill(1200);
  
    
  VideoMap.hide();
  VideoMap.loop();
  
  capture = createCapture(VIDEO); // Captura de la cámara
  capture.size(800, 600); // Tamaño de la captura
  capture.hide(); // Oculta el elemento HTML de la cámara
  
  maskGraphics = createGraphics(capture.width, capture.height);
  maskGraphics.noStroke();
  maskGraphics.fill(255);
  maskGraphics.rect(0, 0, 800, 600, 200); // Rectángulo con bordes redondeados

  // Initialize Speech Synthesis
  speech = new p5.Speech();  // Aquí se crea el objeto correctamente

  speech.onLoad = onSpeechReady; // Usamos el evento onLoad para saber cuándo la voz está lista
  speech.onEnd = vozFin;
  // Initialize Speech Recognition
  speechRec = new p5.SpeechRec('es-ES', gotSpeech);
  speechRec.onEnd = speechEnded;
  let continuous = false; // No escuchamos de manera continua
  let interimResults = false; // No mosthttps://assets.editor.p5js.org/5fb916f9cc4c140020379cf1/c318944c-80ff-4b01-ad23-d4ac1ca86b2d.png?v=1736753155628ramos resultados intermedios
  speechRec.start(continuous, interimResults);
  
}

function onSpeechReady() {
  // La voz está lista, podemos configurarla y hacer que hable
  speech.setLang('es-ES');
  speech.setPitch(1.3);
  speech.setRate(1.08);
  speech.setVolume(1);
  speech.setVoice('Google español');

  // Decir la frase inicial
  speakIntro();
}

function speakIntro() {
  // Frase inicial larga que se puede interrumpir
  isSpeaking = true;
  
  /*
  speech.speak('Hola soy la IA de Altral motion, el coche del futuro, estoy aquí para lo que necesites, cualquier cosa no dudes en preguntármelo. Trataré de responderte en lo que pueda. Sabías que en parte me han creado en San Valero, ¡es alucinante!, ¿Verdad?.');
  speech.speak('.Para hablar conmigo solamente pulsa el botón que te muestro en pantalla y hazme cualquier pregunta que tengas. Gracias y perdona por si no acierto en todo lo que me digas, aun estoy aprendiendo cosas nuevas cada día.');
  
  */
}

function cancelSpeech() {
  // Cancelamos la frase actual si está en ejecución
  window.speechSynthesis.cancel();
  isSpeaking = false; // Indicamos que el bot ya no está hablando
}

function startSpeechRecognition() { 
    
  if (isRecognizing) {
    console.log("Ya está escuchando...");
                      return; // Si el reconocimiento ya está en curso, no lo iniciamos nuevamente
  } // Si está escuchando, lo detenemos primero
  
  if (speechRec.isRecognizing) {
    
    console.log("Deteniendo reconocimiento de voz...");
    speechRec.stop(); // Detenemos el reconocimiento de voz si ya está activo
  }
  
  isRecognizing = true; // Indicamos que ahora estamos escuchando
  // Empezamos el reconocimiento de voz
}

function draw() {
  
  textAlign(LEFT, TOP);
  
  //image(LOADING, 0, 0, width, height);
  
  push();
    
  imageMode(CENTER);

  image(FONDO, width/2, height/2, width, height);
  
  image(BACKGROUND, width/2, height/2);
  
  push();
  
  if (VideoMap.time() <= 5) {
    
    Translucido = map(VideoMap.time(), 0, 5, 0, 255);
    
  }
  
  if (VideoMap.time() >= 16) {
    
   Translucido = map(VideoMap.time(), 15, 19, 255, 0);
    
  }
  
  tint(255, 255, 255, Translucido);
  
  image(VideoMap, width*0.1263, height*0.712, VideoMap.width*0.6, VideoMap.height*0.6);
  
  pop();
  
  image(MAPHIDE, width*0.1268, height*0.76, MAPHIDE.width*0.4, MAPHIDE.height*0.4);
  
  push();
  
  if (IncrementWhite == false && TranslucidoWhite <= 0) {
     
    IncrementWhite = true;
      
  }
  
  if (IncrementWhite == true && TranslucidoWhite >= 220){
    
    IncrementWhite = false;
    
  }
  
  if (IncrementWhite == false) {
     
    TranslucidoWhite = TranslucidoWhite - 5;
      
  }
  
  if (IncrementWhite == true){
    
    TranslucidoWhite = TranslucidoWhite + 5;
    
  }
  
  tint(255, 255, 255, TranslucidoWhite);
  
  image(WHITE, width/2, height/2 - 22, WHITE.width*0.931, WHITE.height*0.931);
  
  pop();
  
  push();
  
  if (Foward == true) {
    
    tint(255, 120, 120);
    
  }
  
  image(FOWARD, width*0.58, height*0.92, FOWARD.width*0.27, FOWARD.height*0.27);
  
  pop();
  
  push();
  
  if (Foward == false) {
    
    tint(255, 120, 120);
    
  }
  
  image(BACKWARD, width*0.43, height*0.92, BACKWARD.width*0.27, BACKWARD.height*0.27);
  
  pop();
  
  image(BARVEL, width*0.18, height*0.92, BARVEL.width*0.41, BARVEL.height*0.41);
  
  push();
  
  if (LeftMenushow == true || LeftMenushowANT == true) {
  
  tint(255, 170, 60);
    
  }
  
  image(AIBUTTON, width*0.8, height*0.12, AIBUTTON.width*0.35, AIBUTTON.height*0.35);
  
  image(AIGIF, width*0.782, height*0.1236, AIGIF.width*0.149, AIGIF.height*0.149);
  
  pop();
  
  if (mouseX >= width*0.94 -STOP.width*0.36/2 && mouseX <= width*0.94 + STOP.width*0.36/2 && mouseY >= height*0.1 - STOP.height*0.36/2 && mouseY <= height*0.1 + STOP.height*0.36/2 && mouseIsPressed == true) {
  PARADAEMER = true;
    
    StopTimeOut = millis();
      
  }
  
  if (millis() >= StopTimeOut + 5000) {
    
    PARADAEMER = false;
    
  }
  
  if (PARADAEMER == true) {
  
  image(STOP2, width*0.94, height*0.1, STOP2.width*0.36, STOP2.height*0.36);
    
    InicioCaminoAI = false;
    
  } else {
  
  image(STOP, width*0.94, height*0.1, STOP.width*0.36, STOP.height*0.36);
    
  }
  
  push();
  
  if (RightMenushow == true || RightMenushowANT == true) {
  
  tint(255, 170, 60);
    
  }
  
  image(LEDBUTTON, width*0.65, height*0.1236, LEDBUTTON.width*0.33, LEDBUTTON.height*0.33);
  
  pop();
  
  if (mouseX >= width*0.18 - BARVEL.width*0.37/2 && mouseX <= width*0.18 + BARVEL.width*0.37/2 && mouseY >= height*0.92 - BARVEL.height*0.54/2 && mouseIsPressed == true) {
    
    Speed = map(mouseX, width*0.18 - 100, width*0.18 + 100, 255, 0);
    
  }
  
    if (Speed >= 255) {
      
      Speed = 255;
      
    }
    
    if (Speed <= 0) {
       
      Speed = 0;
        
    }
  
  image(PALANCA, width*0.18 + map(Speed, 255, 0, -100, 100), height*0.92, PALANCA.width*0.41, PALANCA.height*0.41);
  
  image(TextoRadar, width*0.773, height*0.885, TextoRadar.width*0.45, TextoRadar.height*0.45);
  
  push();
  
  if (IncrementCar == false && TranslucidoCAR <= 0) {
     
    IncrementCar = true;
      
  }
  
  if (IncrementCar == true && TranslucidoCAR >= 220){
    
    IncrementCar = false;
    
  }
  
  if (IncrementCar == false) {
     
    TranslucidoCAR = TranslucidoCAR - 5;
      
  }
  
  if (IncrementCar == true){
    
    TranslucidoCAR = TranslucidoCAR + 5;
    
  }
    
  
  if (Foward == false || FowardANT == false) {
    
    tint(160, 50, 50);
    
  } else {
    
  if (InicioCaminoAI == true) {
    
    tint(249, 198, 11, TranslucidoCAR + 35);
    
  } else {
  
    tint(255, 255, 255, TranslucidoCAR);
    
  }
    
  }
  
  image(CarWhite, width*0.501, height*0.577, CarWhite.width*0.2, CarWhite.height*0.2);
  
  pop();
  
  push();
  
  translate(112, 181);
  
  rotate(frameCount/5);
  
  image(C1, 0, 0, C1.width*0.11, C1.height*0.11);
  
  pop();
  
  push();
  
  translate(148, 181);
  
  rotate(frameCount/6);
  
  image(C2, 0, 0, C2.width*0.11, C2.height*0.11);
  
  pop();
  
  push();
  
  translate(130, 181);
  
  rotate(-frameCount/8);
  
  image(C3, 0, 0, C3.width*0.11, C3.height*0.11);
  
  pop();
  
  push();
  
  translate(166, 181);
  
  rotate(-frameCount/6);
  
  image(C4, 0, 0, C4.width*0.11, C4.height*0.11);
  
  pop();
  
  push();
  
  translate(98, 260);
  
  rotate(-frameCount/8);
  
  image(C2, 0, 0, C2.width*0.12, C2.height*0.12);
  
  pop();
  
  push();
  
  translate(98, 284);
  
  rotate(frameCount/6);
  
  image(C1, 0, 0, C1.width*0.12, C1.height*0.12);
  
  pop();
  
  push();
  
  translate(747, 209);
  
  rotate(frameCount/5);
  
  image(C1, 0, 0, C1.width*0.1, C1.height*0.1);
  
  pop();
  
  push();
  
  translate(761, 227);
  
  rotate(-frameCount/7);
  
  image(C4, 0, 0, C4.width*0.1, C4.height*0.1);
  
  pop();
  
  push();
  
  translate(774, 248);
  
  rotate(frameCount/10);
  
  image(C3, 0, 0, C3.width*0.1, C3.height*0.1);
  
  pop();
  
  push();
  
  translate(826, 211);
  
  rotate(frameCount/8);
  
  image(C3, 0, 0, C3.width*0.1, C3.height*0.1);
  
  pop();
  
  push();
  
  translate(843, 211);
  
  rotate(-frameCount/6);
  
  image(C1, 0, 0, C1.width*0.1, C1.height*0.1);
  
  pop();
  
  push();
  
  translate(860, 211);
  
  rotate(frameCount/10);
  
  image(C2, 0, 0, C2.width*0.1, C2.height*0.1);
  
  pop();
  
  push();
  
  translate(877, 211);
  
  rotate(-frameCount/8);
  
  image(C3, 0, 0, C3.width*0.1, C3.height*0.1);
  
  pop();
  
  push();
  
  tint(map(TranslucidoCAR, 0, 220, 255, 249), map(TranslucidoCAR, 0, 220, 255, 198), map(TranslucidoCAR, 0, 220, 255, 11));
  
  image(Burujula, 410, 176, Burujula.width*0.3, Burujula.height*0.3);
  
  pop();
  
  push();
  
  translate(403, 169); // Mover al centro del lienzo
  drawCircleWithLetters(25, frameCount);
  
  pop();
  
  push();
  
  textAlign(CENTER, CENTER);
  
  textSize(17);
  
  fill(255);
  text("20", 271, 250);
  
  textSize(15);
  
  fill(255);
  text("255", 340, 183);
  
  fill(255);
  text("255", 300, 211);
  
  textSize(13);
  
  fill(255);
  
  if (millis() - lastUpdateTime > 1500) {
    lat = generateRandomCoordinate(latBase);
    lon = generateRandomCoordinate(lonBase);
    lastUpdateTime = millis();
  }

  text(lat, 161, 209);
  text(lon, 161, 221);
  
  pop();
  
  image(MICICON, 50, 50, MICICON.width * 0.4, MICICON.height * 0.4);
  
  textSize(20);

  let y = 10;
  for (let message of chatHistory) {
    fill(message.isUser ? 'lightblue' : 'lightgreen');
    text(`${message.isUser ? 'You' : 'Bot'}: ${message.message}`, 10, y, width - 20);
    y += 30;
  }
  
  textSize(20);
  
  fill(220);
  text(`Speech Recognition: ${saidText}`, 120, 30, width - 20);
  
  let distances = Array.from({ length: 500 }, () => random(0, 1200));
 
  drawCircles(907, 452, distances);
  
  if (FowardANT == true || Foward == true) {
  
    drawEllipticalPillars(width/2, 360, 360, 210, distances, 180, 320);
  
  }
  
  if (Foward == false && FowardANT == false) {
    
  fill(210, 160, 0); // Azul oscuro
  rect(width/2 - (width*0.42/2), height*0.55 - (height*0.42/2), width*0.42, height*0.42, 94); // Rectángulo con bordes redondeados
    
let maskedImage = capture.get();
  maskedImage.mask(maskGraphics); // Aplicar la máscara al video

  // Dibujar el video enmascarado
  image(maskedImage, width/2, height*0.55, width*0.41, height*0.41);
    
  if (IncrementCarCameratint == true) {
    
    CarCameratint = CarCameratint + 5;
    
  } else {
    
    CarCameratint = CarCameratint - 5;
    
  }
    
  if (CarCameratint <= 40) {
        
    IncrementCarCameratint = true;
        
  }
    
  if (CarCameratint >= 255) {
        
    IncrementCarCameratint = false;
        
  }
    
  push();
    
  tint(255, 255, 255, CarCameratint);
    
  image(CarCamera, width/2, height*0.62, CarCamera.width*0.7, CarCamera.height*0.6);
    
  pop();
    
  }
  
  if (Foward == false && FowardANT == true) {
    
    animacionCmara = animacionCmara + 1;
    
  fill(210, 160, 0, map(animacionCmara, 0, 20, 0, 255)); // Azul oscuro
  rect(width/2 - (map(animacionCmara, 0, 20, 0, width*0.42)/2), map(animacionCmara, 0, 20, height*0.62, height*0.55) - (map(animacionCmara, 0, 20, 0, height*0.42)/2), map(animacionCmara, 0, 20, 0, width*0.42), map(animacionCmara, 0, 20, 0, height*0.42), 94); // Rectángulo con bordes redondeados
    
let maskedImage = capture.get();
  maskedImage.mask(maskGraphics); // Aplicar la máscara al video
    
    push();
    
  tint(255, 255, 255, map(animacionCmara, 0, 20, 0, 255));

  // Dibujar el video enmascarado
  image(maskedImage, width/2, map(animacionCmara, 0, 20, height*0.62, height*0.55), map(animacionCmara, 0, 20, 0, width*0.41), map(animacionCmara, 0, 20, 0, height*0.41)); 
    
    pop();
    
    if (animacionCmara >= 20) {
      
      FowardANT = false;
      
    }
    
  }
  
  if (Foward == true && FowardANT == false) {
    
    animacionCmara = animacionCmara -1;
    
  fill(210, 160, 0, map(animacionCmara, 0, 20, 0, 255)); // Azul oscuro
  rect(width/2 - (map(animacionCmara, 0, 20, 0, width*0.42)/2), map(animacionCmara, 0, 20, height*0.62, height*0.55) - (map(animacionCmara, 0, 20, 0, height*0.42)/2), map(animacionCmara, 0, 20, 0, width*0.42), map(animacionCmara, 0, 20, 0, height*0.42), 94); // Rectángulo con bordes redondeados
    
let maskedImage = capture.get();
  maskedImage.mask(maskGraphics); // Aplicar la máscara al video
    
    push();
    
  tint(255, 255, 255, map(animacionCmara, 0, 20, 0, 255));

  // Dibujar el video enmascarado
  image(maskedImage, width/2, map(animacionCmara, 0, 20, height*0.62, height*0.55), map(animacionCmara, 0, 20, 0, width*0.41), map(animacionCmara, 0, 20, 0, height*0.41)); 
    
    pop();
    
    if (animacionCmara <= 0) {
      
      FowardANT = true;
      
      CarCameratint = 0;
      
      IncrementCarCameratint = true;
      
    }
    
  }
  
  if (LeftMenushowANT == false && LeftMenushow == true) {
    
    if (LeftDist < LeftMenu.width + LeftMenu.width/2 - 1) {
      
      DesplazamientoVentana = DesplazamientoVentana + 0.02;
      
      LeftDist = map(sin(DesplazamientoVentana), 0, 1, 0, LeftMenu.width + LeftMenu.width/2);
      
    } else {
      
      LeftMenushowANT = true;
      
    }
        
      image(LeftMenu, -LeftMenu.width + LeftDist, height*0.52, LeftMenu.width, LeftMenu.height);
        
  }
  
  if (LeftMenushowANT == true && LeftMenushow == false) {
    
    if (LeftDist > 0) {
      
      DesplazamientoVentana = DesplazamientoVentana + 0.02;
      
      LeftDist = map(sin(DesplazamientoVentana), 1, 0, LeftMenu.width + LeftMenu.width/2, 0);
      
    } else {
      
      LeftMenushowANT = false;
      
    }
        
      image(LeftMenu, -LeftMenu.width + LeftDist, height*0.52, LeftMenu.width, LeftMenu.height);
        
  }
  
  if (LeftMenushowANT == true && LeftMenushow == true) {
    
    image(LeftMenu,  LeftMenu.width/2, height*0.52, LeftMenu.width, LeftMenu.height);
    
    if (mouseIsPressed == true && dist(mouseX, mouseY, 200, 328) <= 180) {
      
      PressedAITime = true;
      
      AlstralAIPathX = mouseX;
      AlstralAIPathY = mouseY;
      
      let constrainedPosition = constrainToCircle(AlstralAIPathX, AlstralAIPathY, 200, 328, 35, 146);
  AlstralAIPathX = constrainedPosition.x;
  AlstralAIPathY = constrainedPosition.y;
      
    }
    
    if (PressedAITime == true) {
      
      push();
      
      tint(255, 255, 255, map(TranslucidoCAR, 0, 220, 100, 255));
      
      image(Tick, 25, 150, Tick.width*0.42, Tick.height*0.42);
      
      image(Cross, 365, 150, Cross.width*0.42, Cross.height*0.42);
      
      pop();
      
      if (mouseIsPressed == true && mouseX >= 25 - Tick.width*0.45/2 && mouseX <= 25 + Tick.width*0.45/2 && mouseY >= 150 - Tick.height*0.45/2 && 150 + Tick.height*0.45/2) {
          
        ShowWarning = true;
          
      }
      
      if (mouseIsPressed == true && mouseX >= 365 - Cross.width*0.45/2 && mouseX <= 365 + Cross.width*0.45/2 && mouseY >= 150 - Cross.height*0.45/2 && 150 + Cross.height*0.45/2) {
          
          LeftMenushow = false;
        DesplazamientoVentana = HALF_PI;
          
      }
    
    let offset = frameCount % (15 + 10); // El offset se basa en frameCount y la suma de dash + gap
  drawDashedLineAnimated(AlstralAIPathX, AlstralAIPathY, 200, 328, 3, 15, 10, offset);
      
      noFill();
      strokeWeight(3);
      stroke(11, 114, 228, TranslucidoWhite + 20);
      
      ellipse(AlstralAIPathX, AlstralAIPathY, 40, 40);
      
    }
    
  }
  
  
  if (RightMenushowANT == false && RightMenushow == true) {
    
    if (RightDist < RightMenu.width + RightMenu.width/2 - 1) {
      
      DesplazamientoVentana = DesplazamientoVentana + 0.02;
      
      RightDist = map(sin(DesplazamientoVentana), 0, 1, 0, RightMenu.width + RightMenu.width/2);
      
    } else {
      
      RightMenushowANT = true;
      
    }
        
    image(RightMenu, width + RightMenu.width - RightDist, height*0.52, RightMenu.width, RightMenu.height);
        
  }
  
  if (RightMenushowANT == true && RightMenushow == false) {
    
    if (RightDist > 0) {
      
      DesplazamientoVentana = DesplazamientoVentana + 0.02;
      
      RightDist = map(sin(DesplazamientoVentana), 1, 0, RightMenu.width + RightMenu.width/2, 0);
      
    } else {
      
      RightMenushowANT = false;
      
    }
        
      image(RightMenu, width + RightMenu.width - RightDist, height*0.52, RightMenu.width, RightMenu.height);
        
  }
  
  if (RightMenushowANT == true && RightMenushow == true) {
    
    image(RightMenu,  width + RightMenu.width - RightDist, height*0.52, RightMenu.width, RightMenu.height);
    
    push();
    
    fill(0, 0, 0, map(BlackWhite, 255, 0, 0, 255));
    
    ellipse(892, 307, 220, 220);
    
    pop();
    
    textSize(19);
    stroke(0);
    
    textAlign(CENTER, CENTER);
  
    fill(255, 80, 80);
    text("R: " + LedRed, 892 - 97, 414);
    
    fill(80, 255, 80);
    text("G: " + LedGreen, 892, 435);
    
    fill(80, 80, 255);
    text("B: " + LedBlue, 892 + 97, 414);
    
    push();
      
    noFill();
    strokeWeight(3);
    stroke(map(BlackWhite, 255, 0, 0, 255));
    
    if (dist(892, 307, mouseX, mouseY) <= 140 && mouseIsPressed == true) {
    
let constrainedPosition = constrainToCircle(mouseX, mouseY, 892, 307, 0, 100);
      
    noFill();
      
    stroke(249, 148, 11);
      
    PosicionXRGB = constrainedPosition.x;
      
    PosicionYRGB = constrainedPosition.y;
    
    ellipse(PosicionXRGB, PosicionYRGB, 20, 20);
      
    strokeWeight(2);
      
    ellipse(PosicionXRGB, PosicionYRGB, 10, 10);
      
    pop();
    
    }
    
    noFill();
    
    ellipse(PosicionXRGB, PosicionYRGB, 20, 20);
      
    strokeWeight(2);
      
    ellipse(PosicionXRGB, PosicionYRGB, 10, 10);
    
    let c = get(PosicionXRGB, PosicionYRGB);
    
    LedRed = c[0];
    LedGreen = c[1];
    LedBlue = c[2];
    
    image(PalancaLed, 681, map(HeadLight, 255, 0, 250, 397), PalancaLed.width*1.2, PalancaLed.height*1.2);
    
    image(PalancaLed2, map(BlackWhite, 0, 255, 798, 985), 479, PalancaLed2.width*1.2, PalancaLed2.height*1.2);
    
    if (mouseX > 681 - PalancaLed.width*3/2 && mouseX < 681 + PalancaLed.width*3/2 && mouseY > 250 - PalancaLed.height*6/2 && mouseY < 397 + PalancaLed.height*6/2) {
      
      if (mouseIsPressed == true) {
      
      HeadLight = map(mouseY, 250, 397, 255, 0);
      
      if (HeadLight >= 255) {
        
       HeadLight = 255; 
        
      }
      
      if (HeadLight <= 0) {
        
       HeadLight = 0; 
        
      }
        
      }
      
    }
    
    if (mouseX > 798 - PalancaLed2.width*6/2 && mouseX < 985 + PalancaLed2.width*6/2 && mouseY > 479 - PalancaLed2.height*2/2 && mouseY < 479 + PalancaLed2.height*2/2) {
      
      if (mouseIsPressed == true) {
      
      BlackWhite = map(mouseX, 798, 985, 0, 255);
      
      if (BlackWhite >= 255) {
        
       BlackWhite = 255; 
        
      }
      
      if (BlackWhite <= 0) {
        
       BlackWhite = 0; 
        
      }
        
      }
      
    }

    
  }
  
  
  if (ShowWarning == true) {
        
    image(WarningAl, width/2, height/2, WarningAl.width*0.8, WarningAl.height*0.8);
    
    image(Danger, width/2 + 245, height*0.3, Danger.width*0.72, Danger.height*0.72);
    
    image(Danger, width/2 - 245, height*0.3, Danger.width*0.72, Danger.height*0.72);
  
  if (mouseIsPressed == true && mouseX >= 262 && mouseY >= 400 && mouseX <= 262 + 234 && mouseY <= 400 + 83) {
    
  LeftMenushow = false;
  DesplazamientoVentana = HALF_PI;
  ShowWarning = false;
    
  }
  
  if (mouseIsPressed == true && mouseX >= 532 && mouseY >= 400 && mouseX <= 532 + 234 && mouseY <= 400 + 83) {
    
  InicioCaminoAI = true;
  LeftMenushow = false;
  DesplazamientoVentana = HALF_PI;
  ShowWarning = false;
    
  }
    
  }
    
  
  if (InicioCaminoAI == true) {
    
    if (DirEstado == 4) {
  
  image(arrowImgDER, width/2, height*0.192, arrowImgDER.width*0.18, arrowImgDER.width*0.18);
    
  } else if (DirEstado == 0) {
  
  image(arrowImgIZQ, width/2, height*0.192, arrowImgIZQ.width*0.18, arrowImgIZQ.width*0.18);
    
  } else if (DirEstado == 3) {
  
  image(arrowImgDER45, width/2, height*0.192, arrowImgDER45.width*0.27, arrowImgDER45.width*0.27);
      
  } else if (DirEstado == 1) {
  
  image(arrowImgIZQ45, width/2, height*0.192, arrowImgIZQ45.width*0.27, arrowImgIZQ45.width*0.27);
        
  } else if (DirEstado == 2) {
  
  image(arrowImg, width/2, height*0.192, arrowImg.width*0.27, arrowImg.height*0.27);
          
  }
  
  push();
  
  tint(255, 255, 255, TranslucidoCAR);
  
  if (DirEstado == 4) {
  
  image(arrowImgDER2, width/2, height*0.192, arrowImgDER2.width*0.18, arrowImgDER2.width*0.18);
    
  } else if (DirEstado == 0) {
  
  image(arrowImgIZQ2, width/2, height*0.192, arrowImgIZQ2.width*0.18, arrowImgIZQ2.width*0.18);
    
  } else if (DirEstado == 3) {
  
  image(arrowImgDER452, width/2, height*0.192, arrowImgDER452.width*0.27, arrowImgDER452.width*0.27);
      
  } else if (DirEstado == 1) {
  
  image(arrowImgIZQ452, width/2, height*0.192, arrowImgIZQ452.width*0.27, arrowImgIZQ452.width*0.27);
        
  } else if (DirEstado == 2) {
  
  image(arrowImg2, width/2, height*0.192, arrowImg2.width*0.27, arrowImg2.height*0.27);
          
  }
  
  pop();
    
  } else {
    
  push();
  
  tint(255, 255, 255, TranslucidoCAR + 35);
    
  image(NoPath, width/2, height*0.195, NoPath.width*0.65, NoPath.height*0.65);
    
  pop();
    
  }

}

function drawCircles(x, y, distances) {
  noStroke();
  fill(148, 212, 255); // Color blanco para los círculos

  for (let i = 0; i < distances.length; i++) {
    // Mapeamos la distancia del rango [0, 1200] al rango [20, 120]
    let d = map(distances[i], 0, 1200, 35, 96);

    let angle = map(i, 0, distances.length, -HALF_PI, TWO_PI - HALF_PI);

    // Calculamos las coordenadas x e y del círculo
    let cx = x + cos(angle) * d;
    let cy = y + sin(angle) * d;

    // Dibujamos el círculo
    ellipse(cx, cy, 2, 2);
  }
}

function drawEllipticalPillars(x, y, width, height, distances, minIndex, maxIndex) {
  noStroke();
  fill(148, 212, 255, 50); // Color blanco para los círculos y rectángulos

  let totalCircles = distances.length;

  for (let i = 0; i < totalCircles; i++) {
    // Si el índice está en el rango excluido, lo saltamos
    if (i >= minIndex && i <= maxIndex) {
      continue; // Salta esta iteración
    }

    // Calculamos el ángulo en radianes para distribuir los círculos uniformemente
    let angle = map(i, 0, totalCircles, -HALF_PI, TWO_PI - HALF_PI);

    // Calculamos las coordenadas x e y en la elipse
    let cx = x + cos(angle) * (width / 2); // Ancho de la elipse
    let cy = y + sin(angle) * (height / 2); // Alto de la elipse

    // Mapeamos el valor de extrusión para simular la altura
    let extrusion = map(distances[i], 0, 1200, 0, 60);

    // Dibujamos la elipse inferior (base)
    ellipse(cx, cy, 5, 5);

    // Dibujamos el rectángulo que conecta la elipse inferior con la superior
    rect(cx - 2.5, cy - extrusion, 5, extrusion);

    // Dibujamos la elipse superior (punto final de la extrusión)
    ellipse(cx, cy - extrusion, 5, 5);
  }
}

function mousePressed() {

  if (dist(width*0.1263, height*0.712, mouseX, mouseY) <= 70) {
    
    window.open("https://adriannf2005.github.io/Alstral-AI-Maps/", "_blank");
    
  }
  
  if (RightMenushowANT == true && RightMenushow == true) {
    
    if (mouseX < width - RightMenu.width || mouseY < height*0.52 - RightMenu.height/2 || mouseY > height*0.52 + RightMenu.height/2) {
    
    RightMenushow = false;
      
    }
    
  }
  
  if (dist(mouseX, mouseY, width*0.65, height*0.1236) < LEDBUTTON.width * 0.34) {
    
    if (RightMenushowANT == false && RightMenushow == false && LeftMenushowANT == false && LeftMenushow == false) {
        
        RightMenushow = true;
      
        DesplazamientoVentana = 0;
        
    }
    
  }
  
  if (dist(mouseX, mouseY, width*0.782, height*0.1236) < AIGIF.height * 0.2) {
    
    if (LeftMenushowANT == false && LeftMenushow == false && RightMenushowANT == false && RightMenushow == false) {
        
        LeftMenushow = true;
      
        DesplazamientoVentana = 0;
        
    }
    
  }
  
  // Detectar si se ha pulsado el botón circular
  if (dist(mouseX, mouseY, 50, 50) < MICICON.height * 0.5) {
    if (isSpeaking) { // Si el bot está hablando, lo interrumpimos
      cancelSpeech();
    }
    startSpeechRecognition(); // Iniciamos la escucha inmediatamente
  }
  
  if (PantallaInicio == true) {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    //fullscreen(true);
    PantallaInicio = false;
  }
  }
  
  if (mouseX > width*0.58 - (FOWARD.width*0.27/2) && mouseX < width*0.58 + (FOWARD.width*0.27/2) && mouseY > height*0.92 - (FOWARD.height*0.27/2) && mouseY < height*0.92 + (FOWARD.height*0.27/2) && Foward == false && FowardANT == false) {
    //fullscreen(true);
    Foward = true;
  }
  
  if (mouseX > width*0.43 - (FOWARD.width*0.27/2) && mouseX < width*0.43 + (FOWARD.width*0.27/2) && mouseY > height*0.92 - (FOWARD.height*0.27/2) && mouseY < height*0.92 + (FOWARD.height*0.27/2) && Foward == true && FowardANT == true) {
    //fullscreen(true);
    Foward = false;
  }
  
}

function gotSpeech() {
  if (speechRec.resultValue && !isSpeaking) { // Solo procesamos cuando no estamos hablando
    saidText = speechRec.resultString;
    handleSpeechInput(saidText);
  }
}

function handleSpeechInput(inputText) {
  const userMessage = inputText.trim();
  chatHistory.push({ message: userMessage, isUser: true });

  // Simulate bot response
  addBotResponse("Processing your input...");

  // Esperar a que termine de hablar antes de hacer una nueva petición
  getChatResponse(userMessage)
    .then((response) => {
      addBotResponse(response);
      speakResponse(response);
    })
    .catch((error) => addBotResponse("Error processing your request."));
}

function addBotResponse(message) {
  chatHistory.push({ message, isUser: false });
}

async function getChatResponse(userInput) {
  const proxyURL = "https://replicate-api-proxy.glitch.me/create_n_get/";
  const data = {
    modelURL: "https://api.replicate.com/v1/models/meta/meta-llama-3-70b-instruct/predictions",
    input: {
      prompt: userInput,
      max_tokens: 999,
      max_length: 999,
      temperature: 0.9,
      top_p: 0.9,
    },
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  };

  const raw_response = await fetch(proxyURL, options);
  const json_response = await raw_response.json();
  return json_response.output.join("").trim();
}

function speakResponse(responseText) {
  textochunks = splitText(responseText, 40); // Dividimos el texto en chunks de máximo 40 palabras
  isSpeaking = true;
  speech.speak(textochunks[0]);
  frasesAdecir = 1;
}

function splitText(text, wordLimit) {
  let words = text.split(' ');
  let chunks = [];
  for (let i = 0; i < words.length; i += wordLimit) {
    chunks.push(words.slice(i, i + wordLimit).join(' '));
  }
  return chunks;
}


function speechEnded() {
  //console.log("La síntesis ha terminado.");
  speechRec.start(true, false); // Reiniciamos la escucha
}


function vozFin() {
  
  if (frasesAdecir < textochunks.length && textochunks != undefined) {
    
      console.log("textochunks: " + textochunks);
   console.log("textochunks.length: " + textochunks.length);
    
      console.log("textochunks[frasesAdecir]: " + textochunks[frasesAdecir]);
      speech.speak(textochunks[frasesAdecir]);
  
  frasesAdecir = frasesAdecir + 1;
      
  } else {
    
    frasesAdecir = 0;
    frasesAdecirANT = 0;
      isSpeaking = false;
      isRecognizing = false; // Desactivar la escucha
      textochunks = undefined;
  }
  
}

function drawDashedLineAnimated(x1, y1, x2, y2, thickness, dashLength, gapLength, phase) {
  // Configurar grosor de la línea
  
  push();
  strokeWeight(thickness);
  stroke(255); // Color blanco por defecto
  noFill();

  // Calcular la longitud total de la línea
  let totalLength = dist(x1, y1, x2, y2);

  // Vector dirección normalizado entre los puntos
  let dirX = (x2 - x1) / totalLength;
  let dirY = (y2 - y1) / totalLength;

  // Fase inicial para el movimiento de los segmentos
  let offset = phase % (dashLength + gapLength);

  let currentPosition = -offset; // Comenzamos con un desplazamiento inicial
  while (currentPosition < totalLength) {
    // Coordenadas iniciales del segmento
    let startX = x1 + max(0, currentPosition) * dirX;
    let startY = y1 + max(0, currentPosition) * dirY;

    // Coordenadas finales del segmento
    let endX = x1 + min(totalLength, currentPosition + dashLength) * dirX;
    let endY = y1 + min(totalLength, currentPosition + dashLength) * dirY;

    // Dibujar el segmento si está visible
    if (currentPosition + dashLength > 0) {
      line(startX, startY, endX, endY);
    }

    // Avanzamos al siguiente segmento
    currentPosition += dashLength + gapLength;
  }
  
  pop();
  
}

function constrainToCircle(x, y, centerX, centerY, minRadius, maxRadius) {
  // Calcular la distancia desde el punto al centro
  let distance = dist(x, y, centerX, centerY);

  // Si está fuera del rango permitido, ajustar la posición
  if (distance < minRadius) {
    // Colocar en el límite mínimo
    let angle = atan2(y - centerY, x - centerX);
    x = centerX + cos(angle) * minRadius;
    y = centerY + sin(angle) * minRadius;
  } else if (distance > maxRadius) {
    // Colocar en el límite máximo
    let angle = atan2(y - centerY, x - centerX);
    x = centerX + cos(angle) * maxRadius;
    y = centerY + sin(angle) * maxRadius;
  }

  // Devolver los valores ajustados
  return { x, y };
}

function drawArrow(x, y, size, angle) {
  push();
  translate(x, y); // Mover el origen al punto dado
  rotate(radians(angle)); // Rotar la flecha según el ángulo

  // Dibujar la flecha con 7 líneas
  let arrowHeight = size; // Altura de la flecha
  let arrowWidth = size / 4; // Ancho de la parte inferior
  let curveFactor = size / 2; // Factor de curvatura para las líneas
  
  stroke(255);
  strokeWeight(2);
  noFill();

  // Parte principal de la flecha (cuerpo)
  beginShape();
  vertex(0, 0); // Base
  bezierVertex(-arrowWidth, -arrowHeight / 3, -arrowWidth, -2 * arrowHeight / 3, 0, -arrowHeight);
  bezierVertex(arrowWidth, -2 * arrowHeight / 3, arrowWidth, -arrowHeight / 3, 0, 0);
  endShape();

  // Flecha izquierda
  beginShape();
  vertex(0, -arrowHeight);
  vertex(-arrowWidth, -arrowWidth)
}

function drawCircleWithLetters(radius, angle) {
  // Posiciones relativas de las letras en el círculo
  let positions = [
    { letter: 'N', x: 0, y: -radius },
    { letter: 'E', x: radius, y: 0 },
    { letter: 'S', x: 0, y: radius },
    { letter: 'W', x: -radius, y: 0 }
  ];

  // Dibujar las letras en sus posiciones, aplicando la rotación al círculo
  push();
  rotate(radians(angle)); // Rotar el círculo
  for (let pos of positions) {
    push();
    translate(pos.x, pos.y); // Posicionar cada letra en el círculo
    rotate(-radians(angle)); // Compensar la rotación del círculo para las letras
    stroke(0);
    fill(255, 200, 20);
    textSize(16);
    text(pos.letter, 0, 0); // Dibujar la letra
    pop();
  }
  pop();
}

function generateRandomCoordinate(base) {
  let antepenultimo = floor(random(2, 5)); // Random entre 2 y 4
  let penultimo = floor(random(4, 9)); // Random entre 4 y 8
  let ultimo = floor(random(0, 10)); // Random entre 0 y 9

  // Formamos los decimales con los valores generados
  let randomDecimals = `${antepenultimo}${penultimo}${ultimo}`;
  return `${base}${randomDecimals}`; // Añadimos los decimales al final del valor base
}
