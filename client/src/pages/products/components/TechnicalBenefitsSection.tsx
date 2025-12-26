import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getCMSData } from '../../../utils/cms';

interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

interface TechnicalBenefitsContent {
  title?: string;
  items?: BenefitItem[];
}

const defaultBenefits: BenefitItem[] = [
  { icon: 'ri-settings-3-line', title: 'PMG Advantage', description: 'No external power needed to start, with minimal reactive power consumption.' },
  { icon: 'ri-radar-line', title: 'LiDAR Control', description: 'Measures wind ahead of the rotor in 3D, enhancing accuracy over traditional anemometers.' },
  { icon: 'ri-plug-line', title: 'Grid Compatibility', description: 'Full Power Converter ensures efficiency, better power quality, and supports LVRT, HVRT, ZVRT, and frequency ride-through.' },
  { icon: 'ri-dashboard-line', title: 'High Efficiency', description: 'PMG and higher generator voltage (1380 V) reduce losses with lower RPM.' },
  { icon: 'ri-expand-diagonal-line', title: 'Scalability', description: 'Expandable platform.' },
];

export default function TechnicalBenefitsSection() {
  const [content, setContent] = useState<TechnicalBenefitsContent>({
    title: 'Technical Benefits',
    items: defaultBenefits,
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
        const result = await getCMSData('products', 'technical-benefits', {
          defaultValue: { title: 'Technical Benefits', items: defaultBenefits },
        });
        setContent({
          title: result.data.title || 'Technical Benefits',
          items: (result.data.items && result.data.items.length > 0) ? result.data.items : defaultBenefits,
        });
      } catch (error) {
        console.error('Error loading technical benefits content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();

    const handleCmsUpdate = (e: CustomEvent) => {
      if (e.detail.page === 'products' && e.detail.section === 'technical-benefits') {
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
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#8DC63F] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  const benefits = content.items || defaultBenefits;

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <h2 className="text-white text-4xl lg:text-5xl font-bold text-center mb-16" data-aos="fade-up">
          {content.title || 'Technical Benefits'}
        </h2>
        
        <div className="space-y-8">
          {benefits.map((benefit, index) => (
            <div key={index}>
              <div 
                className="border-b border-gray-700 pb-8"
                data-aos="fade-up"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-2 flex justify-center md:justify-start">
                    <button className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center hover:bg-[#8DC63F] hover:border-[#8DC63F] transition-all duration-300 cursor-pointer group">
                      <i className={`${benefit.icon} text-2xl group-hover:rotate-180 transition-transform duration-500`}></i>
                    </button>
                  </div>
                  
                  <div className="md:col-span-4">
                    <h3 className="text-white text-2xl font-bold">{benefit.title}</h3>
                  </div>
                  
                  <div className="md:col-span-6">
                    <p className="text-gray-300 text-base leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
