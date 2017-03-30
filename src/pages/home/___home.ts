import { Component, AfterViewInit, AfterViewChecked } from '@angular/core';

import { NavController } from 'ionic-angular';

import * as THREE from 'three';
import threeStereoEffect from 'three-stereo-effect';
import threeOrbitControls from 'three-orbit-controls';

const StereoEffect = threeStereoEffect(THREE);
const OrbitControls = threeOrbitControls(THREE);

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit, AfterViewChecked {

    renderer:any;
    scene: any;
    camera:any;
    cube: any;
    animating: boolean;

    ws: any;
    leapMotionFrame: any;

    animateCallback = {
        callAnimate: (this.animate).bind(this)
    };

    constructor(public navCtrl: NavController) {
        this.ws = new WebSocket("ws://" + "192.168.0.104" + ":6437/v6.json");
        this.init();
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.z = 5;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );

    }

    animate() {
        requestAnimationFrame( this.animateCallback.callAnimate );
        // this.cube.rotation.z += 0.01;
        this.renderer.render(this.scene, this.camera);
    }

    ngAfterViewInit() {
        document.getElementById('three').appendChild( this.renderer.domElement );
        // this.renderer.render( this.scene, this.camera );
        // this.animate();
    }

    ngAfterViewChecked() {

        this.ws.onmessage = (event) => {
            this.leapMotionFrame = JSON.parse(event.data);
            // console.log(this.leapMotionFrame.pointables);
            if(this.leapMotionFrame.pointables != undefined) {
                if(this.leapMotionFrame.pointables.length > 0) {
                    // console.log(this.leapMotionFrame.pointables);
                    // this.ws.close();
                    var x = this.leapMotionFrame.pointables[0].stabilizedTipPosition[0];
                    console.log(x/1000);
                    this.cube.rotation.z = x/1000;
                    // this.cube.rotation.y += y;
                    this.renderer.render(this.scene, this.camera);
                    requestAnimationFrame( this.animateCallback.callAnimate );
                } else {
                    this.cube.rotation.z = 0;
                    // this.cube.rotation.y += y;
                    this.renderer.render(this.scene, this.camera);
                    requestAnimationFrame( this.animateCallback.callAnimate );
                }
            }
        }

    }

}
