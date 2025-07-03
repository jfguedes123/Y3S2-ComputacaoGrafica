import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            -0.5, -0.5, 0.5, // 0
            -0.5, 0.5, 0.5, // 1
            0.5, 0.5, 0.5, // 2
            0.5, -0.5, 0.5, // 3
            0.5, -0.5, -0.5, // 4
            -0.5, -0.5, -0.5, // 5
            -0.5, 0.5, -0.5, // 6
            0.5, 0.5, -0.5, // 7
        ];

        // Counter-clockwise reference of vertices
        this.indices = [
            // Front face
            0, 2, 1,
            0, 3, 2,

            // Top face
            1, 7, 6, 
            1, 2, 7,

            // Right face
            3, 4, 7, 
            3, 7, 2,

            // Left face
            5, 1, 6, 
            0, 1, 5, 

            // Back face
            7, 4, 6, 
            5, 6, 4,

            // Bottom face
            0, 5, 3, 
            4, 3, 5,
        ];

        //The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
}