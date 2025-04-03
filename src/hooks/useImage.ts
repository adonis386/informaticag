import { useState, useEffect } from 'react';

const supportsWebp = () => {
    try {
        return document.createElement('canvas').toDataURL('image/webp').includes('data:image/webp');
    } catch (e) {
        return false;
    }
};

export const useImage = (src: string) => {
    const [imageSrc, setImageSrc] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadImage = async () => {
            try {
                // Verificar si el navegador soporta WebP
                const supports = supportsWebp();
                
                // Obtener la extensión del archivo original
                const ext = src.substring(src.lastIndexOf('.') + 1).toLowerCase();
                
                // Si soporta WebP y no es una imagen WebP
                if (supports && ext !== 'webp') {
                    const webpSrc = src.replace(`.${ext}`, '.webp');
                    
                    // Verificar si existe el archivo WebP
                    const webpExists = await new Promise((resolve) => {
                        const img = new Image();
                        img.onload = () => resolve(true);
                        img.onerror = () => resolve(false);
                        img.src = webpSrc;
                    });

                    if (webpExists) {
                        setImageSrc(webpSrc);
                    } else {
                        setImageSrc(src);
                    }
                } else {
                    setImageSrc(src);
                }
            } catch (err) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadImage();
    }, [src]);

    return { imageSrc, isLoading, error };
};
