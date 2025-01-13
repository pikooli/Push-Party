'use client';

import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { caculePosition } from '@/utils/calculePosition';
import { RigidBody } from '@react-three/rapier';
import { Box } from './Box';

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
    <RigidBody position={position} type="kinematicPosition">
      <Box />
    </RigidBody>
  );
}
