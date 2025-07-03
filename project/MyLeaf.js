import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";

/**
 * MyLeaf 
 * Represents a leaf in 3D space, with a cylindrical stem and two triangular leaves.
 * @constructor Initializes a new instance of the MyLeaf class.
 * @param {CGFscene} scene - The scene to which this leaf belongs.
 * @param {Number} slices - The number of slices around the leaf.
 * @param {Number} stacks - The number of stacks along the leaf.
 * @param {Number} radius - The radius of the leaf. 
 * @param {Number} height - The height of the leaf.
 */
export class MyLeaf extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
        this.initMaterial();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = []; 

        const cylinderHeight = 1;
        const cylinderRadius = 0.01;
        const slices = 8;
        const ang = (2 * Math.PI) / slices;
        const leafWidth = 1;
        const leafHeight = 1;

        for (let i = 0; i < slices; i++) {
            let x = cylinderRadius * Math.cos(ang * i);
            let z = cylinderRadius * Math.sin(ang * i);

            this.vertices.push(x, 0, z, x, cylinderHeight, z);
            this.normals.push(0, -1, 0, 0, 1, 0);
            this.texCoords.push(i / slices, 0, i / slices, 1); 

            if (i < slices - 1) {
                let next = i + 1;
                this.indices.push(i * 2, next * 2, i * 2 + 1, i * 2 + 1, next * 2, next * 2 + 1);
            }
        }

        this.indices.push((slices - 1) * 2, 0, (slices - 1) * 2 + 1, (slices - 1) * 2 + 1, 0, 1);

        let baseIndex = slices * 2;
        for (let side of [1, -1]) {
            this.vertices.push(0, 0, 0, leafWidth / 4, 0.5, 0, 0, leafHeight, 0);
            this.normals.push(0, 0, side, 0, 0, side, 0, 0, side);
            this.texCoords.push(0.5, 1, 0.75, 0.5, 0.5, 0);

            this.vertices.push(0, 0, 0, 0, leafHeight, 0, -leafWidth / 4, 0.5, 0);
            this.normals.push(0, 0, side, 0, 0, side, 0, 0, side);
            this.texCoords.push(0.5, 1, 0.5, 0, 0.25, 0.5);

            this.indices.push(baseIndex, baseIndex + 1, baseIndex + 2);
            baseIndex += 3;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    initMaterial() {
        this.material = new CGFappearance(this.scene);
        this.texture = new CGFtexture(this.scene, 'textures/leaf.jpg'); // Load texture
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.material.setAmbient(0.1, 0.4, 0.1, 1);
        this.material.setDiffuse(0.4, 0.8, 0.4, 1);
        this.material.setSpecular(0.1, 0.3, 0.1, 1);
        this.material.setShininess(10.0);
    }

    display() {
        this.scene.gl.disable(this.scene.gl.CULL_FACE); 
        this.material.apply(); 
        super.display();
        this.scene.gl.enable(this.scene.gl.CULL_FACE); 
    }
}
