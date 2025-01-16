'use client';

import { useEffect, useRef } from 'react';
import { NormalizedLandmark } from '@mediapipe/tasks-vision';
import { calculeBoundingBox } from '@/utils';
import { Line, Box } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { RigidBody, RigidBodyApi } from '@react-three/rapier';

export const BoundingBox = ({
  landmarks,
}: {
  landmarks: NormalizedLandmark[] | null;
}) => {
  const rigidBodyRef = useRef<RigidBodyApi>(null);
  const { camera } = useThree();
  if (!landmarks) return null;
  const { sizeY, sizeX, center } = calculeBoundingBox(landmarks, camera);

  if (!center) return null;

  return (
    <RigidBody
      ref={rigidBodyRef}
      name="bounding-box"
      type="dynamic"
      colliders="cuboid"
      position={center}
      ccd={true} // Enable continuous collision detection
      key={`${sizeY}-${center.toArray().join(',')}`}
      mass={100}
    >
      <Box args={[sizeX, sizeY, -10]}>
        <meshBasicMaterial opacity={0} transparent={true} color="blue" />
      </Box>
    </RigidBody>
  );
};
