"use client";

import React from "react";
import SceneCanvas from "../three/SceneCanvas";
import { Background } from "../three/Background";
import CameraRig from "../three/CameraRig";
import Effects from "../three/Effects";
import Loader from "../three/Loader";
import GalleryRoom from "./GalleryRoom";

export default function GalleryScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <SceneCanvas camera={{ fov: 60, position: [0, 1.4, 4] }}>
        <Loader />
        <Background />
        <GalleryRoom />
        <CameraRig />
        <Effects />
      </SceneCanvas>
    </div>
  );
}
