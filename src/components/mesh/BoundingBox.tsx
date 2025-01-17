'use client';

import { NormalizedLandmark } from '@mediapipe/tasks-vision';
import { calculeBoundingBox } from '@/utils';
import { Box } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

const Z_VALUE = 10;

export const BoundingBox = ({
  landmarks,
}: {
  landmarks: NormalizedLandmark[] | null;
}) => {
  const { camera } = useThree();

  if (!landmarks) return null;
  const { sizeY, sizeX, center } = calculeBoundingBox(landmarks, camera);
  if (!sizeY || !sizeX || !center) return null;

  return (
    <RigidBody
      name="bounding-box"
      type="kinematicVelocity"
      colliders="cuboid"
      position={center}
      key={`${sizeY}-${center.toArray().join(',')}`}
      mass={100}
    >
      <Box args={[sizeX, sizeY, Z_VALUE]}>
        <meshBasicMaterial opacity={0} transparent={true} color="blue" />
      </Box>
    </RigidBody>
  );
};
