'use client';
import { Suspense, useEffect } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';
import { CAMERA_FOV, ZOOM, Z_POSITION } from '@/app/constants/constants';

export const Common = ({
  orbit,
  videoRef,
}: {
  orbit?: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
}) => {
  const { scene, camera, size } = useThree();

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
    const helper = new THREE.CameraHelper(camera);
    scene.add(helper);
  }, [camera, scene]);

  return (
    <Suspense fallback={null}>
      <Perf position="top-left" />
      <ambientLight />
      <axesHelper args={[10]} />
      {orbit && <OrbitControls />}
      <pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
      <pointLight position={[-10, -10, -10]} color="blue" decay={0.2} />
      <PerspectiveCamera
        makeDefault
        fov={CAMERA_FOV}
        position={[0, 0, Z_POSITION]}
      />
    </Suspense>
  );
};
