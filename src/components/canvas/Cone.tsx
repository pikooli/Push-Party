'use client';
import { useEffect, useState } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { caculePosition } from '@/utils/calculePosition';

const displayPosition = (position: THREE.Vector3) => {
  return `x: ${position.x.toFixed(2)}, y: ${position.y.toFixed(2)}, z: ${position.z.toFixed(2)}`;
};

type ConeProps = JSX.IntrinsicElements['mesh'] & {
  landmarks: HandLandmarkerResult | null;
};

export function Cone(props: ConeProps) {
  const { landmarks } = props;
  const { camera } = useThree();
  const [position, setPosition] = useState<THREE.Vector3>(new THREE.Vector3());

  useEffect(() => {
    if (landmarks?.landmarks?.length) {
      const position = caculePosition(landmarks, camera);
      setPosition(position);
    }
  }, [landmarks]);
  return (
    <mesh {...props} position={position}>
      <Text
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0.6]}
        fontSize={0.1}
      >
        {displayPosition(position)}
      </Text>
      <coneGeometry />
      <meshStandardMaterial color="red" emissive="red" />
    </mesh>
  );
}
