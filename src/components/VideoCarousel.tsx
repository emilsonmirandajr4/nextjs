import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import OptimizedImage from './OptimizedImage';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
  views: number;
  duration: string;
}

interface VideoCarouselProps {
  videos: Video[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos }) => {
  return (
    <div className="w-full py-8 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-red-600 pl-4">
        Vídeos em Destaque
      </h2>
      
      <div className="px-12">
        <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        centeredSlides={false}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={false}
        className="video-swiper"
        watchOverflow={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id}>
            <div className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.5)]">
              <div className="relative h-48">
                <OptimizedImage
                  src={video.thumbnail}
                  alt={video.title}
                  ratio="16/9"
                  mode="cover"
                  className="w-full rounded-t-lg"
                  priority="normal"
                  placeholder="maincolor"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
                <div className="absolute inset-0 bg-red-600 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white bg-opacity-90 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center text-xs text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  {video.views.toLocaleString()} visualizações
                </div>
              </div>
              
              <a
                href={video.videoUrl}
                className="absolute inset-0"
                aria-label={`Assistir ${video.title}`}
              />
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
      </div>
    </div>
  );
};

export default VideoCarousel;