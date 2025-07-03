import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyPollen } from './MyPollen.js';

export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);

        this.hasPollen = false;
        this.x = 35;
        this.y = -40;
        this.z = 0;
    
        this.sphere = new MySphere(scene, 16, 8);

        this.pollen = new MyPollen(scene);
    
        this.material = new CGFappearance(scene);
        this.material.setAmbient(1, 1, 0, 1); 
        this.material.setDiffuse(1, 1, 0, 1); 
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
    
        this.texture = new CGFtexture(scene, 'textures/hive.jpg');
        this.material.setTexture(this.texture);
    }

    getHive() {
        return this;
    }

    display() {
        if(this.hasPollen){
            this.scene.pushMatrix();
            this.scene.translate(35, -34, 0);
            this.pollen.display();
            this.scene.popMatrix();
        }

        console.log(this.hasPollen);

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(3.5, 6, 3.5);
        this.material.apply(); // Apply the material
        this.sphere.display();
        this.scene.popMatrix();
    }
}