import type Hls from "hls.js";
import { useEffect, useRef } from "react";

export const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function HlsVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let hls: Hls | undefined;
    let cancelled = false;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari / iOS : HLS natif
      video.src = HLS_SRC;
      video.play().catch(() => {});
    } else {
      // Chargé à la demande pour alléger le bundle initial
      import("hls.js").then(({ default: HlsLib }) => {
        if (cancelled || !HlsLib.isSupported()) return;
        hls = new HlsLib({ capLevelToPlayerSize: true });
        hls.loadSource(HLS_SRC);
        hls.attachMedia(video);
        video.play().catch(() => {});
      });
    }
    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden
      className={`absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover ${className}`}
    />
  );
}
