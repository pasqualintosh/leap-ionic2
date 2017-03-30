import { Component, AfterViewInit, AfterViewChecked } from '@angular/core';

import { NavController } from 'ionic-angular';

import * as THREE from 'three';

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

    ws: any;
    leapMotionFrame: any;

    animateCallback = {
        callAnimate: (this.animate).bind(this)
    };

    constructor(public navCtrl: NavController) {
    }

    init() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.z = -5; //

        this.geometry = new THREE.BoxGeometry(200, 200, 200);
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 0, 0);
        this.scene.add(this.mesh);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.getElementById('three').appendChild(this.renderer.domElement);
    }

    animate() {
        requestAnimationFrame( this.animateCallback.callAnimate );
        //this.mesh.rotation.x += 0.1;
        //this.mesh.rotation.y += 0.1;
        this.renderer.render(this.scene, this.camera);
    }

    ngAfterViewInit() {
        this.init();
    }

    ngAfterViewChecked() {
        this.animate();
    }

}
