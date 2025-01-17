'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Box, useTexture } from '@react-three/drei';
import {
  RigidBody,
  CollisionEnterPayload,
  RapierRigidBody,
  RigidBodyProps,
} from '@react-three/rapier';
import { BOX_SIZE } from '@/constants';

interface JumpingBoxProps extends RigidBodyProps {
  onMount?: (rb: RapierRigidBody) => void;
}

export const JumpingBox = ({ onMount, ...props }: JumpingBoxProps) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const cooldownRef = useRef(false);
  const texture = useTexture('/duck.png');

  useEffect(() => {
    if (rigidBodyRef.current && onMount) {
      onMount(rigidBodyRef.current);
    }
  }, [onMount]);

  const handleCollisionEnter = useCallback((event: CollisionEnterPayload) => {
    // if (cooldownRef.current) return;
    // cooldownRef.current = true;

    // setTimeout(() => (cooldownRef.current = false), 200);

    if (event.rigidBodyObject?.name === 'bounding-box') {
      const targetPosition = event.target?.rigidBodyObject?.position || {
        x: 0,
        y: 0,
        z: 0,
      };
      const colliderPosition = event.rigidBodyObject?.position || {
        x: 0,
        y: 0,
        z: 0,
      };

      const direction = {
        x: colliderPosition.x - targetPosition.x,
        y: colliderPosition.y - targetPosition.y,
        z: colliderPosition.z - targetPosition.z,
      };

      const impulseMagnitude = 50;
      const impulse = {
        x: direction.x * impulseMagnitude,
        y: direction.y * impulseMagnitude,
        z: direction.z * impulseMagnitude,
      };
      rigidBodyRef.current?.applyImpulse(impulse, true);
    }
  }, []);

  return (
    <RigidBody
      {...props}
      ref={rigidBodyRef}
      type="dynamic"
      colliders="cuboid"
      restitution={0.5}
      onCollisionEnter={handleCollisionEnter}
      mass={1}
      canSleep={true}
    >
      <Box args={[BOX_SIZE.x, BOX_SIZE.y, BOX_SIZE.z]} castShadow={true}>
        <meshStandardMaterial map={texture} />
      </Box>
    </RigidBody>
  );
};
