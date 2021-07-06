var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//create 4 ball ball sprites
var ball1 = createSprite(5,5,10,10);
var ball2 = createSprite(395,395,10,10);
var ball3 = createSprite(395,5,10,10);
var ball4 = createSprite(5,395,10,10);
//assign velocity to our balls
ball1.velocityX = 2;
ball1.velocityY = 2;
ball2.velocityX = 3;
ball2.velocityY = 3;
ball3.velocityX = -2;
ball3.velocityY = -2;
ball4.velocityX = 2;
ball4.velocityY = -3;
function draw() {
//make the background white
background("white");
//create boundaries on the edges
createEdgeSprites();
//make the balls bounce off the edges
ball1.bounceOff(edges);
ball2.bounceOff(edges);
ball3.bounceOff(edges);
ball4.bounceOff(edges);
//make the balls bounce off each other
ball1.bounce(ball2);
ball1.bounce(ball3);
ball1.bounce(ball4);
ball2.bounce(ball3);
ball2.bounce(ball4);
ball3.bounce(ball4);
//draw the sprites
drawSprites(); }


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
