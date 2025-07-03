import {CGFobject} from '../lib/CGF.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        for(let stack = 0; stack <= this.stacks; stack++) {
            let theta = stack * Math.PI / this.stacks;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);
        
            for(let slice = 0; slice <= this.slices; slice++) {
                let phi = slice * 2 * Math.PI / this.slices;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);
        
                let x = -cosPhi * sinTheta; // Invert the sphere
                let y = -cosTheta; // Invert the sphere
                let z = -sinPhi * sinTheta; // Invert the sphere
                let u = (slice / this.slices); // Flip the texture horizontally
                let v = 1 - (stack / this.stacks); // Flip the texture vertically
        
                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
                this.texCoords.push(u, v);
            }
        }

        
        for(let stack = 0; stack < this.stacks; stack++) {
            for(let slice = 0; slice < this.slices; slice++) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;
        
                this.indices.push(first, first + 1, second);
                this.indices.push(second, first + 1, second + 1);
            }
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();


    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(100, 100, 100); // Scale the sphere
        super.display();
        this.scene.popMatrix();
    }
}