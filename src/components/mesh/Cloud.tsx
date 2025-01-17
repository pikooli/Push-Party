import React from 'react';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';

const Cloud = React.forwardRef<Group, GroupProps>((props: GroupProps, ref) => {
  return (
    <group {...props} ref={ref}>
      <mesh>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.8, 0.2, 0]}>
        <sphereGeometry args={[0.8, 8, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-0.8, 0.2, 0]}>
        <sphereGeometry args={[0.9, 8, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
});

Cloud.displayName = 'Cloud';
export { Cloud };
