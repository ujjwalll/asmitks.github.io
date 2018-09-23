if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
  var container, stats;
  var camera, scene, renderer;
  var geometry, objects;
  var controls, clock = new THREE.Clock();

  init();
  animate();

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 15000 );
  camera.position.z = 1000;
  controls = new THREE.FlyControls( camera );
  controls.movementSpeed = 1000;
  controls.rollSpeed = Math.PI / 10;
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0x000000, 1, 15000 );
  scene.autoUpdate = false;
  var light = new THREE.PointLight( 0xff2200 );
  light.position.set( 0, 0, 0 );
  scene.add( light );
  var light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 0, 0, 1 ).normalize();
  scene.add( light );
  var geometry = [
    [ new THREE.IcosahedronBufferGeometry( 100, 4 ), 50 ],
    [ new THREE.IcosahedronBufferGeometry( 100, 3 ), 300 ],
    [ new THREE.IcosahedronBufferGeometry( 100, 2 ), 1000 ],
    [ new THREE.IcosahedronBufferGeometry( 100, 1 ), 2000 ],
    [ new THREE.IcosahedronBufferGeometry( 100, 0 ), 8000 ]
  ];
  var material = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: true } );
  var i, j, mesh, lod;
  for ( j = 0; j < 1000; j ++ ) {
    lod = new THREE.LOD();
    for ( i = 0; i < geometry.length; i ++ ) {
      mesh = new THREE.Mesh( geometry[ i ][ 0 ], material );
      mesh.scale.set( 1.5, 1.5, 1.5 );
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      lod.addLevel( mesh, geometry[ i ][ 1 ] );
    }
    lod.position.x = 10000 * ( 0.5 - Math.random() );
    lod.position.y =  7500 * ( 0.5 - Math.random() );
    lod.position.z = 10000 * ( 0.5 - Math.random() );
    lod.updateMatrix();
    lod.matrixAutoUpdate = false;
    scene.add( lod );
  }
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  controls.update( clock.getDelta() );
  scene.updateMatrixWorld();
  scene.traverse( function ( object ) {
    if ( object instanceof THREE.LOD ) {
      object.update( camera );
    }
  } );
  renderer.render( scene, camera );
}

