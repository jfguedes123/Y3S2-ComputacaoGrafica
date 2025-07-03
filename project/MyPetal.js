import { CGFobject, CGFappearance } from '../lib/CGF.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 * @param angle - The angle of rotation to simulate curvature of the petal
 */
export class MyPetal extends CGFobject {
    constructor(scene, curve = 20, angle = 5) {  
        super(scene);
        this.angle = angle;
        this.curve = curve;
        this.initBuffers();

        this.material = new CGFappearance(this.scene);
        this.material.loadTexture('../project/textures/petal.jpg');
        const color = this.scene.colors[this.scene.currentPetalsColor]; 
        this.material.setAmbient(...color);
        this.material.setDiffuse(...color);
        this.material.setSpecular(...color);
        this.material.setShininess(10.0);
    }
    
    initBuffers() {
        const bend = Math.sin(this.curve * Math.PI / 180);  
        this.vertices = [
            0, 0, 0,    // Vertex 0
            0.40, 1, -bend,  // Vertex 1
            0, 2, 0,    // Vertex 2
            -0.40, 1, -bend, // Vertex 3
        ];

        this.indices = [
            0, 1, 3,    // Triangle 1
            3, 2, 1,    // Triangle 2
            3, 1, 0,    // Triangle 1 back face
            1, 2, 3,    // Triangle 2 back face
        ];

        this.normals = Array(8).fill(0).map((_, i) => i < 4 ? 0 : 0);

        this.texCoords = [];

        for (let i = 0; i < 4; i++) {
            this.normals[i * 3 + 2] = 1;  
            this.normals[(i + 4) * 3 + 2] = -1; 
        }

        for (let i = 0; i < 4; i++) {
            this.texCoords.push(i / 4, 0);
            this.texCoords.push(i / 4, 1);
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
        this.scene.pushMatrix();  
        this.scene.rotate(this.angle * Math.PI / 180, 0, 0, 1);  
        this.material.apply();
        super.display();
        this.scene.popMatrix();  
    }
}
