import * as THREE from 'three';
import { FLOOR_POSITION } from '@/constants';

export const generateEiffelTowerCoordinates = () => {
  const coordinates = [];
  const boxSize = 1; // Size and spacing of cubes

  // **1. Base Layer**
  const baseWidth = 10;
  const baseHeight = 3; // Number of layers for the base
  for (let y = 1; y < baseHeight; y++) {
    const layerWidth = baseWidth - y * 2; // Tapering base
    for (let x = 0; x < layerWidth; x++) {
      for (let z = 0; z < layerWidth; z++) {
        coordinates.push(
          new THREE.Vector3(
            x * boxSize - (layerWidth / 2) * boxSize,
            y * boxSize,
            z * boxSize - (layerWidth / 2) * boxSize
          ).add(FLOOR_POSITION)
        );
      }
    }
  }

  const middleHeight = 7;
  const middleWidth = 4;
  for (let y = 0; y < middleHeight; y++) {
    for (let x = 0; x < middleWidth; x++) {
      for (let z = 0; z < middleWidth; z++) {
        coordinates.push(
          new THREE.Vector3(
            x * boxSize - (middleWidth / 2) * boxSize,
            (baseHeight + y) * boxSize,
            z * boxSize - (middleWidth / 2) * boxSize
          ).add(FLOOR_POSITION)
        );
      }
    }
  }

  const archHeight = 4;
  for (let y = 0; y < archHeight; y++) {
    const layerWidth = baseWidth - middleWidth - baseHeight - y * 2; // Further tapering
    for (let x = 0; x < layerWidth; x++) {
      for (let z = 0; z < layerWidth; z++) {
        coordinates.push(
          new THREE.Vector3(
            x * boxSize - (layerWidth / 2) * boxSize,
            (baseHeight + middleHeight + y) * boxSize,
            z * boxSize - (layerWidth / 2) * boxSize
          ).add(FLOOR_POSITION)
        );
      }
    }
  }

  // **4. Top Spire**
  const spireHeight = 5;
  const spireWidth = 1; // Very narrow spire
  for (let y = 0; y < spireHeight; y++) {
    for (let x = 0; x < spireWidth; x++) {
      for (let z = 0; z < spireWidth; z++) {
        coordinates.push(
          new THREE.Vector3(
            x * boxSize - (spireWidth / 2) * boxSize,
            (baseHeight + archHeight + middleHeight + y) * boxSize,
            z * boxSize - (spireWidth / 2) * boxSize
          ).add(FLOOR_POSITION)
        );
      }
    }
  }

  return coordinates;
};

export const eiffelTowerCoordinates: THREE.Vector3[] =
  generateEiffelTowerCoordinates();
