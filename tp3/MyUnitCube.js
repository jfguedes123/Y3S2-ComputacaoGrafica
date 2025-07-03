import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
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

            -0.5, -0.5, 0.5, // 00
            -0.5, 0.5, 0.5, // 11
            0.5, 0.5, 0.5, // 22
            0.5, -0.5, 0.5, // 33
            0.5, -0.5, -0.5, // 44
            -0.5, -0.5, -0.5, // 55
            -0.5, 0.5, -0.5, // 66
            0.5, 0.5, -0.5, // 77

            -0.5, -0.5, 0.5, // 00
            -0.5, 0.5, 0.5, // 11
            0.5, 0.5, 0.5, // 22
            0.5, -0.5, 0.5, // 33
            0.5, -0.5, -0.5, // 44
            -0.5, -0.5, -0.5, // 55
            -0.5, 0.5, -0.5, // 66
            0.5, 0.5, -0.5, // 77
        ];

        this.normals = [
            0, 0, 1, // 0z
            0, 0, 1, // 1z
            0, 0, 1, // 2z
            0, 0, 1, // 3z
            0, 0, -1, // 4z
            0, 0, -1, // 5z
            0, 0, -1, // 6z
            0, 0, -1, // 7z

            0, -1, 0, // 0y
            0, 1, 0, // 1y
            0, 1, 0, // 2y
            0, -1, 0, // 3y
            0, -1, 0, // 4y
            0, -1, 0, // 5y
            0, 1, 0, // 6y
            0, 1, 0, // 7y

            -1, 0, 0, // 0x
            -1, 0, 0, // 1x
            1, 0, 0, // 2x 
            1, 0, 0, // 3x
            1, 0, 0, // 4x
            -1, 0, 0, // 5x
            -1, 0, 0, // 6x 
            1, 0, 0, // 7x
        ]

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