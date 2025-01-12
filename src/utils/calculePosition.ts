import * as THREE from 'three';

export const caculePosition = (
  landMark: THREE.Vector3,
  camera: THREE.Camera
) => {
  const clipX = (landMark.x - 0.5) * 2; // Map 0-1 to -1 to 1
  const clipY = (landMark.y - 0.5) * -2; // Flip Y axis for Three.js

  // Set up a vector in clip space with depth Z_POSITION
  const vector = new THREE.Vector3(-clipX, clipY, 0.99); // Z = 0.5 means halfway between near and far plane
  vector.unproject(camera);

  return vector;
};
