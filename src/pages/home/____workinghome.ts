import { Component, AfterViewInit, AfterViewChecked } from '@angular/core';

import { NavController } from 'ionic-angular';

import * as THREE from 'three';

import VREffect from 'three-vreffect';
import threeStereoEffect from 'three-stereo-effect';
import threeOrbitControls from 'three-orbit-controls';

import * as LeapJs from 'leapjs';
import LeapJsPlugins from 'leapjs-plugins';

// const VREffect = vrEffect(THREE);
const StereoEffect = threeStereoEffect(THREE);
const OrbitControls = threeOrbitControls(THREE);

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit, AfterViewChecked {

    renderer:           any;
    scene:              any;
    camera:             any;
    cube:               any;
    animating:          boolean;
    controls:           any;
    effect:             any;
    plane:              any;
    axisHelper:         any;
    ws:                 any;
    leapMotionFrame:    any;

    animateCallback = {
        callAnimate: (this.animate).bind(this)
    };

    constructor(public navCtrl: NavController) {

        // console.log(THREE);

        LeapJsPlugins

        .loop({ host:'192.168.0.104' })

        /*
        .use('transform', {
            vr: true
        })
        */

        .use('boneHand', {
            targetEl: document.body,
            arm: true,
            opacity: 0.8
        });

        // Set up scene from LeapJsPlg
        this.scene    = LeapJsPlugins.loopController.plugins.boneHand.scene;
        this.camera   = LeapJsPlugins.loopController.plugins.boneHand.camera;
        this.renderer = LeapJsPlugins.loopController.plugins.boneHand.renderer;

        let plane = new THREE.Mesh(
            new THREE.PlaneGeometry(80,80),
            new THREE.MeshPhongMaterial({wireframe: false, side: THREE.DoubleSide})
        );

        plane.scale.set(2,2,2);
        plane.position.set(0,200,-100);
        plane.receiveShadow = true;
        this.scene.add(plane);

        this.camera.lookAt( plane.position );

        let axisHelper = new THREE.AxisHelper( 100 );
        this.scene.add( axisHelper );

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.effect = new StereoEffect(this.renderer);

        /*
        let vrEffect = VREffect(this.renderer, (message) => {
            console.log(message);
        });
        */

        // this.animate();

    }

    init() {

    }

    animate() {
        requestAnimationFrame( this.animateCallback.callAnimate );
        this.effect.render(this.scene, this.camera);
    }

    ngAfterViewInit() {

        LeapJsPlugins.loopController.on('handFound', function(hand) {
            document.querySelector('canvas').style.display = 'block';
            console.log('hand found');
        }).on('handLost', function(hand){
            if (LeapJsPlugins.loopController.frame(0).hands.length === 0){
                console.log('hand lost');
                // document.querySelector('canvas').style.display = 'none';
            }
        });

    }

    ngAfterViewChecked() {
        // this.animate();
    }

}
