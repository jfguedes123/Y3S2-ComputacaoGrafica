import {CGFobject} from '../lib/CGF.js';
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
        
        this.rotateDiamond = [
          Math.cos(this.angle_45), -Math.sin(this.angle_45), 0.0, 0.0,
          Math.sin(this.angle_45), Math.cos(this.angle_45), 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];

        this.rotateDiamond2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, Math.cos(this.angle_90), -Math.sin(this.angle_90), 0.0,
          0.0, Math.sin(this.angle_90), Math.cos(this.angle_90), 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];
    
        this.translateDiamond = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          this.tx_diamond, this.ty_diamond, this.tz_diamond, 1.0,
        ];

        this.translateDiamond2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          3.0, 0.01, 2.0, 1.0,
        ];
    
    
        // --- Parallel --- // 
    
        this.rotateParallel = [
            Math.cos(this.angle_180), 0.0, Math.sin(this.angle_180), 0.0,
            0.0, 1.0, 0.0, 0.0,
            -Math.sin(this.angle_180), 0.0, Math.cos(this.angle_180), 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];

        this.rotateParallel2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, Math.cos(this.angle_90), -Math.sin(this.angle_90), 0.0,
          0.0, Math.sin(this.angle_90), Math.cos(this.angle_90), 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];
    
        this.rotateX_315 = [
          Math.cos(this.angle_315), -Math.sin(this.angle_315), 0.0, 0.0,
          Math.sin(this.angle_315), Math.cos(this.angle_315), 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];
    
        this.tx_parallel = -3;
        this.ty_parallel = 1;
        this.tz_parallel = 0;
    
        this.translateParallel = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          this.tx_parallel, this.ty_parallel, this.tz_parallel, 1.0,
        ];

        this.translateParallel2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          3.0, 0.01, 2.0, 1.0,
        ];
    
        // --- Triangle --- //
    
        this.tx_triangle = 1;
        this.ty_triangle = -1;
        this.tz_triangle = 0;
    
        this.rotateTriangle = [
          Math.cos(this.angle_135), -Math.sin(this.angle_135), 0.0, 0.0,
          Math.sin(this.angle_135), Math.cos(this.angle_135), 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];

        this.rotateTriangle2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, Math.cos(this.angle_90), -Math.sin(this.angle_90), 0.0,
          0.0, Math.sin(this.angle_90), Math.cos(this.angle_90), 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];
    
        this.translateTriangle = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          this.tx_triangle, this.ty_triangle, this.tz_triangle, 1.0,
        ];

        this.translateTriangle2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          3.0, 0.01, 2.0, 1.0,
        ];
    
        // --- Big Triangle 1 --- //
    
        this.tx_trianglebig1 = 1;
        this.ty_trianglebig1 = -1;
        this.tz_trianglebig1 = 0;
    
        this.rotateTriangleBig1 = [
          Math.cos(this.angle_45), -Math.sin(this.angle_45), 0.0, 0.0,
          Math.sin(this.angle_45), Math.cos(this.angle_45), 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];

        this.rotateTriangleBig1_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, Math.cos(this.angle_90), -Math.sin(this.angle_90), 0.0,
          0.0, Math.sin(this.angle_90), Math.cos(this.angle_90), 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];
        
        this.translateTriangleBig1 = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            this.tx_trianglebig1, this.ty_trianglebig1, this.tz_trianglebig1, 1.0,
        ];

        this.translateTriangleBig1_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          3.0, 0.01, 2.0, 1.0,
        ];
        
    
        // --- Triangle Big 2 --- //
    
        this.tx_trianglebig2 = -1;
        this.ty_trianglebig2 = 1;
        this.tz_trianglebig2 = 0;
    
        this.rotateTriangleBig2 = [
          Math.cos(-this.angle_135), -Math.sin(-this.angle_135), 0.0, 0.0,
          Math.sin(-this.angle_135), Math.cos(-this.angle_135), 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];

        this.rotateTriangleBig2_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, Math.cos(this.angle_90), -Math.sin(this.angle_90), 0.0,
          0.0, Math.sin(this.angle_90), Math.cos(this.angle_90), 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];

        this.translateTriangleBig2 = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            this.tx_trianglebig2, this.ty_trianglebig2, this.tz_trianglebig2, 1.0,
        ];

        this.translateTriangleBig2_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          3.0, 0.01, 2.0, 1.0,
        ];
    
    
        // --- Small Triangle 1 --- //
    
        this.tx_trianglesmall1 = -1;
        this.ty_trianglesmall1 = 0;
        this.tz_trianglesmall1 = 0;
    
        this.rotateTriangleSmall1 = [
            Math.cos(this.angle_45), -Math.sin(this.angle_45), 0.0, 0.0,
            Math.sin(this.angle_45), Math.cos(this.angle_45), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];

        this.rotateTriangleSmall1_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, Math.cos(this.angle_90), -Math.sin(this.angle_90), 0.0,
          0.0, Math.sin(this.angle_90), Math.cos(this.angle_90), 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];
    
        this.translateTriangleSmall1 = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            this.tx_trianglesmall1, this.ty_trianglesmall1, this.tz_trianglesmall1, 1.0,
        ];

        this.translateTriangleSmall1_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          3.0, 0.01, 2.0, 1.0,
        ];
    
        // --- Triangle Small 2 --- //
    
        this.tx_trianglesmall2 = -2;
        this.ty_trianglesmall2 = 1;
        this.tz_trianglesmall2 = 0;
    
        this.rotateTriangleSmall2 = [
            Math.cos(-this.angle_45), -Math.sin(-this.angle_45), 0.0, 0.0,
            Math.sin(-this.angle_45), Math.cos(-this.angle_45), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];

        this.rotateTriangleSmall2_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, Math.cos(this.angle_90), -Math.sin(this.angle_90), 0.0,
          0.0, Math.sin(this.angle_90), Math.cos(this.angle_90), 0.0,
          0.0, 0.0, 0.0, 1.0,
        ];
    
        this.translateTriangleSmall2 = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            this.tx_trianglesmall2, this.ty_trianglesmall2, this.tz_trianglesmall2, 1.0,
        ];

        this.translateTriangleSmall2_2 = [
          1.0, 0.0, 0.0, 0.0,
          0.0, 1.0, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          3.0, 0.01, 2.0, 1.0,
        ];

    }

    display() {
        this.scene.pushMatrix();
        this.scene.multMatrix(this.translateDiamond2);
        this.scene.multMatrix(this.rotateDiamond2);
        this.scene.multMatrix(this.rotateDiamond);
        this.scene.multMatrix(this.translateDiamond);
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(this.translateTriangle2);
        this.scene.multMatrix(this.rotateTriangle2);
        this.scene.multMatrix(this.rotateTriangle);
        this.scene.multMatrix(this.translateTriangle);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(this.translateParallel2);
        this.scene.multMatrix(this.rotateParallel2);
        this.scene.multMatrix(this.rotateParallel);
        this.scene.multMatrix(this.rotateX_315);
        this.scene.multMatrix(this.translateParallel);
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(this.translateTriangleBig1_2);
        this.scene.multMatrix(this.rotateTriangleBig1_2);
        this.scene.multMatrix(this.rotateTriangleBig1);
        this.scene.multMatrix(this.translateTriangleBig1);
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(this.translateTriangleBig2_2);
        this.scene.multMatrix(this.rotateTriangleBig2_2);
        this.scene.multMatrix(this.rotateTriangleBig2);
        this.scene.multMatrix(this.translateTriangleBig2);
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(this.translateTriangleSmall1_2);
        this.scene.multMatrix(this.rotateTriangleSmall1_2);
        this.scene.multMatrix(this.rotateTriangleSmall1);
        this.scene.multMatrix(this.translateTriangleSmall1);
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(this.translateTriangleSmall2_2);
        this.scene.multMatrix(this.rotateTriangleSmall2_2);
        this.scene.multMatrix(this.rotateTriangleSmall2);
        this.scene.multMatrix(this.translateTriangleSmall2);
        this.triangleSmall.display();
        this.scene.popMatrix();

    }

}