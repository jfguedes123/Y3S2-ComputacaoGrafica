import { CGFobject } from "../lib/CGF.js";
/**
 * MyTriangleBig
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 2, 0, //0
            -2, 0, 0, //1
            2, 0, 0, //2
            0, 2, 0, //00
            -2, 0, 0, //11
            2, 0, 0 //22
        ];

        //Counter-clockwise reference of vertices
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
            0, 0, -1
        ];
        

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveTypes = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}