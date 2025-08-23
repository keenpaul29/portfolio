import { create } from "zustand";
import { Vector3Tuple } from "three";

export type FrameId = string | null;

interface SceneState {
  selectedFrame: FrameId;
  cameraTarget: Vector3Tuple; // where the camera should look/move towards
  cameraPosition: Vector3Tuple; // desired camera position
  setSelectedFrame: (id: FrameId) => void;
  focusOn: (position: Vector3Tuple, target?: Vector3Tuple, id?: string | null) => void;
  reset: () => void;
}

const DEFAULT_POS: Vector3Tuple = [0, 1.4, 4];
const DEFAULT_TARGET: Vector3Tuple = [0, 1.4, 0];

export const useScene = create<SceneState>((set) => ({
  selectedFrame: null,
  cameraTarget: DEFAULT_TARGET,
  cameraPosition: DEFAULT_POS,
  setSelectedFrame: (id) => set({ selectedFrame: id }),
  focusOn: (position, target = [position[0], position[1], 0], id = null) =>
    set({ cameraPosition: position, cameraTarget: target, selectedFrame: id }),
  reset: () => set({ cameraPosition: DEFAULT_POS, cameraTarget: DEFAULT_TARGET, selectedFrame: null }),
}));

export const defaults = {
  position: DEFAULT_POS,
  target: DEFAULT_TARGET,
};
