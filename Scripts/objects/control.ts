/// <reference path="../../typings/tsd.d.ts"/>

module objects {

    // CONTROL CLASS
    export class Control { 

        //PUBLIC INSTANCE VARIABLES 
        public rotationSpeedX: number;
        public rotationSpeedY: number;
        public rotationSpeedZ: number;

        public cubeColor: number;

        // CONSTRUCTOR 
        constructor(rotationSpeedX: number, rotationSpeedY: number, rotationSpeedZ: number, cubeColor:number) {
            this.rotationSpeedX = rotationSpeedX;
            this.rotationSpeedY = rotationSpeedY;
            this.rotationSpeedZ = rotationSpeedZ;

            this.cubeColor = cubeColor;
        }
        
        
    }
}
