import { MyFlower } from "./MyFlower.js";
import { MyGrass } from "./MyGrass.js";
import { MyRockSet } from "./MyRockSet.js";

export class MyGarden {
  constructor(scene, rows = 5, columns = 5) {
    this.scene = scene;
    this.rows = rows;
    this.columns = columns;
    this.flowers = [];
    this.rocks = [];
    this.grasses = [];

    this.rockSet = new MyRockSet(scene, 12);

    this.initBuffers();
  }

  initBuffers() {
    this.flowers = [];
    this.grasses = [];
    for (let i = 0; i < this.rows; i++) {
      this.flowers[i] = [];
      this.grasses[i] = [];
      this.rocks[i] = [];
      for (let j = 0; j < this.columns; j++) {
        // Flower setup
        const numPetals = Math.floor(Math.random() * 8) + 3;
        const receptacleRadius = Math.random() * 1 + 1;
        const stemRadius = Math.random() * 0.5 + 0.3;
        const stemHeight = Math.random() * 7 + 3;
        const hasPollen = Math.random() > 0.5;
        const x = j * 10 - (this.columns * 10) / 2;
        const z = i * 10 - (this.columns * 10) / 2;

        this.flowers[i][j] = new MyFlower(
          this.scene,
          numPetals,
          receptacleRadius,
          stemRadius,
          stemHeight,
          hasPollen,
          x,
          z
        );

        this.rocks[i][j] = new MyRockSet(this.scene, 3);

        // Grass setup
        this.grasses[i][j] = new MyGrass(this.scene);
      }
    }
  }

  findNearestFlower(position) {
    let nearestFlower = null;
    let nearestDistance = Infinity;

  
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const flower = this.flowers[i][j];
        // Check if the flower is defined before accessing its properties
        if (flower) {
          const distance = Math.sqrt(
            Math.pow(position[0] - flower.x, 2) +
            Math.pow(position[1] - flower.y, 2) +
            Math.pow(position[2] - flower.z, 2)
          );
    
          if (distance < nearestDistance) {
            nearestFlower = flower;
            nearestDistance = distance;
          }
        }
      }
    }
    return nearestFlower;
  }

  display() {
    const spacingX = 10;
    const spacingZ = 10;

    this.scene.pushMatrix();
    this.scene.translate(0, -40, 0); 

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.scene.pushMatrix();

        const xPosition = j * spacingX - (this.columns * spacingX) / 2;
        const zPosition = i * spacingZ - (this.columns * spacingZ) / 2;

        // Display flower
        this.scene.translate(xPosition, 0, zPosition);
        this.flowers[i][j].display();
        this.rocks[i][j].display();

        this.scene.popMatrix();
      }
    }

    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(35, -40, 0);
    this.scene.scale(2, 2, 2);
    this.rockSet.display();
    this.scene.popMatrix();

  }
  updateGarden() {
    this.initBuffers();
  }

  updateRows(rows) {
    this.rows = rows;
    this.updateGarden();
  }

  updateColumns(columns) {
    this.columns = columns;
    this.updateGarden(); 
  }
}
