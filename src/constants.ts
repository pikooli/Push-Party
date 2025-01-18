import * as THREE from 'three';

export const DEBUG = {
  showPerformance: false,
  showLandmarks: false,
  showOrbitControls: false,
  showAxesHelper: false,
  showCameraHelper: false,
};
export const FLOOR_POSITION = new THREE.Vector3(0, -7, -4);
export const FLOOR_SIZE = new THREE.Vector3(30, 10, 0);
export const BOX_SIZE = new THREE.Vector3(2, 2, 2);
export const JUMPING_BOX_NAME = 'jumping-box';

export const GEOMETRY_TYPES = {
  stairs: 'stairs',
  tower: 'tower',
  pyramid: 'pyramid',
  wall: 'wall',
  form: 'form',
};
