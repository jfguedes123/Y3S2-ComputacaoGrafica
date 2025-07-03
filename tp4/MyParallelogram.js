import {CGFobject} from '../lib/CGF.js';
/**
 * MyParrallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [
            0, 0, 0,	//0
            1, 1, 0,    //1
            2, 0, 0,	//2
            3, 1, 0,	//3
            0, 0, 0,	//00
            1, 1, 0,    //11
            2, 0, 0,	//22
            3, 1, 0		//33
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 3, 1,
            0, 2, 3,
            1, 3, 0,
            3, 2, 0,
            4, 7, 5, 
            4, 6, 7,
            5, 7, 4,
            7, 6, 4,
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
			1, 1,
			0.5, 1,
			0.25, 0.75,
			0.75, 0.75,
			1, 1,
			0.5, 1,
			0.25, 0.75,
			0.75, 0.75,
		]

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}