import * as THREE from 'three';
import { FLOOR_POSITION, BOX_SIZE } from '@/constants';

// Configuration constants
const baseWidth = 5; // Number of boxes in the bottom layer
const boxSize = BOX_SIZE.x; // Size and spacing of each box

const generateStairsCoordinates = (baseWidth: number, boxSize: number) => {
  const coordinates: THREE.Vector3[] = [];
  for (let j = 0; j < baseWidth; j++) {
    for (let i = 0; i < baseWidth - j; i++) {
      coordinates.push(
        new THREE.Vector3(
          i * boxSize - (baseWidth / 2) * boxSize,
          boxSize * (j + 1)
        ).add(FLOOR_POSITION)
      );
    }
  }
  return coordinates;
};

const generatePyramidCoordinates = (baseWidth: number, boxSize: number) => {
  const pyramidCoordinates: THREE.Vector3[] = [];
  for (let j = 0; j < baseWidth; j++) {
    const newBaseWidth = baseWidth - j;
    for (let i = 0; i < newBaseWidth; i++) {
      pyramidCoordinates.push(
        new THREE.Vector3(
          i * boxSize - (newBaseWidth / 2) * boxSize,
          boxSize * (j + 1)
        ).add(FLOOR_POSITION)
      );
    }
  }
  return pyramidCoordinates;
};

const generateTowerCoordinates = (
  height: number,
  baseWidth: number,
  boxSize: number
) => {
  const coordinates: THREE.Vector3[] = [];
  for (let y = 0; y < height; y++) {
    const layerWidth = Math.max(2, baseWidth - Math.floor(y / 2));
    for (let x = 0; x < layerWidth; x++) {
      coordinates.push(
        new THREE.Vector3(
          x * boxSize - (layerWidth / 2) * boxSize,
          1 + y * boxSize,
          0
        ).add(FLOOR_POSITION)
      );
    }
  }
  return coordinates;
};

const generateWallCoordinates = (
  width: number,
  height: number,
  boxSize: number
) => {
  const coordinates: THREE.Vector3[] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      coordinates.push(
        new THREE.Vector3(
          x * boxSize - (width / 2) * boxSize,
          y * boxSize,
          0
        ).add(FLOOR_POSITION)
      );
    }
  }
  return coordinates;
};

const generateFormCoordinates = (size: number, boxSize: number) => {
  const coordinates: THREE.Vector3[] = [];
  // Horizontal part
  for (let x = 0; x < size; x++) {
    coordinates.push(
      new THREE.Vector3(x * boxSize - (size / 2) * boxSize, 0, 0).add(
        FLOOR_POSITION
      )
    );
  }
  // Vertical part
  for (let y = 0; y < size; y++) {
    coordinates.push(
      new THREE.Vector3(0, y * boxSize + boxSize, 0).add(FLOOR_POSITION)
    );
  }
  return coordinates;
};

export const pyramidCoordinates: THREE.Vector3[] = generatePyramidCoordinates(
  baseWidth,
  boxSize
);

export const stairsCoordinates: THREE.Vector3[] = generateStairsCoordinates(
  baseWidth,
  boxSize
);

export const towerCoordinates: THREE.Vector3[] = generateTowerCoordinates(
  10,
  baseWidth,
  boxSize
);

export const wallCoordinates: THREE.Vector3[] = generateWallCoordinates(
  6,
  6,
  boxSize
);

export const formCoordinates: THREE.Vector3[] = generateFormCoordinates(
  5,
  boxSize
);
