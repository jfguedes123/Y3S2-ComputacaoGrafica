import { MyGrass } from './MyGrass.js';

/**
 * MyLargeGrass 
 * @constructor 
 * @param {CGFscene} scene main scene
 */
export class MyLargeGrass extends MyGrass {
    constructor(scene) {
        super(scene, 200, 200);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, -40, 0);
        this.scene.scale(1, 1, 1);
        super.display();
        this.scene.popMatrix();
    }
}