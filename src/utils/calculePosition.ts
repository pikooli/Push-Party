import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { Z_POSITION, ZOOM } from '@/app/constants/constants';
import * as THREE from 'three';

export const caculePosition = (landmarks: HandLandmarkerResult) => {
  const screenWidth = window.innerWidth; // Use screen width
  const screenHeight = window.innerHeight; // Use screen height

  const aspectRatio = screenWidth / screenHeight;

  const handLandmark = landmarks.landmarks[0][0]; // Replace index with desired landmark

  let ndcX = handLandmark.x * 2 - 1; // Convert X from [0, 1] to [-1, 1]
  const ndcY = -(handLandmark.y * 2 - 1); // Convert Y from [0, 1] to [-1, 1] and flip vertically

  ndcX *= -aspectRatio;
  const scaledX = ndcX * 2;
  const scaledY = ndcY * 2;

  return new THREE.Vector3(scaledX, scaledY, 0);
};
