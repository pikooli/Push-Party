'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useControls } from 'leva';
import { View } from '@react-three/drei';

const Common = dynamic(
  () => import('@/components/canvas/Common').then((mod) => mod.Common),
  { ssr: false }
);

const Floor = (props: JSX.IntrinsicElements['mesh']) => {
  return (
    <mesh {...props}>
      <boxGeometry args={[10, 1, 10]} />
      <meshStandardMaterial color="limegreen" />
    </mesh>
  );
};

function Box(props: JSX.IntrinsicElements['mesh']) {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default function Home() {
  const { position, rotation } = useControls({
    position: { value: [0, 0, 0], step: 0.1 },
    rotation: { value: [0, 0, 0], step: 0.1 },
  });

  return (
    <div className="h-screen w-screen">
      <View className="h-1/6 w-full">
        <Suspense fallback={null}>
          <Common color="green" />
          <Box position={position} rotation={rotation} />
          <Floor position={[0, -1, 0]} rotation={[0, 0, 0]} />
        </Suspense>
      </View>
      <View className="h-1/6 w-full">
        <Suspense fallback={null}>
          <Common color="green" />
          <Box position={position} rotation={rotation} />
          <Floor position={[0, -1, 0]} rotation={[0, 0, 0]} />
        </Suspense>
      </View>
    </div>
  );
}
