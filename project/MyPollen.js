import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyPollen extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 16, 8);

        this.texture = new CGFappearance(scene);
        this.texture.setAmbient(0.9, 0.5, 0.2, 1);
        this.texture.setDiffuse(0.9, 0.5, 0.2, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('textures/pollen.jpg');
        this.texture.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.texture.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.2, 0.25);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.3, 0.25); 
        this.scene.rotate(Math.PI, 1, 0, 0); 
        this.sphere.display();
        this.scene.popMatrix();
    }
}