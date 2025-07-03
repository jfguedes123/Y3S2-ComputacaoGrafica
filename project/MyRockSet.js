import {CGFobject} from '../lib/CGF.js';
import {MyRock} from './MyRock.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyRockSet extends CGFobject {
    constructor(scene, numRocks) {
        super(scene);
        this.rocks = [];

        for(let i = 0; i < numRocks; i++) {
            let slices = Math.floor(Math.random() * 10) + 10;
            let stacks = Math.floor(Math.random() * 10) + 10;
            let rock = new MyRock(scene, slices, stacks);

            rock.rotate(Math.random() * 2 * Math.PI, 0, 1, 0);

            rock.scale(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5);

            rock.translate(Math.random() * 10 - 5, 0, Math.random() * 10 - 5);

            this.rocks.push(rock);
        }
    }

    display() {
        for(let rock of this.rocks) {
            rock.display();
        }
    }
}