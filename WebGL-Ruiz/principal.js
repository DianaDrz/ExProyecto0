var camera, scene, renderer;//camara
var clock;
var mapaSize = 1000;//mapa var
// camara vista con el mause
var controles;
var controlesEnabled = false;

// velocidad
var personajeVelocidad = new THREE.Vector3();
const VELOCIDAD = 800.0;
var colisionObjetos = []//colision
var bloqueo = document.getElementById('bloqueo');


function init() {
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    scene.color = new THREE.Color(0xAED6F1);
    // configuraciones de la renderizacion
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(scene.color);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //contenedor de html 
    var contenedor = document.getElementById('contenedor');
    contenedor.appendChild(renderer.domElement);
    //  posicion de la camara
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.y = 20; 
    camera.position.x = 0;
    camera.position.z = 0;
    scene.add(camera);//adicionando camara a la escena
    //contorles 
    controles = new THREE.PointerLockControls(camera);
    scene.add(controles.getObject());
    //----------------- FUCNIONES DE LOS OBJETOS
    luz();
    pisoEscena();
    techoEscena();
    plano();
    movimientoPersona();
    puertas();
    pisomadera();
    pizarras();
    mesas();
    mesasOficina();
    mesasOficina2();
    mesasOf();
    mesaslbo();
    libreros();
    monitor();
    monitorOf();
    sillaOf();
    //creaMesas();
    window.addEventListener('resize', onWindowResize, false);

}
init();
animate();
getPointerLock();
function luces(x, z) {
    var light = new THREE.PointLight(0xffffff, 1, 200);
    light.position.set(x, 50, z);
    scene.add(light);
}
function luz() {
    var light = new THREE.AmbientLight(0x404040); 
    scene.add(light);
    //focos laboratorio
    luces(-400, 100);
    luces(-220, 100);
    
    luces(-400, -20);
    luces(-220, -20);

    luces(-400, -170);
    luces(-220, -170);
    //lucess oficina
    luces(-50, 65);
    luces(-40, 200);
    luces(70, 100);
    //lucess aula
    luces(240, 190);
    luces(-100, -90);
    luces(160, -90);
    luces(120, -250);
    luces(-40, -270);

}
function pisoEscena() {
    var pisoGeo = new THREE.PlaneGeometry(46 * 20, 39 * 20);
    var material2 = new THREE.MeshPhongMaterial({ color: 0xA0522D, side: THREE.DoubleSide });
    var piso = new THREE.Mesh(pisoGeo, material2);
    piso.material.side = THREE.DoubleSide;
    piso.position.set(0, 1, 0);
    piso.rotation.x = degreesToRadians(90);
    scene.add(piso);
}

function techoEscena() {
    var techoGeo = new THREE.PlaneGeometry(46 * 20, 39 * 20);
    var material3 = new THREE.MeshPhongMaterial({ color: 0xFDEDEC, side: THREE.DoubleSide });
    var techo = new THREE.Mesh(techoGeo, material3);
    techo.position.set(0, 60, 0);
    techo.rotation.x = degreesToRadians(90);
    scene.add(techo);
}
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}
function inicializaCubo() {

          /**
           *       3 --------- 2
           *       /|        /|   
           *      / |       / |
           *    7 --------- 6 |
           *     |  |      |  |
           *     | 0 ------|-- 1 
           *     | /       | /
           *     |/        |/
           *    4 --------- 5  
           */

          /* Las coordenadas cartesianas (x, y) */
          var vertices = [
             // Frente
             -1, -1,  1, // 4   0
              1, -1,  1, // 5   1
              1,  1,  1, // 6   2
             -1,  1,  1, // 7   3
             // Atrás
             -1,  1, -1, // 3   4
              1,  1, -1, // 2   5
              1, -1, -1, // 1   6
             -1, -1, -1, // 0   7
             // Izquierda
             -1, -1, -1, // 0   8
             -1, -1,  1, // 4   9
             -1,  1,  1, // 7  10 
             -1,  1, -1, // 3  11
             // Derecha
              1, -1,  1, // 5  12 
              1, -1, -1, // 1  13
              1,  1, -1, // 2  14
              1,  1,  1, // 6  15
              // Abajo
             -1, -1, -1, // 0  16
              1, -1, -1, // 1  17
              1, -1,  1, // 5  18
             -1, -1,  1, // 4  19
              // Arriba
             -1,  1,  1, // 7  20
              1,  1,  1, // 6  21
              1,  1, -1, // 2  22
             -1,  1, -1  // 3  23
          ];

          /* Los colores x c/vértice (r,g,b,a) */
          var colores = [
             // Frente - lila
              1, 0, 1, 1, // 4   0
              1, 0, 1, 1, // 5   1
              1, 0, 1, 1, // 6   2
              1, 0, 1, 1, // 7   3  
             // Atrás - amarillo
              1, 1, 0, 1, // 3   4  
              1, 1, 0, 1, // 2   5
              1, 1, 0, 1, // 1   6  
              1, 1, 0, 1, // 0   7  
             // Izquierda - celeste
              0, 1, 1, 1, // 0   8
              0, 1, 1, 1, // 4   9
              0, 1, 1, 1, // 7  10
              0, 1, 1, 1, // 3  11
             // Derecha - rojo
              1, 0, 0, 1, // 5  12
              1, 0, 0, 1, // 1  13
              1, 0, 0, 1, // 2  14
              1, 0, 0, 1, // 6  15
             // Abajo - azul
              0, 0, 1, 1, // 0  16
              0, 0, 1, 1, // 1  17
              0, 0, 1, 1, // 5  18
              0, 0, 1, 1, // 4  19
             // Arriba - verde
              0, 1, 0, 1, // 7  20
              0, 1, 0, 1, // 6  21
              0, 1, 0, 1, // 2  22
              0, 1, 0, 1  // 3  23
          ];

          /* Indices */
          var indices = [ 
              0,  1,  2,  0,  2,  3, // Frente
              4,  5,  6,  4,  6,  7, // Atrás
              8,  9, 10,  8, 10, 11, // Izquierda 
             12, 13, 14, 12, 14, 15, // Derecha
             16, 17, 18, 16, 18, 19, // Abajo
             20, 21, 22, 20, 22, 23  // Arriba
          ];

          /* Se crea el objeto del arreglo de vértices (VAO) */
          cuboVAO = gl.createVertexArray();

          /* Se activa el objeto */
          gl.bindVertexArray(cuboVAO);


          /* Se genera un nombre (código) para el buffer */ 
          var verticeBuffer = gl.createBuffer();

          /* Se asigna un nombre (código) al buffer */
          gl.bindBuffer(gl.ARRAY_BUFFER, verticeBuffer);
         
          /* Se transfiere los datos desde la memoria nativa al buffer de la GPU */
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

          /* Se habilita el arreglo de los vértices (indice = 0) */
          gl.enableVertexAttribArray(0);

          /* Se especifica el arreglo de vértices */
          gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);


          /* Se genera un nombre (código) para el buffer */ 
          var colorBuffer = gl.createBuffer();

          /* Se asigna un nombre (código) al buffer */
          gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
         
          /* Se transfiere los datos desde la memoria nativa al buffer de la GPU */
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);

          /* Se habilita el arreglo de los colores (indice = 1) */
          gl.enableVertexAttribArray(1);

          /* Se especifica el arreglo de colores */
          gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);


          /* Se genera un nombre (código) para el buffer */
          var indiceBuffer = gl.createBuffer();

          /* Se asigna un nombre (código) al buffer */
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indiceBuffer);

          /* Se transfiere los datos desde la memoria nativa al buffer de la GPU */
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


          /* Se desactiva el objeto del arreglo de vértices */
          gl.bindVertexArray(null);

          /* Se deja de asignar un nombre (código) al buffer */
          gl.bindBuffer(gl.ARRAY_BUFFER, null);

          /* Se deja de asignar un nombre (código) al buffer */
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        }

        /***************************************************************************/
        /* Paso 4: Se renderizan los objetos                                       */
        /***************************************************************************/
        function dibujaCubo() {

          /* Se activa el objeto del arreglo de vértices */
          gl.bindVertexArray(cuboVAO);

          /* Renderiza las primitivas desde los datos de los arreglos (vértices,
           * colores e indices) */
          gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

          /* Se desactiva el objeto del arreglo de vértices */
          gl.bindVertexArray(null);

        }

        function dibuja() {

          /* Define la Matriz de Proyección */
          if (document.getElementById('opcion1').checked) {
            ortho(MatrizProyeccion, -10, 10, -10, 10, 2, 100);
          } else if (document.getElementById('opcion2').checked) {
            perspective(MatrizProyeccion, 60, 1, 2, 100);
          } else if (document.getElementById('opcion3').checked) {
            frustum(MatrizProyeccion, -10, 10, -10, 10, 2, 100);
          }
          gl.uniformMatrix4fv(uMatrizProyeccion, false, MatrizProyeccion);

          /* Inicializa el buffer de color y de profundidad */
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

          /* Matriz del Modelo */
          identidad(MatrizModelo);
          traslacion(MatrizModelo, 0, 0, -10);
          rotacionY(MatrizModelo, rotX);
          rotacionX(MatrizModelo, rotY);
          escalacion(MatrizModelo, 0.5, 0.5, 0.5);
          gl.uniformMatrix4fv(uMatrizModelo, false, MatrizModelo);

          /* Dibuja el Piso */
          piso.dibuja(gl);

          /* Dibuja el Cubo */
          dibujaCubo();

          /* Solicita que el navegador llame nuevamente a dibuja */
          requestAnimationFrame(dibuja);

        }
function plano() {
    const ancho = 20;const alto = 20;
    const mapa = [
        //columanas primera 
        [1, 1, 4, 4, 1, 4, 4, 1, 1, 4, 4, 1, 4, 4, 1, 1, 1, 1, 4, 4, 1, 4, 4, 1, 1, 4, 4, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        //columanas primera pared y demension de la primera
        [1, 5, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 5, 1, 5, 2, 2, 2, 2, 2, 5, 5, 2, 2, 2, 2, 2, 2, 5, 1, 1, 1, 1, 1, 1, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 1, 5, 2, 2, 2, 2, 2, 5, 5, 2, 2, 2, 2, 2, 2, 5, 1, 1, 1, 1, 1, 1, 1],
        //pared de medioderecho
        [1, 5, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 4, 4, 4, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2],
        //pasilo
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2],          
        //dimension de la segunda aulas- oficinas
        [1, 5, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1],
        //columnas 
        [1, 5, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 5, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1],
        //pared de fuera iqzuierda
        [1, 1, 1, 4, 4, 1, 4, 4, 1, 1, 4, 1, 4, 4, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 4, 4, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    ];

    // geometria y metarial de la pared
    var paredB = new THREE.BoxGeometry(ancho, alto, ancho);
    var paredAlta = new THREE.BoxGeometry(ancho, alto * 2, ancho);

    var paredGeoAltaVen = new THREE.BoxGeometry(ancho, alto / 2, ancho);
    
    var paredMat1 = new THREE.MeshPhongMaterial({color: 0x948F5D,});
    var paredMat2 = new THREE.MeshPhongMaterial({color: 0xF1E13F,});
    var pisoMaderaGeo = new THREE.BoxGeometry(ancho, 2, ancho);
    var texturemadera = new THREE.TextureLoader().load('im3.jpg');
    var pisoMaderaMat = new THREE.MeshPhongMaterial({ map: texturemadera });
    var c1 = new THREE.BoxGeometry(ancho, alto * 3, ancho);
    var c2 = new THREE.MeshPhongMaterial({
        color: 0xF1E13F,
    });
    var pisoaulaGeo = new THREE.BoxGeometry(ancho, 2, ancho);
    var textureaula = new THREE.TextureLoader().load('im3.jpg');
    var pisoaulaMat = new THREE.MeshPhongMaterial({ map: textureaula });

    const mapaFila = mapa.length;
    const mapaColumna = mapa[0].length;
    
    var posx = 0;
    var posz = 0;
    for (var i = 0; i < mapaFila; i++) {
        for (var j = 0; j < mapaColumna; j++) {
            posx = (j - mapaColumna / 2) * ancho;
            posz = (i - mapaFila / 2) * ancho;
            switch (mapa[i][j]) {
                case 1:
                    let paredbaja = new THREE.Mesh(paredB, paredMat1);
                    paredbaja.position.x = posx;
                    paredbaja.position.z = posz
                    paredbaja.position.y = alto / 2;
                    scene.add(paredbaja);//adicionando a la escena
                    colisionObjetos.push(paredbaja);
                    let paredalta = new THREE.Mesh(paredAlta, paredMat2);
                    paredalta.position.x = posx;
                    paredalta.position.z = posz
                    paredalta.position.y = ((alto * 2) / 2) + alto;
                    scene.add(paredalta);
                    break;
                case 2:
                    let pisoMadera = new THREE.Mesh(pisoMaderaGeo, pisoMaderaMat);
                    pisoMadera.position.x = posx;
                    pisoMadera.position.z = posz;
                    pisoMadera.position.y = 2 / 2;
                    scene.add(pisoMadera);
                   
                    break;
                case 3:
                    
                    break;
                case 4:
                    let paredbaja2 = new THREE.Mesh(paredB, paredMat1);

                    paredbaja2.position.x = posx;
                    paredbaja2.position.z = posz;
                    paredbaja2.position.y = alto / 2;
                    scene.add(paredbaja2);
                    colisionObjetos.push(paredbaja2);

                    let paredalta2 = new THREE.Mesh(paredGeoAltaVen, paredMat2);
                    paredalta2.position.x = posx;
                    paredalta2.position.z = posz;
                    paredalta2.position.y = ((10 * 1) / 2) + alto;

                    scene.add(paredalta2);
                    break;
                case 5:
                    let columna = new THREE.Mesh(c1, c2);
                    columna.position.x = posx;
                    columna.position.z = posz;
                    columna.position.y = (alto * 3) / 2;
                    scene.add(columna);
                    colisionObjetos.push(columna);

                    break;

                case 6:
                    let pisoaula = new THREE.Mesh(pisoaulaGeo, pisoaulaMat);
                    pisoaula.position.x = posx;
                    pisoaula.position.z = posz;
                    pisoaula.position.y = 2 / 2;
                    scene.add(pisoaula);

                    break;
            }

        }
    }
    // console.log(colisionObjetos.length)
}
// MOVIMIENTO CON TECLADO DE LA PERSONA 
//Movimietos
var movAdelante = false;
var movAtras = false;
var movIzquierda = false;
var movDerecha = false;
function movimientoPersona() {
    var onKeyDown = function (event) {
        switch (event.keyCode) {
            case 38: // adelante
            case 87: // w
                movAdelante = true;
                break;
            case 37: // izquierda
            case 65: // a
                movIzquierda = true;
                break;
            case 40: // abajo
            case 83: // s
                movAtras = true;
                break;
            case 39: // derecha
            case 68: // d
                movDerecha = true;
                break;
        }
    };
    // tecla deja da de presoinada
    var onKeyUp = function (event) {
        switch (event.keyCode) {
            case 38: // arriba
            case 87: // w
                movAdelante = false;
                break;
            case 37: // izquierda
            case 65: // a
                movIzquierda = false;
                break;
            case 40: // abajo
            case 83: // s
                movAtras = false;
                break;
            case 39: // dererecha
            case 68: // d
                movDerecha = false;
                break;
        }
    };
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
};

//Movimiento de la camara
function animatePersonaje(delta) {
    // console.log(delta)

    personajeVelocidad.x -= personajeVelocidad.x * 10.0 * delta;
    personajeVelocidad.z -= personajeVelocidad.z * 10.0 * delta;
    if (detectaColision() == false) {
        if (movAdelante) {
            personajeVelocidad.z -= VELOCIDAD * delta;
        }
        if (movAtras) {
            personajeVelocidad.z += VELOCIDAD * delta;
        }
        if (movIzquierda) {
            personajeVelocidad.x -= VELOCIDAD * delta;
        }
        if (movDerecha) {
            personajeVelocidad.x += VELOCIDAD * delta;
        }
        if (!(movAdelante || movAtras || movIzquierda || movDerecha)) {

            personajeVelocidad.x = 0;
            personajeVelocidad.z = 0;
        }
        controles.getObject().translateX(personajeVelocidad.x * delta);
        controles.getObject().translateZ(personajeVelocidad.z * delta);
    }
    else {
        personajeVelocidad.x = 0;
        personajeVelocidad.z = 0;
    }
}

// ============================= Desbloqueo

function getPointerLock() {
    document.onclick = function () {
        contenedor.requestPointerLock();
    }
    document.addEventListener('pointerlockchange', lockChange, false);
}
function lockChange() {
    if (document.pointerLockElement === contenedor) {
        // Oculta  blocker 
        bloqueo.style.display = "none";
        controles.enabled = true;

    } else {
        // Muestra blocker 
        bloqueo.style.display = "";
        controles.enabled = false;
    }
}

// render animacion

function render() {

    renderer.render(scene, camera);
}
function animate() {
    render();
    requestAnimationFrame(animate);

    var delta = clock.getDelta();
    animatePersonaje(delta);
}
/*
*************************************************************************************************
 * agregando objetos
/************************************************************************************************
*/
function pisar(ancho, grosor, x, z) {
    let tarimaGeo = new THREE.BoxGeometry(ancho, 16, grosor);
    let tarimaMat = new THREE.MeshPhongMaterial({ color: 0x784212, });
    let tarima = new THREE.Mesh(tarimaGeo, tarimaMat);
    tarima.position.x = x
    tarima.position.z = z
    tarima.position.y = 16 / 2
    scene.add(tarima)
    colisionObjetos.push(tarima);

}
function pisomadera() {
    pisar(30, 20 * 8, 240, -170)//labo
    pisar(20, 20 * 8, -93, -170)//lab basico
    pisar(20, 20 * 8, -93, 125)//lab basico
}


function pizarras() {
    let texture = new THREE.TextureLoader().load('im1.jpg');
    let mat = new THREE.MeshPhongMaterial({ map: texture });
    let geo = new THREE.BoxGeometry(3, 25, 60 * 2);

    let p1 = new THREE.Mesh(geo, mat);
    p1.position.set(-80, 35, -170);
    scene.add(p1)
    let p2 = new THREE.Mesh(geo, mat);
    p2.position.set(-80, 35, 125);
    scene.add(p2)
    let p3 = new THREE.Mesh(geo, mat);
    p3.position.set(240, 35, -170);
    scene.add(p3)
}

function mesas() {
    let texture = new THREE.TextureLoader().load('im7.jpg');
    let mat = new THREE.MeshPhongMaterial({ map: texture });
    let geo = new THREE.BoxGeometry(20, 25, 40 * 2);
    //mesas lado izquierdo
    let p1 = new THREE.Mesh(geo, mat);
    p1.position.set(-180, 6, 190);
    scene.add(p1)
    colisionObjetos.push(p1);
    let p2 = new THREE.Mesh(geo, mat);
    p2.position.set(-230, 6, 190);
    scene.add(p2)
    colisionObjetos.push(p2);
    let p3 = new THREE.Mesh(geo, mat);
    p3.position.set(-280, 6, 190);
    scene.add(p3)
    colisionObjetos.push(p3);
    let p4 = new THREE.Mesh(geo, mat);
    p4.position.set(-330, 6, 190);
    scene.add(p4)
    colisionObjetos.push(p4);
    //mesas de medio
    let p5 = new THREE.Mesh(geo, mat);
    p5.position.set(-180, 6, 60);
    scene.add(p5)
    colisionObjetos.push(p5);
    let p6 = new THREE.Mesh(geo, mat);
    p6.position.set(-230, 6, 60);
    scene.add(p6)
    colisionObjetos.push(p6);
    let p7 = new THREE.Mesh(geo, mat);
    p7.position.set(-280, 6, 60);
    scene.add(p7)
    colisionObjetos.push(p7);
    let p8 = new THREE.Mesh(geo, mat);
    p8.position.set(-330, 6, 60);
    scene.add(p8)
    colisionObjetos.push(p8);
    //mesas lado derecho
    let p9 = new THREE.Mesh(geo, mat);
    p9.position.set(-180, 6, -240);
    scene.add(p9)
    colisionObjetos.push(p9);
    let p10 = new THREE.Mesh(geo, mat);
    p10.position.set(-230, 6, -240);
    scene.add(p10)
    colisionObjetos.push(p10);
    let p11 = new THREE.Mesh(geo, mat);
    p11.position.set(-280, 6, -240);
    scene.add(p11)
    colisionObjetos.push(p11);
    let p12 = new THREE.Mesh(geo, mat);
    p12.position.set(-330, 6, -240);
    scene.add(p12)
    colisionObjetos.push(p12);
    //mesas de medio
    let p14 = new THREE.Mesh(geo, mat);
    p14.position.set(-180, 6, -110);
    scene.add(p14)
    colisionObjetos.push(p14);
    let p15 = new THREE.Mesh(geo, mat);
    p15.position.set(-230, 6, -110);
    scene.add(p15)
    colisionObjetos.push(p15);
    let p16 = new THREE.Mesh(geo, mat);
    p16.position.set(-280, 6, -110);
    scene.add(p16)
    colisionObjetos.push(p16);
    let p17 = new THREE.Mesh(geo, mat);
    p17.position.set(-330, 6, -110);
    scene.add(p17)
    colisionObjetos.push(p17);

    let p18 = new THREE.Mesh(geo, mat);
    p18.position.set(-30, 6, 210);
    scene.add(p18)
    colisionObjetos.push(p18);
    
}
function monitor() {
    let texture = new THREE.TextureLoader().load('im13.jpg');
    let mat = new THREE.MeshPhongMaterial({ map: texture });
    let geo = new THREE.BoxGeometry(1, 10, 9 * 2);
    //mesas lado izquierdo
    let p1 = new THREE.Mesh(geo, mat);
    p1.position.set(-180, 25, 210);
    scene.add(p1)
    let p2 = new THREE.Mesh(geo, mat);
    p2.position.set(-230, 25, 210);
    scene.add(p2)
    let p3 = new THREE.Mesh(geo, mat);
    p3.position.set(-280, 25, 210);
    scene.add(p3)
    let p4 = new THREE.Mesh(geo, mat);
    p4.position.set(-330, 25, 210);
    scene.add(p4)

    let p31 = new THREE.Mesh(geo, mat);
    p31.position.set(-180, 25, 165);
    scene.add(p31)
    let p32 = new THREE.Mesh(geo, mat);
    p32.position.set(-230, 25, 165);
    scene.add(p32)
    let p33 = new THREE.Mesh(geo, mat);
    p33.position.set(-280, 25, 165);
    scene.add(p33)
    let p34 = new THREE.Mesh(geo, mat);
    p34.position.set(-330, 25, 165);
    scene.add(p34)
    //mesas de medio
    let p5 = new THREE.Mesh(geo, mat);
    p5.position.set(-180, 25, 80);
    scene.add(p5)
    let p6 = new THREE.Mesh(geo, mat);
    p6.position.set(-230, 25, 80);
    scene.add(p6)
    let p7 = new THREE.Mesh(geo, mat);
    p7.position.set(-280, 25, 80);
    scene.add(p7)
    let p8 = new THREE.Mesh(geo, mat);
    p8.position.set(-330, 25, 80);
    scene.add(p8)

    let p45 = new THREE.Mesh(geo, mat);
    p45.position.set(-180, 25, 45);
    scene.add(p45)
    let p46 = new THREE.Mesh(geo, mat);
    p46.position.set(-230, 25, 45);
    scene.add(p46)
    let p47 = new THREE.Mesh(geo, mat);
    p47.position.set(-280, 25, 45);
    scene.add(p47)
    let p48 = new THREE.Mesh(geo, mat);
    p48.position.set(-330, 25, 45);
    scene.add(p48)
    //mesas lado derecho
    let p9 = new THREE.Mesh(geo, mat);
    p9.position.set(-180, 25, -250);
    scene.add(p9)
    let p10 = new THREE.Mesh(geo, mat);
    p10.position.set(-230, 25, -250);
    scene.add(p10)
    let p11 = new THREE.Mesh(geo, mat);
    p11.position.set(-280, 25, -250);
    scene.add(p11)
    let p12 = new THREE.Mesh(geo, mat);
    p12.position.set(-330, 25, -250);
    scene.add(p12)

    let p49 = new THREE.Mesh(geo, mat);
    p49.position.set(-180, 25, -210);
    scene.add(p49)
    let p50 = new THREE.Mesh(geo, mat);
    p50.position.set(-230, 25, -210);
    scene.add(p50)
    let p51 = new THREE.Mesh(geo, mat);
    p51.position.set(-280, 25, -210);
    scene.add(p51)
    let p52 = new THREE.Mesh(geo, mat);
    p52.position.set(-330, 25, -220);
    scene.add(p52)
    //mesas de medio
    let p14 = new THREE.Mesh(geo, mat);
    p14.position.set(-180, 25, -130);
    scene.add(p14)
    let p15 = new THREE.Mesh(geo, mat);
    p15.position.set(-230, 25, -130);
    scene.add(p15)
    let p16 = new THREE.Mesh(geo, mat);
    p16.position.set(-280, 25, -130);
    scene.add(p16)
    let p17 = new THREE.Mesh(geo, mat);
    p17.position.set(-330, 25, -130);
    scene.add(p17)

    let p64 = new THREE.Mesh(geo, mat);
    p64.position.set(-180, 25, -90);
    scene.add(p64)
    let p65 = new THREE.Mesh(geo, mat);
    p65.position.set(-230, 25, -90);
    scene.add(p65)
    let p66 = new THREE.Mesh(geo, mat);
    p66.position.set(-280, 25, -90);
    scene.add(p66)
    let p67 = new THREE.Mesh(geo, mat);
    p67.position.set(-330, 25, -90);
    scene.add(p67)

     let p97 = new THREE.Mesh(geo, mat);
    p97.position.set(-30, 25, 190);
    scene.add(p97) 
}
function mesasOficina() {
    let texture = new THREE.TextureLoader().load('im10.jpg');
    let mat = new THREE.MeshPhongMaterial({ map: texture });
    let geo = new THREE.BoxGeometry(30, 25, 15 * 2);
    //mesas lado izquierdo
    
    let p2 = new THREE.Mesh(geo, mat);
    p2.position.set(64, 6, 114);
    scene.add(p2)
    colisionObjetos.push(p2);
  
}
function monitorOf() {
    let texture = new THREE.TextureLoader().load('im13.jpg');
    let mat = new THREE.MeshPhongMaterial({ map: texture });
    let geo = new THREE.BoxGeometry(15, 10, 1 * 2);
    //mesas lado izquierdo
    let p1 = new THREE.Mesh(geo, mat);
    p1.position.set(-20, 25, 90);
    scene.add(p1)
    let p2 = new THREE.Mesh(geo, mat);
    p2.position.set(50, 25, 200);
    scene.add(p2)
    let p3 = new THREE.Mesh(geo, mat);
    p3.position.set(65, 25, 110);
    scene.add(p3)
  }
  
  function sillaOfi(ancho, grosor, x, z) {
   let texture = new THREE.TextureLoader().load('im14.jpg');
    let mat = new THREE.MeshPhongMaterial({ map: texture });
    let geo = new THREE.BoxGeometry(ancho, 28, grosor);

    let puerta = new THREE.Mesh(geo, mat);
    puerta.position.x = x
    puerta.position.z = z
    puerta.position.y = 28/2
    scene.add(puerta)
    return puerta;
}
function sillaOf() {
    //Puertas labo basico
    sillaOfi(20, 5, -20, 100);
    sillaOfi(20, 5, 55, 230);
    sillaOfi(5, 20, -40, 210);
    
}
function mesasOficina2() {
    let texture = new THREE.TextureLoader().load('im10.jpg');
    let mat = new THREE.MeshPhongMaterial({ map: texture });
    let geo = new THREE.BoxGeometry(20, 25, 40 * 2);
    let p1 = new THREE.Mesh(geo, mat);
    p1.position.set(160, 6, 150);
    scene.add(p1)
    colisionObjetos.push(p1);
}
function mesasOf() {
    let texture = new THREE.TextureLoader().load('im10.jpg');
    let mat = new THREE.MeshPhongMaterial({ map: texture });
    let geo = new THREE.BoxGeometry(60, 25, 5 * 2);
    let p1 = new THREE.Mesh(geo, mat);
    p1.position.set(50, 6, 200);
    scene.add(p1)
    colisionObjetos.push(p1);
    let p2 = new THREE.Mesh(geo, mat);
    p2.position.set(-20, 6, 90);
    scene.add(p2)
    colisionObjetos.push(p2);
    
}

function mesaslbo() {
    let texture = new THREE.TextureLoader().load('im10.jpg');
    let mat = new THREE.MeshPhongMaterial({ map: texture });
    let geo = new THREE.BoxGeometry(90, 25, 15 * 2);
    let p3 = new THREE.Mesh(geo, mat);
    p3.position.set(-300, 6, -20);
    scene.add(p3)
    colisionObjetos.push(p3);
}

function librero(ancho, grosor, x, z) {
   let texture = new THREE.TextureLoader().load('im11.jpg');
    let mat = new THREE.MeshPhongMaterial({ map: texture });
    let geo = new THREE.BoxGeometry(ancho, 50, grosor);

    let puerta = new THREE.Mesh(geo, mat);
    puerta.position.x = x
    puerta.position.z = z
    puerta.position.y = 50 / 2
    scene.add(puerta)
    colisionObjetos.push(puerta);
    return puerta;
}
function libreros() {
    //Puertas labo basico
    librero(5, 60, -55, 220);
    librero(5, 40, 75, 240);
    librero(5, 60, -55, 90);
    //Puertas labo oficiona y labo

    //Puertas labo basico
    //librero(5, 20, 189, 200);
}
function puerta(ancho, grosor, x, z) {
    let texture = new THREE.TextureLoader().load('im2.jpg');
    let mat = new THREE.MeshPhongMaterial({ map: texture });
    let geo = new THREE.BoxGeometry(ancho, 50, grosor);

    let puerta = new THREE.Mesh(geo, mat);
    puerta.position.x = x
    puerta.position.z = z
    puerta.position.y = 50 / 2
    scene.add(puerta)
    colisionObjetos.push(puerta);
    return puerta;
    
}

function puerta2(ancho, grosor, x, z) {
    let texture = new THREE.TextureLoader().load('im4.jpg');
    let mat = new THREE.MeshPhongMaterial({ map: texture });
    let geo = new THREE.BoxGeometry(ancho, 50, grosor);

    let puerta = new THREE.Mesh(geo, mat);
    puerta.position.x = x
    puerta.position.z = z
    puerta.position.y = 50 / 2
    scene.add(puerta)
    colisionObjetos.push(puerta);
    return puerta;
}
function puerta3(ancho, grosor, x, z) {
    let texture = new THREE.TextureLoader().load('im5.jpg');
    let mat = new THREE.MeshPhongMaterial({ map: texture });
    let geo = new THREE.BoxGeometry(ancho, 50, grosor);

    let puerta = new THREE.Mesh(geo, mat);
    puerta.position.x = x
    puerta.position.z = z
    puerta.position.y = 50 / 2
    scene.add(puerta)
    colisionObjetos.push(puerta);
    return puerta;
}
function puerta4(ancho, grosor, x, z) {
    let texture = new THREE.TextureLoader().load('im6.jpg');
    let mat = new THREE.MeshPhongMaterial({ map: texture });
    let geo = new THREE.BoxGeometry(ancho, 50, grosor);

    let puerta = new THREE.Mesh(geo, mat);
    puerta.position.x = x
    puerta.position.z = z
    puerta.position.y = 50 / 2
    scene.add(puerta)
    colisionObjetos.push(puerta);
    return puerta;
}
function puertas() {
    //Puertas labo basico
    puerta3(2, 20, -100, -10);
    puerta(20, 2, -110, -40);
    //Puertas labo oficiona y labo

    //Puertas labo basico
    puerta4(4, 35, 220, -73);
    puerta2(4, 35, 80, 20);
    puerta(4, 35, 40, 150);
    puerta2(35, 4, 100, 80);
}


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}


//  Colisiones

function detectaColision() {
    const PERSONAJECOLISIONDISTANCIA = 40;
    var rotationMatrix;
    var cameraDirection = controles.getDirection(new THREE.Vector3(0, 0, 0)).clone();// obtine direccion de la camara
    // movimientos
    if (movAtras) {
        rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationY(degreesToRadians(180));
    }
    else if (movIzquierda) {
        rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationY(degreesToRadians(90));
    }
    else if (movDerecha) {
        rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationY(degreesToRadians(270));
    }
    if (rotationMatrix !== undefined) {
        cameraDirection.applyMatrix4(rotationMatrix);
    }
    //aplicando a la camara
    var rayCaster = new THREE.Raycaster(controles.getObject().position, cameraDirection);
    if (rayIntersect(rayCaster, PERSONAJECOLISIONDISTANCIA)) {
        return true;
    } else {
        return false;
    }
}

function rayIntersect(ray, distancia) {
    var interseccion = ray.intersectObjects(colisionObjetos);
    for (var i = 0; i < interseccion.length; i++) {
        if (interseccion[i].distance < distancia) {
            return true;
        }
    }
    return false;
}

