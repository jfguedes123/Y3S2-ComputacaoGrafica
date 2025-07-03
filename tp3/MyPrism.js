import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 2 * Math.PI / this.slices;
        let index = 0;

        for (let i = 0; i < this.slices; i++) {
            let x1 = Math.cos(ang * i);
            let y1 = Math.sin(ang * i);
            let x2 = Math.cos(ang * (i + 1));
            let y2 = Math.sin(ang * (i + 1));

            let z = 1 / this.stacks;

            for (let j = 0; j < this.stacks; j++) {
                let x = Math.cos((i+0.5)*ang);
                let y = Math.sin((i+0.5)*ang);
                let size = Math.sqrt(x*x + y*y);

                this.vertices.push(x1, y1, j * z, x2, y2, j * z, x1, y1, (j + 1) * z, x2, y2, (j + 1) * z);
                this.indices.push(index, index + 1, index + 2, index + 3, index + 2, index + 1);
                this.normals.push(x/size, y/size, 0, x/size, y/size, 0, x/size, y/size, 0, x/size, y/size, 0);
                index += 4;
            }
        }

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    updateBuffers(complexity){
        this.slices = 5 + Math.round(5 * complexity); //complexity varies 0-1, so slices varies 5-10

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}