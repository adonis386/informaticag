import { useEffect, useRef, useState } from 'react';

interface UseOptimizedVideoProps {
  src: string;
  lowQualitySrc?: string;
  quality?: 'auto' | 'low' | 'high';
}

const useOptimizedVideo = ({ src, lowQualitySrc, quality = 'auto' }: UseOptimizedVideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || src);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Configuración inicial para mejor rendimiento
    video.preload = 'metadata';
    video.playsInline = true;
    video.muted = true;
    video.autoplay = true;
    video.loop = true;

    // Reducir la calidad en dispositivos de bajos recursos
    const checkPerformance = () => {
      if (quality === 'auto') {
        // Detectar dispositivos de bajos recursos
        const isLowEndDevice = 
          navigator.hardwareConcurrency <= 4 || // 4 cores o menos
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Usar versión de baja calidad si está disponible y es un dispositivo de bajos recursos
        if (isLowEndDevice && lowQualitySrc) {
          setCurrentSrc(lowQualitySrc);
        }
      } else {
        setCurrentSrc(quality === 'low' && lowQualitySrc ? lowQualitySrc : src);
      }
    };

    checkPerformance();

    // Optimizaciones adicionales
    const handleCanPlay = () => {
      setIsLoading(false);
      
      // Reducir la resolución del video en dispositivos de bajos recursos
      if (video.videoWidth > 1280) {
        video.style.filter = 'blur(0.5px)'; // Suavizar para ocultar pérdida de calidad
      }
    };

    // Manejo de errores y recuperación
    const handleError = () => {
      console.warn('Error loading video, falling back to low quality version');
      if (lowQualitySrc && currentSrc !== lowQualitySrc) {
        setCurrentSrc(lowQualitySrc);
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Optimización de memoria
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.src = '';
      video.load();
    };
  }, [src, lowQualitySrc, quality, currentSrc]);

  return {
    videoRef,
    isLoading,
    currentSrc,
  };
};

export default useOptimizedVideo;
