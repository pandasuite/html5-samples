var appHeight = 400,
  appWidth = 1000,
  appCenterX = appWidth / 2,
  appCenterY = appHeight / 2,
  stage = new Kinetic.Stage({
    container: 'container',
    width: appWidth,
    height:appHeight
  }),
  layer = new Kinetic.Layer(),
  imageFile = new Image(),
  creature,
  bezTween;

imageFile.src = "img/creature_red.png";

var creatureGroup = new Kinetic.Group();
creature = new Kinetic.Image({
  image: imageFile,
  width: 27,
  height: 29,
  x: -16,
  y: -16
});

bezTween = new TweenMax(creatureGroup, 6, {
  bezier: {
    type: "soft",
    values :[
    { setX: 100, setY: 250 },
    { setX: 300, setY: 0 },
    { setX: 500, setY: 400 },
    { setX: appWidth + 20, setY: 20 }],
    //autoRotate needs to know how to adjust x/y/rotation so we pass in the names of the apporpriate KineticJS methods
    autoRotate:["setX", "setY", "setRotationDeg"]
  },
  ease: Linear.easeNone, autoCSS: false, repeat: 0, paused: true });

for (i = 0; i < 200; i++) {
  bezTween.progress(i / 200);
  var circle = new Kinetic.Circle({
    radius: 2,
    fill: '#333',
    x: bezTween.target.getX(),
    y: bezTween.target.getY()
  });
  layer.add(circle);
  layer.draw();
  bezTween.seek(0);
  // bezTween.restart();
}

var creatureLayer = new Kinetic.Layer();
creatureGroup.add(creature);
creatureLayer.add(creatureGroup);
stage.add(layer);
stage.add(creatureLayer);

TweenLite.ticker.addEventListener("tick", redraw);

window.tween = bezTween;

function redraw() {
  creatureLayer.draw();
}

//using the BezierPlugin with CSS/DOM you can render  a path of dots using this technique: http://codepen.io/GreenSock/pen/ABkdL