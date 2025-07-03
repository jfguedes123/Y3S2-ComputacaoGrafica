import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";

/**
 * MyGrass
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 * @param {Number} width - Width of the grass patch (optional, default = 10)
 * @param {Number} depth - Depth of the grass patch (optional, default = 10)
 * @param {String} wrapMode - Texture wrap mode, can be 'REPEAT', 'MIRROR', or 'CLAMP' (optional, default = 'REPEAT')
 */
export class MyGrass extends CGFobject {
    constructor(scene, width = 10, depth = 10, wrapMode = 'REPEAT') {
        super(scene);
        this.width = width;
        this.depth = depth;
        this.wrapMode = wrapMode;
        
        this.initBuffers();
        this.initAppearance();
    }

    initBuffers() {
        this.vertices = [
            -this.width / 2, 0, -this.depth / 2,
            this.width / 2, 0, -this.depth / 2,
            -this.width / 2, 0, this.depth / 2,
            this.width / 2, 0, this.depth / 2
        ];

        this.indices = [
            0, 2, 1,
            1, 2, 3
        ];

        this.normals = [
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0
        ];

        this.texCoords = [
            0, 0,
            1, 0,
            0, 1,
            1, 1
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    initAppearance() {
        this.grassTexture = new CGFtexture(this.scene, "textures/grass.jpg");
        this.grassAppearance = new CGFappearance(this.scene);
        this.grassAppearance.setTexture(this.grassTexture);
        
        const wrapTypes = {
            'REPEAT': this.scene.gl.REPEAT,
            'MIRROR': this.scene.gl.MIRRORED_REPEAT,
            'CLAMP': this.scene.gl.CLAMP_TO_EDGE
        };
        let glWrapMode = wrapTypes[this.wrapMode.toUpperCase()] || this.scene.gl.REPEAT;

        this.grassAppearance.setTextureWrap(glWrapMode, glWrapMode);
        this.grassAppearance.setAmbient(0.1, 0.5, 0.1, 1);
        this.grassAppearance.setDiffuse(0.3, 0.7, 0.3, 1);
        this.grassAppearance.setSpecular(0.1, 0.3, 0.1, 1);
        this.grassAppearance.setShininess(10.0);
    }

    display() {
        this.grassAppearance.apply();
        super.display();
    }
}
