'use client';
import { Plane } from '@react-three/drei';
import { RigidBody, RigidBodyProps } from '@react-three/rapier';
import { FLOOR_SIZE } from '@/constants';

export const Floor = (props: RigidBodyProps) => {
  return (
    <RigidBody type="fixed" name="floor" {...props}>
      <Plane
        args={[FLOOR_SIZE.x, FLOOR_SIZE.y]}
        receiveShadow={true}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial opacity={0.5} transparent={true} color="white" />
      </Plane>
    </RigidBody>
  );
};
