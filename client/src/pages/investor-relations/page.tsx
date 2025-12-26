import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import SidebarNavigation from './components/SidebarNavigation';
import ContentSection from './components/ContentSection';

export default function InvestorRelations() {
  const [activeSection, setActiveSection] = useState<string>('annual-return');
  const [activeSubsection, setActiveSubsection] = useState<string>('fy-2024-25');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12 text-center" data-aos="fade-up">
            Investor Relations
          </h1>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <SidebarNavigation
                activeSection={activeSection}
                activeSubsection={activeSubsection}
                onSectionChange={setActiveSection}
                onSubsectionChange={setActiveSubsection}
              />
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <ContentSection
                activeSection={activeSection}
                activeSubsection={activeSubsection}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

