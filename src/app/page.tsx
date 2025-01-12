'use client';

import { Suspense, useRef, useCallback, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useControls } from 'leva';
import * as THREE from 'three';
import { View, OrthographicCamera } from '@react-three/drei';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { MediapipeModel } from '@/components/videoMediapipe/model/mediapipe';
import { VideoMediapipe } from '@/components/videoMediapipe/VideoMediapipe';
import { Cone } from '@/components/canvas/Cone';
import { HelperModel } from '@/components/videoMediapipe/helper/model/helperModel';
import { HelperComponent } from '@/components/videoMediapipe/helper/HelperComponent';
import { caculePosition } from '@/utils/calculePosition';

const Common = dynamic(
  () => import('@/components/canvas/Common').then((mod) => mod.Common),
  { ssr: false }
);

const useHelper = () => {
  const { position } = useControls({
    position: {
      value: { x: 0, y: 0, z: 0 },
      step: 1,
    },
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  });

  return { position: new THREE.Vector3(position.x, position.y, position.z) };
};

export default function Home() {
  const mediapipeRef = useRef<MediapipeModel>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const helperRef = useRef<HelperModel>(null);
  const [landmarks, setLandmarks] = useState<HandLandmarkerResult | null>(null);
  // const [position, setPosition] = useState<THREE.Vector3>(
  //   new THREE.Vector3(0, 0, 0)
  // );

  // useEffect(() => {
  //   if (landmarks?.landmarks?.length) {
  //     const position = caculePosition(landmarks);
  //     setPosition(position);
  //   }
  // }, [landmarks]);

  const { position } = useHelper();

  const initMediapipe = useCallback(() => {
    console.log('initMediapipe');
    mediapipeRef.current
      ?.initUserMedia(() => {
        mediapipeRef.current?.onMessage(setLandmarks);
        helperRef.current?.resizeCanvas(window.innerWidth, window.innerHeight);
      })
      .catch((error) => {
        console.error('Error initializing Mediapipe:', error);
      });
  }, []);

  return (
    <div className="h-screen">
      <div className="absolute left-0 top-0 hidden">
        <VideoMediapipe
          mediapipeRef={mediapipeRef}
          videoRef={videoRef}
          isHidden={false}
        />
      </div>
      <HelperComponent
        helperRef={helperRef}
        landmarks={landmarks}
        showHelper={true}
      />
      <button
        className="absolute left-1/2 top-0 z-50 bg-blue-500 p-4"
        onClick={initMediapipe}
      >
        Init Mediapipe
      </button>
      <View className="absolute left-0 top-0 h-screen w-screen">
        <Suspense fallback={null}>
          <Common orbit={true} videoRef={videoRef} />
          <Cone position={position} scale={1} />
        </Suspense>
      </View>
    </div>
  );
}
