import { CGFobject } from '../lib/CGF.js';

/**
 * MyCone
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyCone extends CGFobject {
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
        this.texCoords = [];  // Add this line to initialize texture coordinates array

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        for (var i = 0; i <= this.slices; i++) {  // Change loop to iterate one more to include last vertex
            // Vertex position
            var x = Math.cos(ang);
            var z = -Math.sin(ang);
            this.vertices.push(x, 0, z);
            
            // Texture coordinates
            var u = 0.5 + x * 0.5;  // Scale and translate to map (1,0) -> (1,0.5)
            var v = 0.5 - z * 0.5;  // Scale and translate to map (0,-1) -> (0.5,1)
            this.texCoords.push(u, v);

            // Normal calculation simplified for lateral surface of cone
            var normal = [x, 0, z];
            var normalMagnitude = Math.sqrt(normal[0] * normal[0] + normal[2] * normal[2]);
            this.normals.push(x / normalMagnitude, 0, z / normalMagnitude);  // Normalizes the lateral normals

            // Index definition
            if (i < this.slices) {
                this.indices.push(i, (i + 1) % (this.slices + 1), this.slices + 1);
            }
            
            ang += alphaAng;
        }

        // Cone tip coordinates and normal
        this.vertices.push(0, 1, 0);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0.5);  // Texture coordinate for the tip of the cone

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); // complexity varies 0-1, so slices varies 3-12

        // Reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
