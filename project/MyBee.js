import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyCone } from "./MyCone.js";
import { MyPollen } from "./MyPollen.js";

export class MyBee extends CGFobject {
  constructor(scene, speedFactor) {
    super(scene);
    this.wingBool = 0; // Boolean to control wing movement
    this.bodyBool = 0; // Boolean to control body movement
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.angle_y = 0;
    this.velocity_vector = [0, 0, 0];
    this.speedFactor = speedFactor;
    this.scaleBee = 1;
    this.descending = false;
    this.targetFlower = null;
    this.ascending = false;
    this.hasPollen = false;
    this.goingToHive = false;
    this.hive = null;

    this.sphere = new MySphere(this.scene, 16, 8);
    this.cone = new MyCone(this.scene, 16, 8); // Initialize the cone
    this.pollen = new MyPollen(this.scene);

    this.abdomenTexture = new CGFappearance(this.scene);
    this.abdomenTexture.setAmbient(0.9, 0.9, 0.9, 1);
    this.abdomenTexture.setDiffuse(0.8, 0.8, 0.8, 1);
    this.abdomenTexture.setSpecular(0.1, 0.1, 0.1, 1);
    this.abdomenTexture.setShininess(10.0);
    this.abdomenTexture.setTexture(new CGFtexture(this.scene, "textures/abdomen.jpg"));

    this.eyesTexture = new CGFappearance(this.scene);
    this.eyesTexture.setAmbient(0.9, 0.9, 0.9, 1);
    this.eyesTexture.setDiffuse(0.8, 0.8, 0.8, 1);
    this.eyesTexture.setSpecular(0.1, 0.1, 0.1, 1);
    this.eyesTexture.setShininess(10.0);
    this.eyesTexture.setTexture(new CGFtexture(this.scene, "textures/eyes.jpg"));

    this.legsTexture = new CGFappearance(this.scene);
    this.legsTexture.setAmbient(0.9, 0.9, 0.9, 1);
    this.legsTexture.setDiffuse(0.8, 0.8, 0.8, 1);
    this.legsTexture.setSpecular(0.1, 0.1, 0.1, 1);
    this.legsTexture.setShininess(10.0);
    this.legsTexture.setTexture(new CGFtexture(this.scene, "textures/legs.jpg"));

    this.headTexture = new CGFappearance(this.scene);
    this.headTexture.setAmbient(0.9, 0.9, 0.9, 1);
    this.headTexture.setDiffuse(0.8, 0.8, 0.8, 1);
    this.headTexture.setSpecular(0.1, 0.1, 0.1, 1);
    this.headTexture.setShininess(10.0);
    this.headTexture.setTexture(new CGFtexture(this.scene, "textures/head.jpg"));

    this.stingerTexture = new CGFappearance(this.scene);
    this.stingerTexture.setAmbient(0.9, 0.9, 0.9, 1);
    this.stingerTexture.setDiffuse(0.8, 0.8, 0.8, 1);
    this.stingerTexture.setSpecular(0.1, 0.1, 0.1, 1);
    this.stingerTexture.setShininess(10.0);
    this.stingerTexture.setTexture(new CGFtexture(this.scene, "textures/stinger.jpg"));
    
    this.wingTexture = new CGFappearance(this.scene);
    this.wingTexture.setAmbient(0.1, 0.1, 0.1, 0.1); 
    this.wingTexture.setDiffuse(0.1, 0.1, 0.1, 0.1);
    this.wingTexture.setSpecular(0.1, 0.1, 0.1, 0.1);
    this.wingTexture.setEmission(0.1, 0.1, 0.1, 0.1);
    this.wingTexture.setShininess(10.0);
    this.wingTexture.setTexture(new CGFtexture(this.scene, "textures/wings.jpg"));

    this.display();
  }

  updateWingAnimation(deltaTime) {
    if(deltaTime === 1) this.wingBool = 1;
    else this.wingBool = 0;
  }

  updateBodyAnimation(deltaTime) {
    if(deltaTime === 1) this.bodyBool = 1;
    else this.bodyBool = 0;
  }

  getPosition(){
    let ans = [this.x, this.y, this.z];
    return ans;
  }

  updateScale(v){
    this.scaleBee = v;
  }

  turn(v){
    this.angle_y += v;
  }

  accelerate(v){
    if (v > 0){
      this.velocity_vector[0] += v * Math.sin(this.angle_y);
      this.velocity_vector[1] += 0;
      this.velocity_vector[2] += v * Math.cos(this.angle_y);
    }
    else if(v === 0){
      this.velocity_vector[0] = 0;
      this.velocity_vector[1] = 0;
      this.velocity_vector[2] = 0;
    }
  }

  descendToFlower(flower, speed) {
    this.descending = true;
    this.targetFlower = flower;
    this.speed = speed
  }

  updateDescent() {
    if (this.descending) {
      let x = this.targetFlower.x;
      let y = this.targetFlower.y;
      let z = this.targetFlower.z;

      let distance = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2) + Math.pow(z - this.z, 2));
      if (distance < 0.2) { 
        this.descending = false;
        this.velocity_vector[0] = 0;
        this.velocity_vector[1] = 0;
        this.velocity_vector[2] = 0;
      } else {
        let velocity = this.speed;
        let time = distance / velocity;
        let deltaTime = 1 / time;
        this.velocity_vector[0] = (x - this.x) * deltaTime;
        this.velocity_vector[1] = (y - this.y) * deltaTime;
        this.velocity_vector[2] = (z - this.z) * deltaTime;
        this.x += this.velocity_vector[0];
        this.y += this.velocity_vector[1];
        this.z += this.velocity_vector[2];
      }
    }
  }

  pickUpPollenAndGoUp(flower, speed){
    if(flower.hasPollen){
      flower.hasPollen = false;
      this.hasPollen = true;
    }
    this.ascending = true;
    this.speed = speed;
  }

  updateAscent() {
    if(this.ascending){
      if(this.y >= 0){
        this.ascending = false;
        this.velocity_vector[0] = 0;
        this.velocity_vector[1] = 0;
        this.velocity_vector[2] = 0;
      } else {
        this.velocity_vector[0] = 0;
        this.velocity_vector[1] = this.speed;
        this.velocity_vector[2] = 0;
      }
    }
  }

  takeToHive(hive, speed){
    this.goingToHive = true;
    this.hive = hive;
    this.speed = speed;
  }

  updateGoingToHive(){
    if (this.goingToHive && this.hasPollen) {
      let distance = Math.sqrt(Math.pow(this.hive.x - this.x, 2) + Math.pow(this.hive.y - this.y, 2) + Math.pow(this.hive.z - this.z, 2));

      if (distance < 0.2) { 
        this.goingToHive = false;
        this.hive.hasPollen = true;
        this.hasPollen = null;
        this.velocity_vector[0] = 0;
        this.velocity_vector[1] = 0;
        this.velocity_vector[2] = 0;
      } else {
        let velocity = this.speed;
        let time = distance / velocity;
        let deltaTime = 1 / time;
        this.velocity_vector[0] = (this.hive.x - this.x) * deltaTime;
        this.velocity_vector[1] = (this.hive.y - this.y) * deltaTime;
        this.velocity_vector[2] = (this.hive.z - this.z) * deltaTime;
      }
    }
  }

  reset(){
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.angle_y = 0;
    this.velocity_vector = [0, 0, 0];
    this.descending = false;
    this.ascending = false;
    this.goingToHive = false;
  }

  update() {
    this.x += this.velocity_vector[0];
    this.y += this.velocity_vector[1];
    this.z += this.velocity_vector[2];
  }

  display() {
    this.angle0 = 0;
    this.angle10 = Math.PI / 18; // 10 degrees
    this.angle15 = Math.PI / 12; // 15 degrees
    this.angle30 = Math.PI / 6; // 30 degrees
    this.angle45 = Math.PI / 4; // 45 degrees
    this.angle60 = Math.PI / 3; // 60 degrees
    this.angle90 = Math.PI / 2; // 90 degrees
    this.angle120 = 2 * Math.PI / 3; // 120 degrees
    this.angle135 = 3 * Math.PI / 4; // 135 degrees
    this.angle150 = 5 * Math.PI / 6; // 150 degrees
    this.angle180 = Math.PI; // 180 degrees
    this.angle210 = 7 * Math.PI / 6; // 210 degrees
    this.angle225 = 5 * Math.PI / 4; // 225 degrees
    this.angle240 = 4 * Math.PI / 3; // 240 degrees
    this.angle270 = 3 * Math.PI / 2; // 270 degrees
    this.angle300 = 5 * Math.PI / 3; // 300 degrees
    this.angle315 = 7 * Math.PI / 4; // 315 degrees

    this.updateDescent();
    this.updateAscent();
    this.updateGoingToHive();

    // Pollen
    if(this.hasPollen){
      this.scene.pushMatrix();
      this.scene.scale(this.scaleBee, this.scaleBee, this.scaleBee);
      this.scene.translate(this.x, this.y, this.z);
      this.scene.rotate(this.angle_y, 0, 1, 0);
      if(this.bodyBool == 0) {this.scene.translate(0, 0.25, 0);}
      this.scene.translate(0, 2, -3.5); 
      this.pollen.display();
      this.scene.popMatrix();
    }

    // Abdomen
    this.scene.pushMatrix();
    this.scene.scale(this.scaleBee, this.scaleBee, this.scaleBee);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.angle_y, 0, 1, 0);
    if(this.bodyBool == 0) {this.scene.translate(0, 0.25, 0);}
    this.scene.translate(0, 2, 0);
    this.scene.rotate(this.angle90, 1, 0, 0);
    this.scene.scale(1.5, 2, 1.5);
    this.abdomenTexture.apply(); // Apply the texture
    this.sphere.display();
    this.scene.popMatrix();

    // Head
    this.scene.pushMatrix();
    this.scene.scale(this.scaleBee, this.scaleBee, this.scaleBee);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.angle_y, 0, 1, 0);
    if(this.bodyBool == 0) {this.scene.translate(0, 0.25, 0);}
    this.scene.translate(0, 2, 2.5); 
    this.scene.rotate(this.angle45, 1, 0, 0); 
    this.scene.scale(1, 0.75, 1.5);
    this.headTexture.apply();
    this.sphere.display();
    this.scene.popMatrix();

    // Left Eye
    this.scene.pushMatrix();
    this.scene.scale(this.scaleBee, this.scaleBee, this.scaleBee);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.angle_y, 0, 1, 0);
    if(this.bodyBool == 0) {this.scene.translate(0, 0.25, 0);}
    this.scene.translate(-0.75, 2.25, 2.75); 
    this.scene.rotate(Math.PI / 4, 1, 0, 0); 
    this.scene.scale(0.45, 0.25, 0.5); 
    this.eyesTexture.apply(); 
    this.sphere.display();
    this.scene.popMatrix();

    // Right Eye
    this.scene.pushMatrix();
    this.scene.scale(this.scaleBee, this.scaleBee, this.scaleBee);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.angle_y, 0, 1, 0);
    if(this.bodyBool == 0) {this.scene.translate(0, 0.25, 0);}
    this.scene.translate(0.75, 2.25, 2.75);
    this.scene.rotate(Math.PI / 4, 1, 0, 0); 
    this.scene.scale(0.45, 0.25, 0.5); 
    this.eyesTexture.apply(); 
    this.sphere.display();
    this.scene.popMatrix();

    // Stinger
    this.scene.pushMatrix();
    this.scene.scale(this.scaleBee, this.scaleBee, this.scaleBee);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.angle_y, 0, 1, 0);
    if(this.bodyBool == 0) {this.scene.translate(0, 0.25, 0);}
    this.scene.translate(0, 2, -1.5); 
    this.scene.rotate(this.angle90, 1, 0, 0); 
    this.scene.rotate(this.angle180, 0, 0, 1); 
    this.scene.scale(0.25, 2, 0.25); 
    this.stingerTexture.apply();
    this.cone.display();
    this.scene.popMatrix();

    // Left Antenna
    this.scene.pushMatrix();
    this.scene.scale(this.scaleBee, this.scaleBee, this.scaleBee);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.angle_y, 0, 1, 0);
    if(this.bodyBool == 0) {this.scene.translate(0, 0.25, 0);}
    this.scene.translate(-0.5, 2.75, 2.5); 
    this.scene.rotate(this.angle120, 0, 1, 0); 
    this.scene.rotate(this.angle45, 1, 0, 0); 
    this.scene.scale(0.05, 0.05, 1); 
    this.legsTexture.apply();
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(this.scaleBee, this.scaleBee, this.scaleBee);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.angle_y, 0, 1, 0);
    if(this.bodyBool == 0) {this.scene.translate(0, 0.25, 0);}
    this.scene.translate(-1.15, 3.45, 2.85); 
    this.scene.scale(0.1, 0.1, 0.1); 
    this.legsTexture.apply();
    this.sphere.display();
    this.scene.popMatrix();

    // Right Antenna
    this.scene.pushMatrix();
    this.scene.scale(this.scaleBee, this.scaleBee, this.scaleBee);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.angle_y, 0, 1, 0);
    if(this.bodyBool == 0) {this.scene.translate(0, 0.25, 0);}
    this.scene.translate(0.5, 2.75, 2.5); 
    this.scene.rotate(-this.angle120, 0, 1, 0); 
    this.scene.rotate(this.angle45, 1, 0, 0); 
    this.scene.scale(-0.05, 0.05, 1); 
    this.legsTexture.apply();
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(this.scaleBee, this.scaleBee, this.scaleBee);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.angle_y, 0, 1, 0);
    if(this.bodyBool == 0) {this.scene.translate(0, 0.25, 0);}
    this.scene.translate(1.15, 3.45, 2.85); 
    this.scene.scale(-0.1, 0.1, 0.1);
    this.legsTexture.apply();
    this.sphere.display();
    this.scene.popMatrix();

    // Left Leg 1 
    this.scene.pushMatrix();
    this.scene.scale(this.scaleBee, this.scaleBee, this.scaleBee);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.angle_y, 0, 1, 0);
    if(this.bodyBool == 0) {this.scene.translate(0, 0.25, 0);}
    this.scene.translate(-1, 1, 0.75); 
    this.scene.rotate(this.angle90, 0, 1, 0);
    this.scene.rotate(-this.angle45, 1, 0, 0); 
    this.scene.scale(0.1, 0.1, 1);
    this.legsTexture.apply();
    this.sphere.display();
    this.scene.popMatrix();

    // Left Leg 2
    this.scene.pushMatrix();
    this.scene.scale(this.scaleBee, this.scaleBee, this.scaleBee);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.angle_y, 0, 1, 0);
    if(this.bodyBool == 0) {this.scene.translate(0, 0.25, 0);}
    this.scene.translate(-1, 1, -0.75); 
    this.scene.rotate(this.angle90, 0, 1, 0); 
    this.scene.rotate(-this.angle45, 1, 0, 0); 
    this.scene.scale(0.1, 0.1, 1); 
    this.legsTexture.apply();
    this.sphere.display();
    this.scene.popMatrix();

    // Right Leg 1 
    this.scene.pushMatrix();
    this.scene.scale(this.scaleBee, this.scaleBee, this.scaleBee);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.angle_y, 0, 1, 0);
    if(this.bodyBool == 0) {this.scene.translate(0, 0.25, 0);}
    this.scene.translate(1, 1, 0.75); 
    this.scene.rotate(3 * this.angle90, 0, 1, 0); 
    this.scene.rotate(3 * this.angle45, 1, 0, 0); 
    this.scene.scale(-0.1, 0.1, 1); 
    this.legsTexture.apply();
    this.sphere.display();
    this.scene.popMatrix();

    // Right Leg 2
    this.scene.pushMatrix();
    this.scene.scale(this.scaleBee, this.scaleBee, this.scaleBee);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.angle_y, 0, 1, 0);
    if(this.bodyBool == 0) {this.scene.translate(0, 0.25, 0);}
    this.scene.translate(1, 1, -0.75); 
    this.scene.rotate(3* this.angle90, 0, 1, 0); 
    this.scene.rotate(3* this.angle45, 1, 0, 0); 
    this.scene.scale(-0.1, 0.1, 1);
    this.legsTexture.apply();
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.gl.enable(this.scene.gl.BLEND);
    this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);

    // Left Wing
    this.scene.pushMatrix();
    this.scene.scale(this.scaleBee, this.scaleBee, this.scaleBee);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.angle_y, 0, 1, 0);
    if(this.bodyBool == 0) {this.scene.translate(0, 0.25, 0);}
    if(this.wingBool == 0) {this.scene.translate(1, 0, 0);}
    this.scene.translate(-2, 4, 0);
    this.scene.rotate(this.angle90, 0, 1, 0);
    this.scene.rotate(this.angle45, 1, 0, 0);
    if(this.wingBool == 0){this.scene.rotate(this.angle210, 1, 0, 0);}
    this.scene.scale(1, 0.1, 2.5);
    this.wingTexture.apply(); 
    this.sphere.display();
    this.scene.popMatrix();

    // Right Wing
    this.scene.pushMatrix();
    this.scene.scale(this.scaleBee, this.scaleBee, this.scaleBee);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.angle_y, 0, 1, 0);
    if(this.bodyBool == 0) {this.scene.translate(0, 0.25, 0);}
    if(this.wingBool == 0) {this.scene.translate(-1, 0, 0);}
    this.scene.translate(2, 4, 0);
    this.scene.rotate(-this.angle90, 0, 1, 0);
    this.scene.rotate(this.angle45, 1, 0, 0);
    if(this.wingBool == 0){this.scene.rotate(this.angle30, 1, 0, 0);}
    this.scene.scale(-1, 0.1, 2.5);
    this.wingTexture.apply(); 
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.gl.disable(this.scene.gl.BLEND);
  }

  enableNormalViz() {
    this.sphere.enableNormalViz();
    this.cone.enableNormalViz();
  }

  disableNormalViz() {
    this.sphere.disableNormalViz();
    this.cone.disableNormalViz();
  }
}
