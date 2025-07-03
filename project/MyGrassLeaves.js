import { CGFobject, CGFappearance, CGFtexture, CGFshader } from '../lib/CGF.js';

export class MyGrassLeaves extends CGFobject {
    constructor(scene, curve = 20, angle = 5) {
        super(scene);
        this.angle = angle;
        this.curve = curve;
        this.initBuffers();

        this.material = new CGFappearance(this.scene);
        this.texture = new CGFtexture(this.scene, 'textures/leaf.jpg'); // Load texture
        this.material.setTexture(this.texture);
        this.material.setAmbient(0.1, 0.4, 0.1, 1);
        this.material.setDiffuse(0.4, 0.8, 0.4, 1);
        this.material.setSpecular(0.1, 0.3, 0.1, 1);
        this.material.setShininess(10.0);

        //this.shader = new CGFshader(this.scene.gl, "shaders/grass.vert", "shaders/grass.frag");
        //this.shader.setUniformsValues({ timeFactor: 0.0 });
    }

    initBuffers() {
        const bend = Math.sin(this.curve * Math.PI / 180); 
        this.vertices = [
            0, 0, 0,    // Vertex 0 (middle of the base)
            0.2, 0, 0,  // Vertex 1 (right base)
            0, 2, -bend, // Vertex 2 (top)
            -0.2, 0, 0, // Vertex 3 (left base)
        ];

        this.indices = [
            0, 1, 2,    // Triangle 1
            0, 2, 3,    // Triangle 2
            0, 2, 1,    // Triangle 1 back face
            0, 3, 2,    // Triangle 2 back face
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
        ];

        this.texCoords = [
            0.5, 0,    // Corresponds to Vertex 0
            1, 0,      // Corresponds to Vertex 1
            0.5, 1,    // Corresponds to Vertex 2
            0, 0,      // Corresponds to Vertex 3
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();  
        this.scene.rotate(this.angle * Math.PI / 180, 0, 0, 1);  
        //this.scene.setActiveShader(this.shader); 
        this.material.apply();
        //this.shader.setUniformsValues({ timeFactor: performance.now() / 1000 });
        super.display();
        //this.scene.setActiveShader(this.scene.defaultShader); 
        this.scene.popMatrix(); 
    }
}
