import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getCMSData } from '../../../utils/cms';

interface GalleryContent {
  images?: string[];
}

const defaultImages = [
  'https://venwindrefex.com/wp-content/uploads/2025/01/gallery-img01.jpg',
  'https://venwindrefex.com/wp-content/uploads/2025/01/gallery-img04.jpg',
  'https://venwindrefex.com/wp-content/uploads/2025/01/gallery-img02.jpg',
  'https://venwindrefex.com/wp-content/uploads/2025/01/gallery-img05.jpg',
];

export default function GallerySection() {
  const [content, setContent] = useState<GalleryContent>({
    images: defaultImages,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
    });

    const fetchContent = async () => {
      try {
        const result = await getCMSData('products', 'gallery', {
          defaultValue: { images: defaultImages },
        });
        setContent({
          images: (result.data.images && result.data.images.length > 0) ? result.data.images : defaultImages,
        });
      } catch (error) {
        console.error('Error loading gallery content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();

    const handleCmsUpdate = (e: CustomEvent) => {
      if (e.detail.page === 'products' && e.detail.section === 'gallery') {
        fetchContent();
      }
    };
    window.addEventListener('cmsUpdate', handleCmsUpdate as EventListener);

    return () => {
      window.removeEventListener('cmsUpdate', handleCmsUpdate as EventListener);
    };
  }, []);

  if (loading) {
    return (
      <section className="py-0 bg-gray-900">
        <div className="flex items-center justify-center h-80">
          <div className="w-16 h-16 border-4 border-[#8DC63F] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  const images = content.images || defaultImages;

  return (
    <section className="py-0 bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden group cursor-pointer h-80"
          >
            <img 
              src={image} 
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
