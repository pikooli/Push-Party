'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useControls } from 'leva';

const View = dynamic(
  () => import('@/components/canvas/View').then((mod) => mod.View),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-96 w-full flex-col items-center justify-center">
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-black"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    ),
  }
);

const Common = dynamic(
  () => import('@/components/canvas/View').then((mod) => mod.Common),
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
      {/* @ts-expect-error don't know */}
      <View className="h-full w-full" orbit={true}>
        <Suspense fallback={null}>
          <Common color="green" />
          <Box position={position} rotation={rotation} />
          <Floor position={[0, -1, 0]} rotation={[0, 0, 0]} />
        </Suspense>
      </View>
    </div>
  );
}
