import { useBoxStore } from '@/zustand/store';
import { GEOMETRY_TYPES } from '@/constants';

export const Buttons = ({ initMediapipe }: { initMediapipe: () => void }) => {
  const { addBox, setSpecifyGeometry } = useBoxStore();
  return (
    <div className="absolute left-1/2 top-0 z-50 flex gap-2">
      {Object.keys(GEOMETRY_TYPES).map((geometry) => (
        <button
          className="bg-green-500 p-4"
          onClick={() => setSpecifyGeometry(geometry)}
        >
          {geometry}
        </button>
      ))}
      <button className="bg-blue-500 p-4" onClick={initMediapipe}>
        Init Mediapipe
      </button>
    </div>
  );
};
