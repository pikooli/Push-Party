'use client';

export const Floor = (props: JSX.IntrinsicElements['mesh']) => {
  return (
    <mesh {...props}>
      <boxGeometry args={[10, 1, 10]} />
      <meshStandardMaterial color="limegreen" />
    </mesh>
  );
};
