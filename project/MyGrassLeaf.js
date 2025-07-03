import { MyGrassLeaves } from "./MyGrassLeaves.js";
import { CGFobject } from "../lib/CGF.js";

export class MyGrassLeaf extends CGFobject {
  constructor(scene) {
    super(scene, 50, 50);
    this.grass = [];
    this.createGrass();
  }

  createGrass() {
    const numRows = 50;
    const numCols = 50;
    const spacing = 1; 

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        const x = (i - numRows / 2) * spacing;
        const z = (j - numCols / 2) * spacing;
        const randomAngle = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 25);
        const randomCurve = Math.random() * 10 + 10;
        const grassLeaves = new MyGrassLeaves(
          this.scene,
          randomCurve,
          randomAngle
        );
        this.grass.push({ grassLeaves, x, z });
      }
    }
  }

  display() {
    this.scene.pushMatrix();
    
    this.scene.translate(-5, -40, -5);
    //this.scene.translate(0, 0, 0);
    for (const { grassLeaves, x, z } of this.grass) {
      this.scene.pushMatrix();
      this.scene.scale(2, 3, 1);
      this.scene.translate(x, -0.5, z);
      grassLeaves.display();
      this.scene.popMatrix();
    }

    this.scene.popMatrix();
  }
}
