import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyTriangle } from './MyTriangle.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
import { MyTriangleBig } from './MyTriangleBig.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);

        this.angle_45 = Math.PI / 4;
        this.angle_90 = Math.PI / 2;
        this.angle_135 = (Math.PI / 2) + Math.PI / 4;
        this.angle_180 = Math.PI;
        this.angle_270 = 3 * (Math.PI / 2);
        this.angle_315 = 3 * (Math.PI / 2) + Math.PI / 4;
        this.angle_360 = 2 * Math.PI;
        
        // --- Diamond --- //
    
        this.tx_diamond = 0;
        this.ty_diamond = 1;
        this.tz_diamond = 0;
        
        this.rotateGreenDiamond = [
          Math.cos(this.angle_45), -Math.sin(this.angle_45), 0.0, 0.0,
          Math.sin(this.angle_45), Math.cos(this.angle_45), 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];

        this.rotateGreenDiamond_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, Math.cos(this.angle_90), -Math.sin(this.angle_90), 0.0,
          0.0, Math.sin(this.angle_90), Math.cos(this.angle_90), 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];
    
        this.translateGreenDiamond = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          this.tx_diamond, this.ty_diamond, this.tz_diamond, 1.0,
        ];

        this.translateGreenDiamond_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          3.0, 0.01, 2.0, 1.0,
        ];
    
    
        // --- Parallel --- // 
    
        this.rotateYellowParallel = [
            Math.cos(this.angle_180), 0.0, Math.sin(this.angle_180), 0.0,
            0.0, 1.0, 0.0, 0.0,
            -Math.sin(this.angle_180), 0.0, Math.cos(this.angle_180), 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];

        this.rotateYellowParallel_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, Math.cos(this.angle_90), -Math.sin(this.angle_90), 0.0,
          0.0, Math.sin(this.angle_90), Math.cos(this.angle_90), 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];
    
        this.rotateYellowParallel_315 = [
          Math.cos(this.angle_315), -Math.sin(this.angle_315), 0.0, 0.0,
          Math.sin(this.angle_315), Math.cos(this.angle_315), 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];
    
        this.tx_parallel = -3;
        this.ty_parallel = 1;
        this.tz_parallel = 0;
    
        this.translateYellowParallel = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          this.tx_parallel, this.ty_parallel, this.tz_parallel, 1.0,
        ];

        this.translateYellowParallel_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          3.0, 0.01, 2.0, 1.0,
        ];
    
        // --- Triangle --- //
    
        this.tx_triangle = 1;
        this.ty_triangle = -1;
        this.tz_triangle = 0;
    
        this.rotatePinkTriangle = [
          Math.cos(this.angle_135), -Math.sin(this.angle_135), 0.0, 0.0,
          Math.sin(this.angle_135), Math.cos(this.angle_135), 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];

        this.rotatePinkTriangle_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, Math.cos(this.angle_90), -Math.sin(this.angle_90), 0.0,
          0.0, Math.sin(this.angle_90), Math.cos(this.angle_90), 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];
    
        this.translatePinkTriangle = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          this.tx_triangle, this.ty_triangle, this.tz_triangle, 1.0,
        ];

        this.translatePinkTriangle_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          3.0, 0.01, 2.0, 1.0,
        ];
    
        // --- Big Triangle 1 --- //
    
        this.tx_trianglebig1 = 1;
        this.ty_trianglebig1 = -1;
        this.tz_trianglebig1 = 0;
    
        this.rotateBlueTriangleBig = [
          Math.cos(this.angle_45), -Math.sin(this.angle_45), 0.0, 0.0,
          Math.sin(this.angle_45), Math.cos(this.angle_45), 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];

        this.rotateBlueTriangleBig_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, Math.cos(this.angle_90), -Math.sin(this.angle_90), 0.0,
          0.0, Math.sin(this.angle_90), Math.cos(this.angle_90), 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];
        
        this.translateBlueTriangleBig = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            this.tx_trianglebig1, this.ty_trianglebig1, this.tz_trianglebig1, 1.0,
        ];

        this.translateBlueTriangleBig_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          3.0, 0.01, 2.0, 1.0,
        ];
        
    
        // --- Triangle Big 2 --- //
    
        this.tx_trianglebig2 = -1;
        this.ty_trianglebig2 = 1;
        this.tz_trianglebig2 = 0;
    
        this.rotateOrangeTriangleBig = [
          Math.cos(-this.angle_135), -Math.sin(-this.angle_135), 0.0, 0.0,
          Math.sin(-this.angle_135), Math.cos(-this.angle_135), 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];

        this.rotateOrangeTriangleBig_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, Math.cos(this.angle_90), -Math.sin(this.angle_90), 0.0,
          0.0, Math.sin(this.angle_90), Math.cos(this.angle_90), 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];

        this.translateOrangeTriangleBig = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            this.tx_trianglebig2, this.ty_trianglebig2, this.tz_trianglebig2, 1.0,
        ];

        this.translateOrangeTriangleBig_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          3.0, 0.01, 2.0, 1.0,
        ];
    
    
        // --- Small Triangle 1 --- //
    
        this.tx_trianglesmall1 = -1;
        this.ty_trianglesmall1 = 0;
        this.tz_trianglesmall1 = 0;
    
        this.rotateRedTriangleSmall = [
            Math.cos(this.angle_45), -Math.sin(this.angle_45), 0.0, 0.0,
            Math.sin(this.angle_45), Math.cos(this.angle_45), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];

        this.rotateRedTriangleSmall_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, Math.cos(this.angle_90), -Math.sin(this.angle_90), 0.0,
          0.0, Math.sin(this.angle_90), Math.cos(this.angle_90), 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];
    
        this.translateRedTriangleSmall = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            this.tx_trianglesmall1, this.ty_trianglesmall1, this.tz_trianglesmall1, 1.0,
        ];

        this.translateRedTriangleSmall_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          3.0, 0.01, 2.0, 1.0,
        ];
    
        // --- Triangle Small 2 --- //
    
        this.tx_trianglesmall2 = -2;
        this.ty_trianglesmall2 = 1;
        this.tz_trianglesmall2 = 0;

        this.rotatePurpleTriangleSmall = [
            Math.cos(-this.angle_45), -Math.sin(-this.angle_45), 0.0, 0.0,
            Math.sin(-this.angle_45), Math.cos(-this.angle_45), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];

        this.rotatePurpleTriangleSmall_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, Math.cos(this.angle_90), -Math.sin(this.angle_90), 0.0,
          0.0, Math.sin(this.angle_90), Math.cos(this.angle_90), 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];
    
        this.translatePurpleTriangleSmall = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            this.tx_trianglesmall2, this.ty_trianglesmall2, this.tz_trianglesmall2, 1.0,
        ];

        this.translatePurpleTriangleSmall_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          3.0, 0.01, 2.0, 1.0,
        ];
        
        this.initMaterials();

    }

    initMaterials(){
      
      // Green Diamond Material
      this.greenDiamondMaterial = new CGFappearance(this.scene);
      this.greenDiamondMaterial.setAmbient(0, 1, 0, 1.0);
      this.greenDiamondMaterial.setDiffuse(0, 1, 0, 0);
      this.greenDiamondMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
      this.greenDiamondMaterial.setShininess(10.0);

      // Orange Big Triangle Material
      this.orangeBigTriangleMaterial = new CGFappearance(this.scene);
      this.orangeBigTriangleMaterial.setAmbient(1, 0.647, 0, 1.0);
      this.orangeBigTriangleMaterial.setDiffuse(1, 0.647, 0, 0);
      this.orangeBigTriangleMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
      this.orangeBigTriangleMaterial.setShininess(10.0);

      // Blue Big Triangle Material
      this.blueBigTriangleMaterial = new CGFappearance(this.scene);
      this.blueBigTriangleMaterial.setAmbient(0, 0, 1, 1.0);
      this.blueBigTriangleMaterial.setDiffuse(0, 0, 1, 0);
      this.blueBigTriangleMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
      this.blueBigTriangleMaterial.setShininess(10.0);

      // Yellow Parallelogram Material
      this.yellowParallelogramMaterial = new CGFappearance(this.scene);
      this.yellowParallelogramMaterial.setAmbient(1, 1, 0, 1.0);
      this.yellowParallelogramMaterial.setDiffuse(1, 1, 0, 0);
      this.yellowParallelogramMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
      this.yellowParallelogramMaterial.setShininess(10.0);

      // Red Small Triangle Material
      this.redSmallTriangleMaterial = new CGFappearance(this.scene);
      this.redSmallTriangleMaterial.setAmbient(1, 0, 0, 1.0);
      this.redSmallTriangleMaterial.setDiffuse(1, 0, 0, 0);
      this.redSmallTriangleMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
      this.redSmallTriangleMaterial.setShininess(10.0);

      // Purple Small Triangle Material
      this.purpleSmallTriangleMaterial = new CGFappearance(this.scene);
      this.purpleSmallTriangleMaterial.setAmbient(0.5, 0, 0.5, 1.0);
      this.purpleSmallTriangleMaterial.setDiffuse(0.5, 0, 0.5, 0);
      this.purpleSmallTriangleMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
      this.purpleSmallTriangleMaterial.setShininess(10.0);

      // Pink Triangle Material
      this.pinkTriangleMaterial = new CGFappearance(this.scene);
      this.pinkTriangleMaterial.setAmbient(1, 0.753, 0.796, 1.0);
      this.pinkTriangleMaterial.setDiffuse(1, 0.753, 0.796, 0);
      this.pinkTriangleMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
      this.pinkTriangleMaterial.setShininess(10.0);

    }


    display() {
        this.scene.pushMatrix();
        this.scene.multMatrix(this.translateGreenDiamond_2);
        this.scene.multMatrix(this.rotateGreenDiamond_2);
        this.scene.multMatrix(this.rotateGreenDiamond);
        this.scene.multMatrix(this.translateGreenDiamond);
        this.greenDiamondMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(this.translatePinkTriangle_2);
        this.scene.multMatrix(this.rotatePinkTriangle_2);
        this.scene.multMatrix(this.rotatePinkTriangle);
        this.scene.multMatrix(this.translatePinkTriangle);
        this.pinkTriangleMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(this.translateYellowParallel_2);
        this.scene.multMatrix(this.rotateYellowParallel_2);
        this.scene.multMatrix(this.rotateYellowParallel);
        this.scene.multMatrix(this.rotateYellowParallel_315);
        this.scene.multMatrix(this.translateYellowParallel);
        this.yellowParallelogramMaterial.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(this.translateBlueTriangleBig_2);
        this.scene.multMatrix(this.rotateBlueTriangleBig_2);
        this.scene.multMatrix(this.rotateBlueTriangleBig);
        this.scene.multMatrix(this.translateBlueTriangleBig);
        this.blueBigTriangleMaterial.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(this.translateOrangeTriangleBig_2);
        this.scene.multMatrix(this.rotateOrangeTriangleBig_2);
        this.scene.multMatrix(this.rotateOrangeTriangleBig);
        this.scene.multMatrix(this.translateOrangeTriangleBig);
        this.orangeBigTriangleMaterial.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(this.translateRedTriangleSmall_2);
        this.scene.multMatrix(this.rotateRedTriangleSmall_2);
        this.scene.multMatrix(this.rotateRedTriangleSmall);
        this.scene.multMatrix(this.translateRedTriangleSmall);
        this.redSmallTriangleMaterial.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(this.translatePurpleTriangleSmall_2);
        this.scene.multMatrix(this.rotatePurpleTriangleSmall_2);
        this.scene.multMatrix(this.rotatePurpleTriangleSmall);
        this.scene.multMatrix(this.translatePurpleTriangleSmall);
        this.purpleSmallTriangleMaterial.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

    }

    enableNormalViz(){
        this.diamond.enableNormalViz()
        this.triangle.enableNormalViz()
        this.triangleBig.enableNormalViz()
        this.triangleSmall.enableNormalViz()
        this.parallelogram.enableNormalViz()
    };

    disableNormalViz(){
        this.diamond.disableNormalViz()
        this.triangle.disableNormalViz()
        this.triangleBig.disableNormalViz()
        this.triangleSmall.disableNormalViz()
        this.parallelogram.disableNormalViz()
    };


}