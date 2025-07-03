import {CGFobject} from '../lib/CGF.js';
import {MyStem} from './MyStem.js';
import {MyReceptacle} from './MyReceptacle.js';
import {MyPetal} from './MyPetal.js';
import {MyPollen} from './MyPollen.js';


export class MyFlower extends CGFobject {
    constructor(scene, numPetals = 3, receptacleRadius = 1.5, stemRadius = 0.5, stemHeight = 5, hasPollen, x, z) { 
        super(scene);
        this.numPetals = numPetals;
        this.receptacleRadius = receptacleRadius;
        this.stemRadius = stemRadius;
        this.stemHeight = stemHeight;
        this.petals = new MyPetal(this.scene, 20, 5);
        this.stem = new MyStem(this.scene, 30, Math.random() * 8 + 2, this.stemRadius, this.stemHeight, false);
        this.receptacle = new MyReceptacle(this.scene, 30, 100, this.receptacleRadius);
        this.hasPollen = hasPollen;
        this.x = x;
        this.y = -40 + this.stemHeight + this.receptacleRadius*2;
        this.z = z;
        this.initBuffers();
    }

    initBuffers() {
        this.petals = [];
        this.stem = new MyStem(this.scene, 16, Math.random() * 8 + 2, this.stemRadius, this.stemHeight, false);
        this.receptacle = new MyReceptacle(this.scene, 30, 100, this.receptacleRadius);
        
        for (let i = 0; i < this.numPetals; i++) {
            this.petals.push(new MyPetal(this.scene, 60, 50));
        }

        if (this.hasPollen) {
            this.pollen = new MyPollen(this.scene);
        }
    }

    display() {

        if(this.hasPollen){
            this.scene.pushMatrix();
            this.scene.translate(0,this.stemHeight,this.receptacleRadius+0.2);
            this.pollen.display();
            this.scene.popMatrix();
        }
        
        this.scene.pushMatrix();
        this.stem.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.translateReceptacle = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
           0, this.stemHeight, 0, 1
        ];
        this.scene.multMatrix(this.translateReceptacle);
        this.receptacle.display();
        this.scene.popMatrix();
        
        const angleIncrement = 2 * Math.PI / this.numPetals;
        const petalsRadius = this.receptacleRadius / 2; 

        for (let i = 0; i < this.numPetals; i++) {
            this.scene.pushMatrix();
            this.scene.scale(2, 2, 1); 
            this.scene.translate(0, this.stemHeight/2, 0);
            this.scene.rotate(i * angleIncrement, 0, 0, 1);
            this.scene.translate(0, petalsRadius - 0.5, 0); 
            this.petals[i].display();
            this.scene.popMatrix();
        }
    }

    updatePetalsColor(color) {
        const colorValues = this.scene.colors[color];
        if (!colorValues) {
            console.error(`Invalid color key: ${color}`);
            return;
        }
        for (let petal of this.petals) {
            petal.setColor(colorValues);
        }

        this.initBuffers();
    }

    updateReceptacleColor(color) {
        const colorValues = this.scene.colors[color];
        if (!colorValues) {
            console.error(`Invalid color key: ${color}`);
            return;
        }
        this.receptacle.setColor(colorValues);

        this.initBuffers();
    }

    updateStemColor(color) {
        const colorValues = this.scene.colors[color];
        if (!colorValues) {
            console.error(`Invalid color key: ${color}`);
            return;
        }
        this.stem.setColor(colorValues);

        this.initBuffers();
    }

    updateReceptacleRadius(radius) {
        if (radius !== this.receptacleRadius) {
            this.receptacleRadius = radius;
        }

        this.initBuffers();
    }

    updateStemRadius(radius) {
        if (radius !== this.stemRadius) {
            this.stemRadius = radius;
        }

        this.initBuffers();
    }

    updateStemHeight(height) {
        if (height !== this.stemHeight) {
            this.stemHeight = height;
        }

        this.initBuffers();
    }

    updatePetals(numPetals) {
        if (numPetals !== this.numPetals) {
            this.numPetals = numPetals;
        }

        this.initBuffers();
    }
    
}