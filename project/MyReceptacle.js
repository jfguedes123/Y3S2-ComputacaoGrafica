import { CGFobject, CGFappearance } from "../lib/CGF.js";

class MyReceptacle extends CGFobject {
  constructor(scene, slices, stacks, radius = 1.5) { 
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.radius = radius; 
    this.initBuffers();

    this.material = new CGFappearance(this.scene);
    this.material.loadTexture('../project/textures/receptacle.jpg');
    const color = this.scene.colors[this.scene.currentReceptacleColor]; 
    this.material.setAmbient(...color);
    this.material.setDiffuse(...color);
    this.material.setSpecular(...color);
    this.material.setShininess(10.0);
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    let angleStepSlice = (2 * Math.PI) / this.slices;
    let angleStepStack = Math.PI / this.stacks;

    for (let stack = 0; stack <= this.stacks; stack++) {
      let theta = stack * angleStepStack;
      for (let slice = 0; slice <= this.slices; slice++) {
        let phi = slice * angleStepSlice;

        let x = Math.cos(phi) * Math.sin(theta);
        let y = Math.sin(phi) * Math.sin(theta);
        let z = Math.cos(theta);

        this.normals.push(x, y, z);
        this.vertices.push(this.radius * x, this.radius * y, this.radius * z);
      }
    }

    for (let stack = 0; stack < this.stacks; stack++) {
      for (let slice = 0; slice < this.slices; slice++) {
        let first = (stack * (this.slices + 1)) + slice;
        let second = first + this.slices + 1;

        this.indices.push(first, second, first + 1);
        this.indices.push(second, second + 1, first + 1);
      }
    }

    for (let stack = 0; stack <= this.stacks; stack++) {
      for (let slice = 0; slice <= this.slices; slice++) {
        this.texCoords.push(slice / this.slices, stack / this.stacks);
      }
    }
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  setColor(color) {
    this.material.setAmbient(...color);
    this.material.setDiffuse(...color);
    this.material.setSpecular(...color);
  }

  display() {
    this.material.apply();  
    super.display();
  }
}

export { MyReceptacle };
