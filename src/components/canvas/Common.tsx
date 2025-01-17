'use client';
import { Suspense, useEffect } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';
import { CAMERA_FOV, Z_POSITION } from '@/app/constants/constants';
import { DEBUG } from '@/constants';

export const Common = ({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
}) => {
  const { scene, camera } = useThree();

  useEffect(() => {
    if (videoRef.current) {
      const videoTexture = new THREE.VideoTexture(videoRef.current);
      videoTexture.colorSpace = THREE.SRGBColorSpace;
      videoTexture.wrapS = THREE.RepeatWrapping;
      videoTexture.repeat.x = -1;
      scene.background = videoTexture;
    }
  }, [scene, videoRef]);

  useEffect(() => {
    if (DEBUG.showCameraHelper) {
      const helper = new THREE.CameraHelper(camera);
      scene.add(helper);
    }
  }, [camera, scene]);

  return (
    <Suspense fallback={null}>
      {DEBUG.showPerformance && <Perf position="top-left" />}
      {DEBUG.showAxesHelper && <axesHelper args={[10]} />}
      {DEBUG.showOrbitControls && <OrbitControls />}
      <pointLight
        position={[-2, 0, 0]}
        intensity={10}
        decay={0.2}
        color="white"
        castShadow={true}
        shadow-mapSize={[1024, 1024]} // Shadow resolution
        shadow-bias={-0.001} // Helps prevent shadow acne
      />
      <PerspectiveCamera
        makeDefault
        fov={CAMERA_FOV}
        position={[0, 0, Z_POSITION]}
      />
    </Suspense>
  );
};
