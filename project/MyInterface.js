import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.gui = new dat.GUI();

        // Existing checkboxes
        this.gui.add(this.scene, 'displayLargeGrass').name('Display Large Grass');
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayPlane').name('Display Plane');
        this.gui.add(this.scene, 'displaySphere').name('Display Sphere');
        this.gui.add(this.scene, 'displayPanorama').name('Display Panorama');
        this.gui.add(this.scene, 'displayPetals').name('Display Petals');
        this.gui.add(this.scene, 'displayStem').name('Display Stem');
        this.gui.add(this.scene, 'displayFlower').name('Display Flower');
        this.gui.add(this.scene, 'displayReceptacle').name('Display Receptacle');
        this.gui.add(this.scene, 'displayNormals').name('Display Normals');
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
        this.gui.add(this.scene, 'displayGarden').name('Display Garden');
        this.gui.add(this.scene, 'displayLeaf').name('Display Leaf');
        this.gui.add(this.scene, 'displayRock').name('Display Rock');
        this.gui.add(this.scene, 'displayRockSet').name('Display Rock Set');
        this.gui.add(this.scene, 'displayBee').name('Display Bee');
        // Flower settings folder
        const flowerSettings = this.gui.addFolder('Flower Settings');

        // Slider for the number of petals
        flowerSettings.add(this.scene.flower, 'numPetals', 1, 12, 1)
            .name('Number of Petals')
            .onChange(value => this.scene.flower.updatePetals(value));

        // Slider for receptacle radius
        let receptacleRadiusController = flowerSettings.add(this.scene.flower, 'receptacleRadius', 1, 10)
            .name('Heart Radius')
            .onChange(value => {
                this.scene.flower.updateReceptacleRadius(value);
                stemRadiusController.max(value - 1).updateDisplay();
            });

        // Slider for stem radius
        let stemRadiusController = flowerSettings.add(this.scene.flower, 'stemRadius', 0.5, this.scene.flower.receptacleRadius - 1)
            .name('Stem Radius')
            .onChange(value => this.scene.flower.updateStemRadius(value));

        // Slider for stem height
        flowerSettings.add(this.scene.flower, 'stemHeight', 1, 10)
            .name('Stem Height')
            .onChange(value => this.scene.flower.updateStemHeight(value));

        // Dropdowns for colors
        flowerSettings.add(this.scene, 'currentPetalsColor', Object.keys(this.scene.colors))
            .name('Petals Color')
            .onChange(value => this.scene.flower.updatePetalsColor(value));

        flowerSettings.add(this.scene, 'currentReceptacleColor', Object.keys(this.scene.colors))
            .name('Heart Color')
            .onChange(value => this.scene.flower.updateReceptacleColor(value));

        flowerSettings.add(this.scene, 'currentStemColor', Object.keys(this.scene.colors))
            .name('Stem Color')
            .onChange(value => this.scene.flower.updateStemColor(value));
        

        const gardenSettings = this.gui.addFolder('Garden Settings');

        gardenSettings.add(this.scene.garden, 'rows', 1, 10, 1)
            .name('Number of Rows')
            .onChange(value => this.scene.garden.updateRows(value));
        gardenSettings.add(this.scene.garden, 'columns', 1, 10, 1)
            .name('Number of Columns')
            .onChange(value => this.scene.garden.updateColumns(value));

        const beeSettings = this.gui.addFolder('Bee Settings');

        beeSettings.add(this.scene.bee, 'speedFactor', 0.1, 3, 0.1)
            .name('Speed Factor')
            .onChange(value => this.scene.updateSpeedFactor(value));
        beeSettings.add(this.scene.bee, 'scaleBee', 0.5, 3, 0.1)
            .name('Scale Bee')
            .onChange(value => this.scene.bee.updateScale(value));
        
        
        this.initKeys();
        
        return true;
    }

    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function () { };
        this.activeKeys = {};
    }

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    };

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}
