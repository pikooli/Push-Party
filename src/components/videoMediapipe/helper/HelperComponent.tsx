import { useEffect, useRef } from 'react';
import { HelperModel } from '@/components/videoMediapipe/helper/model/helperModel';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';

interface HelperComponentProps {
  helperRef: React.RefObject<HelperModel | null>;
  landmarks: HandLandmarkerResult | null;
  showHelper: boolean;
}

export const HelperComponent = ({
  helperRef,
  landmarks,
  showHelper,
}: HelperComponentProps) => {
  const canvasHelperRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    helperRef.current = new HelperModel(
      canvasHelperRef,
      canvasHelperRef?.current?.width || 0,
      canvasHelperRef?.current?.height || 0
    );
  }, [helperRef]);

  useEffect(() => {
    if (landmarks?.landmarks && showHelper) {
      helperRef.current?.drawElements(landmarks);
    }
  }, [landmarks, helperRef, showHelper]);

  return (
    <canvas
      className="absolute left-0 top-0 z-10 border border-blue-500"
      ref={canvasHelperRef}
    />
  );
};
