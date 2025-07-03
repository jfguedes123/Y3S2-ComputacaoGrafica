import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyFlower } from "./MyFlower.js";
import { MyStem } from "./MyStem.js";
import { MyPetal } from "./MyPetal.js";
import { MyReceptacle } from "./MyReceptacle.js";
import { MyGarden } from "./MyGarden.js";
import { MyLeaf } from "./MyLeaf.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyBee } from "./MyBee.js";
import { MyLargeGrass } from "./MyLargeGrass.js";
import { MyPollen } from "./MyPollen.js";
import { MyHive } from "./MyHive.js";
import { MyGrassLeaf } from "./myGrassLeaf.js";
import { MyGrassLeaves } from "./MyGrassLeaves.js";


/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displayPlane = false;
    this.displaySphere = false;
    this.displayPetals = false;
    this.displayStem = false;
    this.displayFlower = false;
    this.displayNormals = false;
    this.displayReceptacle = false;
    this.displayGarden = true;
    this.displayLeaf = false;
    this.displayPanorama = false;
    this.displayRock = false;
    this.displayRockSet = false;
    this.displayBee = true;
    this.speedFactor = 0.1;
    this.displayLargeGrass = false;
    this.displayGrassLeaf = false;
    this.displayGrassLeaves = false;

    this.colors = {
      Pink: [1, 0.75, 0.8, 1],
      Red: [1, 0, 0, 1],
      Blue: [0, 0, 1, 1],
      Green: [0, 1, 0, 1],
      Yellow: [1, 1, 0, 1],
      Cyan: [0, 1, 1, 1],
      Magenta: [1, 0, 1, 1],
      White: [1, 1, 1, 1],
      Black: [0, 0, 0, 1],
    };
    this.currentPetalsColor = 'Red';
    this.currentReceptacleColor = 'Yellow';
    this.currentStemColor = 'Green';

    this.enableTextures(true);

    //------ Initialize scene objects
    this.sphere = new MySphere(this, 16, 8);
    this.panorama = new MyPanorama(this, 20, 20);
    this.flower = new MyFlower(this, 10, 3);
    this.stem = new MyStem(this, 20, Math.random() * 8 + 2, 0.5, 10, true);
    this.petal = new MyPetal(this, 20, 5, true);
    this.receptacle = new MyReceptacle(this, 30, 100, 0.5);
    this.leaf = new MyLeaf(this);
    this.rock = new MyRock(this,20,20);
    this.rockSet = new MyRockSet(this, 8);
    this.grassLeaf = new MyGrassLeaf(this);
    this.grassLeaves = new MyGrassLeaves(this, 20, 5);

    this.bee = new MyBee(this, 0.1);
    this.largeGrass = new MyLargeGrass(this, 20, 20);
    this.pollen = new MyPollen(this);
    this.hive = new MyHive(this);

    this.texture = new CGFtexture(this, "images/garden.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.appearance.setEmission(0.5, 0.5, 0.5, 1);
    
    this.garden = new MyGarden(this, 5, 5, { numPetals: 3, receptacleRadius: 1.5, stemRadius: 0.5, stemHeight: 5 });
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  updatePetals() {
    this.flower.updatePetals(this.numPetals);
  } 
  
  updateReceptacleRadius() {
    this.flower.updateReceptacleRadius(this.radius);
  }
  
  updateStemRadius() {
    this.flower.updateStemRadius(this.stemRadius);
  }
  
  updateStemHeight() {
    this.flower.updateStemHeight(this.stemHeight);
  }
  
  updateRows() {
    this.garden.updateRows(this.rows);
  }
  
  updateColumns() {
    this.garden.updateColumns(this.columns);
  }
  
  setTexture(enable) {
    this.stem.setTexture(enable);
  }
  
  updateStemTexture() {
    this.stem.updateStemTexture(enable);
  }

  updateSpeedFactor(v) {
    this.speedFactor = v
  }

  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    if (this.gui.isKeyPressed("KeyW")){
      text += "W ";
      keysPressed = true;
      this.bee.accelerate(this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyS")){
      text += "S ";
      keysPressed = true;
      this.bee.accelerate(0);
    }
    if (this.gui.isKeyPressed("KeyA")){
      text += "A ";
      keysPressed = true;
      this.bee.turn(-0.1);
    }
    if (this.gui.isKeyPressed("KeyD")){
      text += "D ";
      keysPressed = true;
      this.bee.turn(0.1);
    }
    if (this.gui.isKeyPressed("KeyR")){
      text += "R ";
      keysPressed = true;
      this.bee.reset();
    }
    if (this.gui.isKeyPressed("KeyP")){
      text += "P ";
      keysPressed = true;
      const flower = this.garden.findNearestFlower(this.bee.getPosition());
      this.bee.pickUpPollenAndGoUp(flower, this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyF")){
      text += "F ";
      keysPressed = true;
    
      // Check if the bee's position is defined before finding the nearest flower
      if (this.bee.getPosition()) {
        const flower = this.garden.findNearestFlower(this.bee.getPosition());
        this.bee.descendToFlower(flower, this.speedFactor);
      }
    }
    if (this.gui.isKeyPressed("KeyO")){
      text += "O ";
      keysPressed = true;
      const hive = this.hive.getHive();
      console.log(hive);
      this.bee.takeToHive(hive, this.speedFactor);
    }
    if (keysPressed) {
      console.log(text);
    }
  }
  update(deltaTime, bodyTime) {
    // Call update method of bee object to update wing animation
    this.bee.updateWingAnimation(deltaTime);
    this.bee.updateBodyAnimation(bodyTime);
    this.checkKeys();
  }
  
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    // Calculate delta time
    const now = performance.now();
    if (Math.round(now) % 2 == 0) this.deltaTime = 1;
    else this.deltaTime = 0;

    if (Math.round(now % 2 == 0)) this.bodyTime = 1;
    else this.bodyTime = 0;

    // Update scene
    this.update(this.deltaTime, this.bodyTime);

    if (this.displayPlane) this.plane.display();

    if (this.displayReceptacle) this.receptacle.display();
    if (this.displayStem) this.stem.display();
    if (this.displayLeaf) this.leaf.display();

    if (this.displaySphere) this.sphere.display();

    if (this.displayPetals) this.petal.display();

    if (this.displayFlower) this.flower.display();

    if (this.displayGarden) {
        this.panorama.display();
        this.garden.display();
        this.largeGrass.display();
        this.grassLeaf.display();
    }

    if (this.displayRock) this.rock.display();

    if (this.displayRockSet) this.rockSet.display();

    if (this.displayBee) {
      this.bee.display();
      this.bee.update();
    }

    
    this.hive.display();

    // ---- END Primitive drawing section
  }
}
