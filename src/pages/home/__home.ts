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

    scene: any;
    camera: any;
    renderer: any;
    geometry: any;
    material: any;
    mesh: any;
    effect: any;
    controls: any;
    element: any;

    leapMotionFrame: any;

    animateCallback = {
        callAnimate: (this.animate).bind(this)
    };

    constructor(public navCtrl: NavController) {
        //
    }

    init() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
        this.camera.position.set(0, 1, -3)

        this.scene.add(this.camera);

        this.geometry = new THREE.BoxGeometry(200, 200, 200);
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.getElementById('three').appendChild(this.renderer.domElement);

    }

    animate(x: any, y: any) {
        // requestAnimationFrame( this.animateCallback.callAnimate );
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.renderer.render(this.scene, this.camera);
    }

    ngAfterViewInit() {
        this.init();
        this.animate(20, 20);
    }

    ngAfterViewChecked() {

        //

    }

}
