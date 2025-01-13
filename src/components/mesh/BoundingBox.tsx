'use client';

import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { calculeBoundingBox } from '@/utils';
import { Line, Box } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

export const BoundingBox = ({
  landmarks,
}: {
  landmarks: HandLandmarkerResult | null;
}) => {
  const { camera } = useThree();
  if (!landmarks) return null;
  const { corners, center } = calculeBoundingBox(
    landmarks.landmarks?.[0],
    camera
  );
  console.log(corners);
  if (!corners) return null;

  return <Line points={corners} color="blue" lineWidth={2} />;
};
