import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
    constructor(scene, color) {
        super(scene);
        this.initBuffers(color);
    }

    initBuffers(color) {
        this.vertices = [
            -1, 0, 0,	//0
            1, 0, 0,	//1
            0, 1, 0,    //2
            -1, 0, 0,	//3
            1, 0, 0,	//4
            0, 1, 0,    //5
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            5, 4, 3,
        ];

        this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
            0, 0, -1,
			0, 0, -1,
			0, 0, -1
		]
        
        if (color === 'purple') {
            this.texCoords = [
                0, 0, 
                0, 0.5, 
                0.25, 0.25, 
                0, 0, 
                0, 0.5, 
                0.25, 0.25
            ]
        } else if (color === 'red') {
            this.texCoords = [
                0.25, 0.75, 
                0.75, 0.75, 
                0.5, 0.5, 
                0.25, 0.75, 
                0.75, 0.75, 
                0.5, 0.5
            ]
        }


        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers(); 
    }
}