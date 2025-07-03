import { CGFobject } from "../lib/CGF.js";
/**
 * MyTriangleBig
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig extends CGFobject {
    constructor(scene, color) {
        super(scene);
        this.initBuffers(color);
    }

    initBuffers(color) {
        this.vertices = [
            -2, 0, 0,	//0
            2, 0, 0,	//1
            0, 2, 0,    //2
            -2, 0, 0,	//3
            2, 0, 0,	//4
            0, 2, 0,    //5
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            5, 4, 3
        ];

        this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
            0, 0, -1,
			0, 0, -1,
			0, 0, -1
		]
        
        if (color === 'blue') {
            this.texCoords = [
                0, 0, 
                1, 0, 
                0.5, 0.5, 
                0, 0, 
                1, 0, 
                0.5, 0.5
            ]
        } else if (color === 'orange') {
            this.texCoords = [
                1, 0, 
                1, 1, 
                0.5, 0.5, 
                1, 0, 
                1, 1, 
                0.5, 0.5
            ]
        }

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveTypes = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}