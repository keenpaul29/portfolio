"use client";

import React from "react";
import { projects } from "./projects";
import { useScene } from "@/state/useScene";

export default function DetailsPanel() {
  const { selectedFrame, reset } = useScene();
  const p = projects.find((x) => x.id === selectedFrame);
  if (!p) return null;
  return (
    <div className="pointer-events-auto fixed right-4 top-4 z-10 w-80 rounded-lg border border-slate-700 bg-slate-900/80 p-4 text-slate-100 backdrop-blur">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{p.title}</h3>
        <button className="text-xs text-slate-300 hover:text-white" onClick={() => reset()}>
          Close
        </button>
      </div>
      <p className="text-xs opacity-80">{p.description ?? "Project description goes here."}</p>
      {p.link && (
        <a className="mt-3 inline-block text-xs text-sky-300 hover:text-sky-200" href={p.link} target="_blank" rel="noreferrer">
          View project →
        </a>
      )}
    </div>
  );
}
