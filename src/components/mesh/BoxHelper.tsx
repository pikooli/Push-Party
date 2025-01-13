'use client';

import { useEffect, useState } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { caculePosition } from '@/utils/calculePosition';

const displayPosition = (position: THREE.Vector3) => {
  return `x: ${position.x.toFixed(2)}, y: ${position.y.toFixed(2)}, z: ${position.z.toFixed(2)}`;
};

type BoxProps = JSX.IntrinsicElements['mesh'] & {
  landMark: THREE.Vector3;
};

export function BoxHelper(props: BoxProps) {
  const { landMark } = props;
  const { camera } = useThree();
  const [position, setPosition] = useState<THREE.Vector3>(new THREE.Vector3());

  useEffect(() => {
    if (landMark) {
      const position = caculePosition(landMark, camera);
      setPosition(position);
    }
  }, [landMark, camera]);

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
      <boxGeometry />
      <meshStandardMaterial color="red" emissive="red" />
    </mesh>
  );
}
