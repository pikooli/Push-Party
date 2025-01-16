import { NormalizedLandmark } from '@mediapipe/tasks-vision';
import * as THREE from 'three';

export const calculeBoundingBox = (
  landmarks: NormalizedLandmark[] | null,
  camera: THREE.Camera
) => {
  if (!landmarks) return {};
  const xCoordinates = landmarks.map((lm) => lm.x);
  const yCoordinates = landmarks.map((lm) => lm.y);

  const minX = Math.min(...xCoordinates);
  const maxX = Math.max(...xCoordinates);
  const minY = Math.min(...yCoordinates);
  const maxY = Math.max(...yCoordinates);

  const minClipX = -(minX - 0.5) * 2; // Map 0-1 to -1 to 1
  const minClipY = (minY - 0.5) * -2; // Flip Y axis for Three.js
  const maxClipX = -(maxX - 0.5) * 2; // Map 0-1 to -1 to 1
  const maxClipY = (maxY - 0.5) * -2; // Flip Y axis for Three.js

  // Calculate center coordinates
  const centerClipX = (minClipX + maxClipX) / 2;
  const centerClipY = (minClipY + maxClipY) / 2;

  const center = new THREE.Vector3(centerClipX, centerClipY, 0.9855).unproject(
    camera
  );

  const positionMinY = new THREE.Vector3(minClipX, minClipY, 0.9855).unproject(
    camera
  );
  const positionMaxY = new THREE.Vector3(minClipX, maxClipY, 0.9855).unproject(
    camera
  );
  const positionMinX = new THREE.Vector3(minClipX, minClipY, 0.9855).unproject(
    camera
  );
  const positionMaxX = new THREE.Vector3(maxClipX, minClipY, 0.9855).unproject(
    camera
  );
  const sizeY = positionMaxY.y - positionMinY.y;
  const sizeX = positionMaxX.x - positionMinX.x;

  return { center, sizeY, sizeX };
};
