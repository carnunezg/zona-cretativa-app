"use client";

import { FaVideo } from "react-icons/fa6";
import type { MediaItem } from "@/types/media";
import VideoPlayer from "./VideoPlayer";

/** Videos del producto/pack. No muestra nada si aún no hay videos. */
export default function ItemVideos({ media }: { media: MediaItem[] }) {
  const videos = media.filter((m) => m.kind !== "image");
  if (videos.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto mt-12">
      <h2 className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-extrabold text-white mb-6 drop-shadow">
        <FaVideo className="text-yellow-300" />
        {videos.length === 1 ? "Míralo en acción" : "Videos"}
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {videos.map((v) => (
          <figure
            key={v.id}
            className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] bg-white rounded-2xl shadow-md border border-slate-200 p-3"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <VideoPlayer item={v} />
            </div>
            {(v.title || v.description) && (
              <figcaption className="pt-3 text-center">
                {v.title && <p className="font-extrabold text-[#1E3A8A]">{v.title}</p>}
                {v.description && (
                  <p className="text-sm text-[#475569]">{v.description}</p>
                )}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
