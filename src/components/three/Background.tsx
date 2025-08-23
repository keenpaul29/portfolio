"use client";

import React from "react";

export function Background() {
  // Keep background transparent; DOM will supply the full Starry Night image.
  return <color attach="background" args={["transparent"]} />;
}
