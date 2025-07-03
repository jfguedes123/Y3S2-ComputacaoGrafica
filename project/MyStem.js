import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyLeaf } from "./MyLeaf.js";

/**
 * MyStem
 * Represents a cylindrical stem in 3D space, oriented vertically along the Y-axis.
 * Each stack has a random height between 1 and 3 and is slightly offset to the left, creating a helical effect.
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices around the stem (circular resolution)
 * @param stacks - Number of stacks along the stem (vertical resolution)
 * @param radius - Radius of the stem (optional, default = 0.5)
 * @param height - Total height of the stem (optional, default = 5)
 */
export class MyStem extends CGFobject {
  constructor(scene, slices, stacks, radius = 0.5, height = 5) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.radius = radius;
    this.height = height;
    this.leaf = new MyLeaf(scene);
    this.stackHeights = Array.from({ length: stacks }, () => Math.random() * 2 + 1);
    this.totalHeight = this.stackHeights.reduce((a, b) => a + b, 0);
    this.initBuffers();

    // Material and Texture
    this.material = new CGFappearance(this.scene);
    this.texture = new CGFtexture(this.scene, 'textures/stem.jpg');
    this.material.setTexture(this.texture);
    this.material.setTextureWrap('REPEAT', 'REPEAT');
    const color = this.scene.colors[this.scene.currentStemColor];
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

    const ang = (2 * Math.PI) / this.slices;
    let index = 0;
    let y = 0;
    let currentShearOffset = 0;

    const shearFactor = 0.1;

    for (let j = 0; j < this.stacks; j++) {
      let stackHeight = (this.stackHeights[j] * this.height) / this.totalHeight;
      let shearDirection = j % 2 === 0 ? 1 : -1;
      let shearOffsetBottom = currentShearOffset;
      let shearOffsetTop = currentShearOffset + shearFactor * shearDirection;

      for (let i = 0; i < this.slices; i++) {
        let x1 = this.radius * Math.cos(ang * i) + shearOffsetBottom;
        let z1 = this.radius * Math.sin(ang * i);
        let x2 = this.radius * Math.cos(ang * (i + 1)) + shearOffsetBottom;
        let z2 = this.radius * Math.sin(ang * (i + 1));

        let x1Top = this.radius * Math.cos(ang * i) + shearOffsetTop;
        let x2Top = this.radius * Math.cos(ang * (i + 1)) + shearOffsetTop;

        this.vertices.push(x1, y, z1, x2, y, z2, x1Top, y + stackHeight, z1, x2Top, y + stackHeight, z2);

        this.indices.push(index, index + 2, index + 1, index + 1, index + 2, index + 3);

        let normalAngle = ang * i + Math.atan(shearOffsetBottom / this.height);
        this.normals.push(Math.cos(normalAngle), 0, Math.sin(normalAngle));
        normalAngle = ang * (i + 1) + Math.atan(shearOffsetBottom / this.height);
        this.normals.push(Math.cos(normalAngle), 0, Math.sin(normalAngle));
        normalAngle = ang * i + Math.atan(shearOffsetTop / this.height);
        this.normals.push(Math.cos(normalAngle), 0, Math.sin(normalAngle));
        normalAngle = ang * (i + 1) + Math.atan(shearOffsetTop / this.height);
        this.normals.push(Math.cos(normalAngle), 0, Math.sin(normalAngle));

        // Texture coordinates
        this.texCoords.push(i / this.slices, j / this.stacks, (i + 1) / this.slices, j / this.stacks, i / this.slices, (j + 1) / this.stacks, (i + 1) / this.slices, (j + 1) / this.stacks);

        index += 4; // Next quad
      }

      currentShearOffset = shearOffsetTop;
      y += stackHeight;
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
    this.scene.pushMatrix();
    this.scene.scale(2, 2, 0);
    this.scene.translate(this.radius / 3, this.height / 4, 0);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.leaf.display();
    this.scene.popMatrix();
  }
}
