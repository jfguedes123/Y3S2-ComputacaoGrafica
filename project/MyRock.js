import {CGFobject, CGFappearance} from '../lib/CGF.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRock extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();

        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.25, 0.25, 0.25, 1.0); // Dark gray
        this.material.setDiffuse(0.4, 0.4, 0.4, 1.0); // Dark gray
        this.material.setSpecular(0.5, 0.5, 0.5, 1.0); // Slightly lighter gray
        this.material.setShininess(10.0); // Adjust to taste

        // Load the texture
        this.material.loadTexture('textures/rock.jpg');

        this.transformationMatrix = mat4.create();
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
        
                let offset = Math.random() * 0.2 - 0.1; 
        
                let x = (slice === 0 || slice === this.slices ? 1 : 1 + offset) * cosPhi * sinTheta;
                let y = stack < this.stacks / 2 ? (1 + offset) * cosTheta : 0; 
                let z = (slice === 0 || slice === this.slices ? 1 : 1 + offset) * sinPhi * sinTheta;
        
                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
                this.texCoords.push(slice / this.slices, stack / this.stacks);
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

    rotate(angle, x, y, z) {
        mat4.rotate(this.transformationMatrix, this.transformationMatrix, angle, [x, y, z]);
    }
    
    scale(sx, sy, sz) {
        mat4.scale(this.transformationMatrix, this.transformationMatrix, [sx, sy, sz]);
    }
    
    translate(tx, ty, tz) {
        mat4.translate(this.transformationMatrix, this.transformationMatrix, [tx, ty, tz]);
    }

    display() {
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.multMatrix(this.transformationMatrix);
        super.display();
        this.scene.popMatrix();
    }
}