'use client';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const displayPosition = (position: THREE.Vector3) => {
  return `x: ${position.x.toFixed(2)}, y: ${position.y.toFixed(2)}, z: ${position.z.toFixed(2)}`;
};

export function Box(props: JSX.IntrinsicElements['mesh']) {
  return (
    <mesh {...props}>
      <Text
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0.6]}
        fontSize={0.1}
      >
        {/* @ts-expect-error props.position is not null */}
        {displayPosition(props.position)}
      </Text>
      <boxGeometry />
      <meshStandardMaterial color="red" emissive="red" />
    </mesh>
  );
}
