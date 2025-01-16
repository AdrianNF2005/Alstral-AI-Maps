
let api_key = "sm_caSfU5o-mpydXtRkZkYauqbwityo9WviH1NMwhzI";

  let url = `https://positioning.hereapi.com/v2/locate?apiKey=${api_key}`;

  let payload = {
    wlan: [
      {
        mac: "00:21:1B:EA:FC:63"
      },
      {
        mac: "00:21:1B:EA:FC:61"
      }
    ]
  };

let IntervaloCoord = 30000;

let LogoSV;

let AlstralLogo;

let IconoITA;

let CargandoANM;

let Fade1ANM = 0;

let stars = [];

let Earth;

let Texture;

let Fondo;

let Prohibido;

let Fade2ANM = 0;

let Fade3ANM = 0;

let Rotacion = -1;

let myMap;
let canvas;
let mappa = new Mappa('Leaflet');
let data;

var latitudeUSER = 0;
var longitudeUSER = 0;

let OpenMap = false;

let latitudeMAC = 0;
let longitudMAC = 0;

let options;

let movile = false;

let Brillo = 0;

let transparency = 0;

let transparencySubida = true;

async function get_position_data() {

  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      let data = await response.json();
      console.log(data);
      latitudeMAC = data.location.lat;
      longitudMAC = data.location.lng;
      console.log("Ubicación del dispositivo MAC:");
      console.log("Latitud: " + latitudeMAC);
      console.log("Longitud: " + longitudMAC);
      // Handle the response data here
    } else {
      let errorMessage = await response.text();
      console.error(`HTTP error: ${response.status}\n${errorMessage}`);
      //console.log("Esperando datos");
    }
  } catch (error) {
     console.error(error);
  }
}

function gotLocation() {
  // Retrieve the latitude and longitude  
  console.log("LatitudeUSER: " + latitudeUSER);
  console.log("LongitudeUSER: " + longitudeUSER);
  
   options = {
  lat: latitudeUSER,
  lng: longitudeUSER,
  zoom: 20,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}
  
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas);
  
}

function locationError(error) {
  console.log("Error retrieving location: " + error.message);
  
  image(Prohibido, 0, 0, Prohibido.width*height*0.0019, Prohibido.height*height*0.0019);
  
  image(UbicacionERROR, 0, -height*0.36, UbicacionERROR.width*height*0.00024, UbicacionERROR.height*height*0.00024);
  
  image(TextERROR, 0, height*0.3, width, width/TextERROR.width*TextERROR.height);
  
}

function preload() {
  
  Earth = loadModel("Assets/Earth 3D.obj", true);
  
  AlstralLogo = loadImage("Assets/Logo Astral Motion.png");
  
  LogoSV = loadImage("Assets/Logo San Valero.png");
  
  IconoITA = loadImage("Assets/Icono ITA.png");

  Texture = loadImage("Assets/Earth texture small.png");

  Fondo = loadImage("Assets/Fondo space.jpg");
  
  Ubicacion = loadImage("Assets/Ubicacion.png");
  
  Ubicacion2 = loadImage("Assets/Ubicacion2.png");
  
  MACIcon = loadImage("Assets/MAC.png");
  
  UbicacionERROR = loadImage("Assets/UbicacionERROR.png");
  
  TextERROR = loadImage("Assets/Advertencia GPS.png");
  
  Prohibido = loadImage("Assets/Prohibido.png");
  
  Leyenda = loadImage("Assets/Leyenda2.png");
  
}

function setup() {
  background(0);
  
  frameRate(60);
  
  canvas = createCanvas(1024, 600, WEBGL);

  // Crea el objeto de video y carga el archivo MP4
  CargandoANM = createVideo("Assets/Animacion de inicio.mp4");
  CargandoANM.hide(); // Oculta el elemento de video por defecto

  CargandoANM.volume(0);

  CargandoANM.play();

  imageMode(CENTER);

  noStroke();
  
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

      movile = true; 
        
    } 

  // Crear las estrellas iniciales
  for (let i = 0; i < 5; i++) {
    createStar();
  }
  
  textAlign(CENTER, CENTER);
}

// setInterval(ReadMAClocation, IntervaloCoord);

function draw() {
  
  if (OpenMap == false) {
  if (Fade1ANM < 255) {
    background(0);

    if ((width / CargandoANM.width) * CargandoANM.height <= height) {
      image(
        CargandoANM,
        0,
        0,
        width,
        (width / CargandoANM.width) * CargandoANM.height
      );
    } else {
      image(
        CargandoANM,
        0,
        0,
        (height / CargandoANM.height) * CargandoANM.width,
        height
      );
    }
    
    image(AlstralLogo, 20, - height*0.39, AlstralLogo.width*0.12, AlstralLogo.height*0.12);

    let DuracionTotal = CargandoANM.duration();

    let TiempoVideo = CargandoANM.time();

    if (TiempoVideo >= DuracionTotal * 0.75) {
      Fade1ANM = map(TiempoVideo, DuracionTotal * 0.75, DuracionTotal, 0, 255);
    }

    fill(0, 0, 0, Fade1ANM);

    rect(-width / 2, -height / 2, width, height);
  } else {
    background(0);
    
    if (movile == true) {
        
      Fade2ANM = 255;
      
      Fade3ANM = 255;
        
    }

    if (Fade2ANM >= 255) {
      push();

      tint(255, 255, 255, Fade3ANM);
      
      if (width <= (height / Fondo.height) * Fondo.width) {

      image(Fondo, 0, 0, (height / Fondo.height) * Fondo.width, height);
      
      } else {
        
      image(Fondo, 0, 0, width, (width / Fondo.width) * Fondo.height); 
        
      }

      pop();

      if (Fade3ANM < 255) {
        Fade3ANM = Fade3ANM + 60 / frameRate();

        Rotacion = sin(map(Fade3ANM, 0, 255, -HALF_PI, HALF_PI));
      }
    }

    // Dibujar todas las estrellas
    for (let i = 0; i < stars.length; i++) {
      stars[i].display();
    }

    // Crear una nueva estrella aleatoriamente si hay menos de 20 estrellas
    if (stars.length < 50) {
      createStar();
    }

    if (stars.length >= 50) {
      push();
      tint(255, 255, 255, Fade2ANM);
      stroke(0, 255, 0);
      strokeWeight(0);
      rotateZ(PI);
      rotateY(map(Rotacion, -1, 1, -HALF_PI * 0.5, -HALF_PI * 0.06));
      rotateX(map(Rotacion, -1, 1, 0, HALF_PI * 0.45));
      scale(map(Rotacion, -1, 1, 1, 4.6));
      texture(Texture);
      model(Earth);
      pop();

      if (Fade2ANM < 255) {
        Fade2ANM = Fade2ANM + 120 / frameRate();
      }

      if (Fade3ANM >= 255) {
        
        OpenMap = true;
        
      latitudeUSER = 41.6695837576979;
      longitudeUSER = -0.8789197769670976;

      gotLocation();
        
      }
    }
  }
  } else {
    
    scale(1);
    
    rotateZ(0);
    rotateY(0);
    rotateX(0);
    
    if (options != undefined) {
    
    //console.log(options);

    myMap.onChange(callbackFunction);
    
    }
    
  }
  
}

function createStar() {
  let x = random(-width / 2, width - width / 2);
  let y = random(-height / 2, height - height / 2);
  let size = random(1, 4)/displayDensity(); // Ajustar el tamaño según la densidad de píxeles
  let fadeSpeed = random(3, 5); // Velocidad de desvanecimiento

  let star = {
    x: x,
    y: y,
    size: size,
    alpha: 0, // Valor inicial de transparencia
    fadeSpeed: fadeSpeed, // Velocidad de desvanecimiento

    display: function () {
      this.alpha += this.fadeSpeed; // Aumentar gradualmente la transparencia

      fill(255, this.alpha); // Establecer el valor de transparencia
      noStroke();
      ellipse(this.x, this.y, this.size, this.size);

      // Reiniciar el fade si la estrella se desvanece por completo
      if (this.alpha >= 255) {
        this.alpha = 255;
      }
    },
  };

  stars.push(star);
  
}

function callbackFunction(){
  // Clear the canvas
  clear();
	
      // Only draw them if the position is inside the current map bounds. We use a
      // Leaflet method to check if the lat and lng are contain inside the current
      // map. This way we draw just what we are going to see and not everything. See
      // getBounds() in http://leafletjs.com/reference-1.1.0.html
  
    //Coordenadas del centro ITAINNOVA
  
        if (myMap.map.getBounds().contains({lat: 41.66975644456505, lng: -0.8788799868027641 })) {
        // Transform lat/lng to pixel position
		let la = myMap.latLngToPixel(41.66975644456505, -0.8788799868027641 );
        image(IconoITA, la.x - width/2, la.y - height/2, IconoITA.width*height*0.00008, IconoITA.height*height*0.00008);

      }
  
    //Coordenadas del dispositivo
			
      if (myMap.map.getBounds().contains({lat: latitudeMAC, lng: longitudMAC})) {
        // Transform lat/lng to pixel position
				let la = myMap.latLngToPixel(latitudeMAC, longitudMAC);
  
      image(MACIcon, la.x - width/2, la.y - height/2, MACIcon.width*height*0.0002, MACIcon,height*height*0.0002);
        
      }
  
  //Mis coordenadas
			
      if (myMap.map.getBounds().contains({lat: options.lat, lng: options.lng})) {
        // Transform lat/lng to pixel position
				let la = myMap.latLngToPixel(options.lat, options.lng);
  
      image(Ubicacion2, la.x - width/2, la.y - height/2, Ubicacion2.width*height*0.0002, Ubicacion2.height*height*0.0002);
        
      if (transparencySubida == true) {
        
        transparency = transparency + 1;
        
        if (transparency >= 200) {
            
            transparencySubida = false;
            
        }
        
      } else {
        
        transparency = transparency - 1;
        
        if (transparency <= 0) {
            
            transparencySubida = true;
            
        }
        
      }
        
      push();
        
      tint(255, 255, 255, transparency);
        
      image(Ubicacion, la.x - width/2, la.y - height/2, Ubicacion.width*height*0.0002, Ubicacion.height*height*0.0002);
        
      pop();
        
      }
  
    image(LogoSV, width/2-(LogoSV.width*height*0.00021) + 130, height*0.05 -height/2 + 3, LogoSV.width*height*0.00019, LogoSV.height*height*0.00019);
  
    if (Leyenda.width*height*0.0003 >= width) {
  
      image(Leyenda, 0, height*0.45, width, width/Leyenda.width*Leyenda.height);
  
    } else {
      
      image(Leyenda, 0, height*0.43, Leyenda.width*height*0.00042, Leyenda.height*height*0.00042);
      
    }

}

function ReadMAClocation() { // no funciona, no preocuparse desabilitada
  
    get_position_data();
  
}
