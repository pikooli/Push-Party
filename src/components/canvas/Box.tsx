'use client';
export function Box(props: JSX.IntrinsicElements['mesh']) {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
