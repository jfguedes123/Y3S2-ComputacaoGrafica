import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 1, 0, // 0
            -1, 0, 0, // 1
            1, 0, 0, // 2
            0, 1, 0, // 3
            -1, 0, 0, // 4
            1, 0, 0, // 5
        ];

        this.indices = [
            0, 1, 2,
            1, 0, 2,
            3, 4, 5,
            4, 3, 5
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
        ];
        


        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers(); 
    }
}