import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getCMSData } from '../../../utils/cms';

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesContent {
  title?: string;
  items?: FeatureItem[];
}

const defaultFeatures: FeatureItem[] = [
  { icon: 'ri-settings-3-line', title: 'Core Efficiency', description: 'MSPM drive train with a permanent magnet generator minimizes energy loss and maximizes output.' },
  { icon: 'ri-flashlight-line', title: 'High Power Output', description: '182m rotor diameter.' },
  { icon: 'ri-cpu-line', title: 'Grid-Friendly', description: 'Full-power converter (AC-DC-AC) ensures smooth grid integration with LVRT and HVRT compatibility.' },
  { icon: 'ri-tools-line', title: 'Low Maintenance', description: 'Medium-speed gearbox reduces wear, cutting costs and extending lifespan.' },
  { icon: 'ri-settings-2-line', title: 'Superior Performance', description: 'Starts power generation at 2.5 m/s cut-in wind speed.' },
  { icon: 'ri-shape-line', title: 'Adaptable Design', description: 'Modular structure supports future upgrades and scalability.' },
];

export default function FeaturesSection() {
  const [content, setContent] = useState<FeaturesContent>({
    title: 'Why choose the GWH182-5.3MW wind turbine?',
    items: defaultFeatures,
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
        const result = await getCMSData('products', 'features', {
          defaultValue: { title: 'Why choose the GWH182-5.3MW wind turbine?', items: defaultFeatures },
        });
        setContent({
          title: result.data.title || 'Why choose the GWH182-5.3MW wind turbine?',
          items: (result.data.items && result.data.items.length > 0) ? result.data.items : defaultFeatures,
        });
      } catch (error) {
        console.error('Error loading features content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();

    const handleCmsUpdate = (e: CustomEvent) => {
      if (e.detail.page === 'products' && e.detail.section === 'features') {
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
      <section className="py-20 bg-[#f5f7f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#8DC63F] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  const features = content.items || defaultFeatures;

  return (
    <section className="py-20 bg-[#f5f7f0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <h2 className="text-gray-900 text-4xl lg:text-5xl font-bold text-center mb-16" data-aos="fade-up">
          {content.title || 'Why choose the GWH182-5.3MW wind turbine?'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {features.slice(0, 3).map((feature, index) => (
            <div 
              key={index} 
              className="text-center"
              data-aos="fade-up"
            >
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-[#8DC63F]/10 flex items-center justify-center">
                  <i className={`${feature.icon} text-[#8DC63F] text-5xl`}></i>
                </div>
              </div>
              <h4 className="text-gray-900 text-xl font-bold mb-4">{feature.title}</h4>
              <p className="text-gray-700 text-base leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.slice(3).map((feature, index) => (
            <div 
              key={index} 
              className="text-center"
              data-aos="fade-up"
            >
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-[#8DC63F]/10 flex items-center justify-center">
                  <i className={`${feature.icon} text-[#8DC63F] text-5xl`}></i>
                </div>
              </div>
              <h4 className="text-gray-900 text-xl font-bold mb-4">{feature.title}</h4>
              <p className="text-gray-700 text-base leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
