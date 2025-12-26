import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AdminIndexPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/login');
  };

  const adminPages = [
    { id: 'home', label: 'Home', icon: 'ri-home-4-line', path: '/admin/home', pagePath: '/' },
    { id: 'about', label: 'About', icon: 'ri-information-line', path: '/admin/about', pagePath: '/about-us' },
    { id: 'investor-relations', label: 'Investor Relations', icon: 'ri-file-chart-line', path: '/admin/investor-relations', pagePath: '/investor-relations' },
    { id: 'products', label: 'Products', icon: 'ri-product-hunt-line', path: '/admin/products', pagePath: '/products' },
    { id: 'technology', label: 'Technology', icon: 'ri-lightbulb-line', path: '/admin/technology', pagePath: '/technology' },
    { id: 'sustainability', label: 'Sustainability', icon: 'ri-leaf-line', path: '/admin/sustainability', pagePath: '/sustainability' },
    { id: 'careers', label: 'Careers', icon: 'ri-briefcase-line', path: '/admin/careers', pagePath: '/careers' },
    { id: 'contact', label: 'Contact', icon: 'ri-mail-line', path: '/admin/contact', pagePath: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Content Management System</h1>
              <p className="text-sm text-gray-600 mt-1">Select a page to manage content</p>
            </div>
            <div className="flex items-center gap-3">
              <a href="/" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
                <i className="ri-eye-line mr-2"></i>View Site
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                <i className="ri-logout-box-line mr-2"></i>Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminPages.map(page => (
            <a
              key={page.id}
              href={page.path}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#8DC63F]/10 flex items-center justify-center mr-4">
                  <i className={`${page.icon} text-2xl text-[#8DC63F]`}></i>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{page.label}</h2>
              </div>
              <p className="text-gray-600 text-sm mb-4">Manage content for the {page.label.toLowerCase()} page</p>
              <div className="flex items-center text-[#8DC63F] text-sm font-medium">
                <span>Edit Content</span>
                <i className="ri-arrow-right-line ml-2"></i>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

