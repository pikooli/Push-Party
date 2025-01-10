'use client';
import { Suspense, useEffect } from 'react';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';
import { ZOOM, Z_POSITION } from '@/app/constants/constants';

export const Common = ({
  orbit,
  videoRef,
}: {
  orbit?: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
}) => {
  const { scene, camera } = useThree();

  useEffect(() => {
    if (videoRef.current) {
      // const videoTexture = new THREE.VideoTexture(videoRef.current);
      // videoTexture.colorSpace = THREE.SRGBColorSpace;
      // videoTexture.wrapS = THREE.RepeatWrapping;
      // videoTexture.repeat.x = -1;
      // scene.background = videoTexture;
    }
  }, [scene, videoRef]);

  useEffect(() => {
    const helper = new THREE.CameraHelper(camera);
    scene.add(helper);
  }, [camera, scene]);

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const aspectRatio = screenWidth / screenHeight;

  // Orthographic camera bounds
  const frustumSize = 1; // Arbitrary size; adjust to fit your scene
  const left = (-frustumSize * aspectRatio) / 2;
  const right = (frustumSize * aspectRatio) / 2;
  const top = frustumSize / 2;
  const bottom = -frustumSize / 2;

  return (
    <Suspense fallback={null}>
      <Perf position="top-left" />
      <ambientLight />
      <axesHelper args={[10]} />
      {orbit && <OrbitControls />}
      <pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
      <pointLight position={[-10, -10, -10]} color="blue" decay={0.2} />
      {/* <PerspectiveCamera
        makeDefault
        fov={CAMERA_FOV}
        position={[0, 0, Z_POSITION]}
      /> */}
      <OrthographicCamera
        makeDefault
        left={left}
        right={right}
        top={top}
        bottom={bottom}
        near={0}
        far={100}
        lookAt={() => new THREE.Vector3(0, 0, 0)}
        position={[0, 0, Z_POSITION]} // Position the camera
        zoom={ZOOM} // Adjust zoom level for scaling
      />
    </Suspense>
  );
};
