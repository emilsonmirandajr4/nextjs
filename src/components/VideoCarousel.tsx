"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./embla/EmblaCarouselArrowButtons";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
  views: number;
  duration: string;
  channelTitle: string;
}

interface VideoCarouselProps {
  videos: Video[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
      dragFree: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })],
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="w-full py-6">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 opacity-40 blur-xl"></div>
        <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-red-500 via-red-600 to-rose-500">
          <div className="relative flex items-center justify-between gap-4 rounded-2xl bg-slate-950 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-red-400 blur-sm opacity-70"></div>
                <div className="relative w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-red-500 via-red-400 to-amber-300 text-white shadow-lg shadow-red-500/50">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 3l14 9-14 9V3z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-300">
                  Conteúdo em vídeo
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Vídeos
                </h2>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-200/80">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                </span>
                Novos vídeos em destaque
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-2 sm:px-4 lg:px-12">
        <div className="overflow-x-hidden overflow-y-visible" ref={emblaRef}>
          <div className="flex pb-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] px-2.5"
              >
                <div className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.5)] h-full flex flex-col">
                  <div className="relative pb-[56.25%]">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white bg-opacity-90 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <svg
                          className="w-6 h-6 text-gray-800"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    {video.channelTitle && (
                      <p className="text-xs text-gray-500 font-medium mb-2 flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                        </svg>
                        {video.channelTitle}
                      </p>
                    )}
                    <h3 className="font-semibold text-gray-800 text-sm mb-3 line-clamp-2 min-h-[4.5rem] leading-relaxed">
                      {video.title}
                    </h3>

                    <div className="flex items-center text-xs text-gray-500">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {video.views.toLocaleString()} visualizações
                    </div>
                  </div>

                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0"
                    aria-label={`Assistir ${video.title}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};

export default VideoCarousel;
