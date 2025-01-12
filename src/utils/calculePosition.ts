import {
  HandLandmarkerResult,
  FaceLandmarkerResult,
} from '@mediapipe/tasks-vision';
import { Z_POSITION, ZOOM } from '@/app/constants/constants';
import * as THREE from 'three';

export const caculePosition = (landmarks: HandLandmarkerResult) => {
  return new THREE.Vector3(0, 0, 0);

  // const handLandmark = landmarks.landmarks[0][0]; // Replace index with desired landmark
  // if (!handLandmark) return new THREE.Vector3(0, 0, 0);

  // const screenWidth = window.innerWidth; // Use screen width
  // const screenHeight = window.innerHeight; // Use screen height

  // const aspectRatio = screenWidth / screenHeight;

  // const ndcX = handLandmark.x * 2 - 1;
  // const ndcY = -(handLandmark.y * 2 - 1); // Flip vertically
  // console.log({ ndcX, ndcY });
  // return new THREE.Vector3(-ndcX * 5, ndcY * 5, 0);
};
