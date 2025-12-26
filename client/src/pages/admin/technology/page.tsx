import { useState, useEffect } from 'react';
import AdminLayout, { API_BASE_URL } from '../components/AdminLayout';
import { useCMSData } from '../hooks/useCMSData';

export default function AdminTechnologyPage() {
  const [activeSection, setActiveSection] = useState('hero');
  const { getFieldValue, loading } = useCMSData('technology');
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (!loading) {
      const sections = ['technical-advantages', 'advantages', 'benefits'];
      const urls: Record<string, string> = {};
      sections.forEach(section => {
        const url = getFieldValue(section, 'imageUrl') || '';
        if (url) urls[`${section}_imageUrl`] = url;
      });
      setImageUrls(urls);
    }
  }, [loading, getFieldValue, activeSection]);
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, section: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch(`${API_BASE_URL}/api/upload/image`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.imageUrl) {
          const fullUrl = `${API_BASE_URL}${result.imageUrl}`;
          // Try to find input by ID first, then by name
          const inputById = document.querySelector(`#${section}-${fieldName}`) as HTMLInputElement;
          const input = inputById || document.querySelector(`input[name="${fieldName}"]`) as HTMLInputElement;
          if (input) {
            input.value = fullUrl;
            // Update state for preview
            setImageUrls(prev => ({ ...prev, [`${section}_${fieldName}`]: fullUrl }));
            // Trigger change event
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        } else {
          alert('Failed to upload image. Please try again.');
        }
      } else {
        const errorText = await response.text();
        console.error('Upload failed:', response.status, errorText);
        alert(`Failed to upload image: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
    e.target.value = '';
  };

  const handleRemoveImage = (fieldName: string, section: string) => {
    // Try to find input by ID first, then by name
    const inputById = document.querySelector(`#${section}-${fieldName}`) as HTMLInputElement;
    const input = inputById || document.querySelector(`input[name="${fieldName}"]`) as HTMLInputElement;
    if (input) {
      input.value = '';
      // Update state to remove preview
      setImageUrls(prev => {
        const newUrls = { ...prev };
        delete newUrls[`${section}_${fieldName}`];
        return newUrls;
      });
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, section: string) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const dataObj: any = {};
    
    // Special handling for array sections
    if (section === 'innovation' || section === 'technical-advantages' || section === 'advantages' || section === 'benefits') {
      const items: any[] = [];
      for (let i = 1; i <= 10; i++) {
        const title = (formData.get(`${section}_${i}_title`) as string)?.trim();
        const description = (formData.get(`${section}_${i}_description`) as string)?.trim();
        const content = (formData.get(`${section}_${i}_content`) as string)?.trim();
        const icon = (formData.get(`${section}_${i}_icon`) as string)?.trim();
        
        if (title && (description || content)) {
          items.push({ 
            icon: icon || '', 
            title: title, 
            description: description || '',
            content: content || description || '',
          });
        }
      }
      dataObj.items = items;
      dataObj.title = (formData.get('title') as string)?.trim() || '';
      if (section === 'technical-advantages' || section === 'advantages' || section === 'benefits') {
        const imageUrl = (formData.get('imageUrl') as string)?.trim() || '';
        if (imageUrl) {
          dataObj.imageUrl = imageUrl;
        } else {
          // If empty, explicitly set to empty string to remove image
          dataObj.imageUrl = '';
        }
      }
    } else if (section === 'intro') {
      dataObj.label = (formData.get('label') as string)?.trim() || '';
      dataObj.title = (formData.get('title') as string)?.trim() || '';
      dataObj.imageUrl = (formData.get('imageUrl') as string)?.trim() || '';
      const listItems: string[] = [];
      for (let i = 1; i <= 10; i++) {
        const item = (formData.get(`listItem_${i}`) as string)?.trim();
        if (item) listItems.push(item);
      }
      dataObj.listItems = listItems;
    } else if (section === 'comparison') {
      dataObj.title = (formData.get('title') as string)?.trim() || '';
      const rows: any[] = [];
      for (let i = 1; i <= 10; i++) {
        const aspect = (formData.get(`row_${i}_aspect`) as string)?.trim();
        const vensys = (formData.get(`row_${i}_vensys`) as string)?.trim();
        const dfig = (formData.get(`row_${i}_dfig`) as string)?.trim();
        if (aspect && (vensys || dfig)) {
          rows.push({ aspect, vensys: vensys || '', dfig: dfig || '' });
        }
      }
      dataObj.rows = rows;
    } else {
      formData.forEach((value, key) => { 
        dataObj[key] = value;
      });
    }
    
    try {
      const { saveCMSData } = await import('../../../utils/cms');
      await saveCMSData('technology', section, dataObj);
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save changes.');
    }
  };

  if (loading) {
    return (
      <AdminLayout pageName="Technology" pagePath="/technology">
        <div className="flex items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-[#8DC63F] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  const sections = ['hero', 'intro', 'innovation', 'comparison', 'technical-advantages', 'advantages', 'benefits'];

  return (
    <AdminLayout pageName="Technology" pagePath="/technology">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-wrap gap-2">
            {sections.map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  activeSection === section ? 'bg-[#8DC63F] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        {activeSection === 'hero' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Hero Section</h2>
            <form onSubmit={(e) => handleSubmit(e, 'hero')}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input type="text" name="title" defaultValue={getFieldValue('hero', 'title')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent" placeholder="Technology" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
                  <input type="url" name="bgImageUrl" defaultValue={getFieldValue('hero', 'bgImageUrl')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent" placeholder="https://example.com/hero-bg.jpg" />
                  <div className="mt-2">
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'bgImageUrl')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#8DC63F] file:text-white hover:file:bg-[#7AB62F] file:cursor-pointer" />
                  </div>
                  {getFieldValue('hero', 'bgImageUrl') && (
                    <div className="mt-2">
                      <img src={getFieldValue('hero', 'bgImageUrl')} alt="Preview" className="w-full h-32 object-cover rounded-lg border border-gray-200" />
                    </div>
                  )}
                </div>
                <button type="submit" className="w-full px-6 py-3 bg-[#8DC63F] text-white rounded-lg hover:bg-[#7AB62F] transition-colors">
                  <i className="ri-save-line mr-2"></i>Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Intro Section */}
        {activeSection === 'intro' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Intro Section</h2>
            <form onSubmit={(e) => handleSubmit(e, 'intro')}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Label (Uppercase)</label>
                  <input type="text" name="label" defaultValue={getFieldValue('intro', 'label')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent" placeholder="Overview" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input type="text" name="title" defaultValue={getFieldValue('intro', 'title')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent" placeholder="Advanced Technology for Superior Performance" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input type="url" name="imageUrl" defaultValue={getFieldValue('intro', 'imageUrl')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent" placeholder="https://example.com/image.jpg" />
                  <div className="mt-2">
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'imageUrl')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#8DC63F] file:text-white hover:file:bg-[#7AB62F] file:cursor-pointer" />
                  </div>
                  {getFieldValue('intro', 'imageUrl') && (
                    <div className="mt-2">
                      <img src={getFieldValue('intro', 'imageUrl')} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-gray-200" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">List Items</label>
                  {[1, 2, 3, 4, 5].map((num) => {
                    const listItems = getFieldValue('intro', 'listItems') || [];
                    const item = listItems[num - 1] || '';
                    return (
                      <div key={num} className="mb-3">
                        <textarea name={`listItem_${num}`} defaultValue={item} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent text-sm" placeholder={`List item ${num}...`} />
                      </div>
                    );
                  })}
                </div>
                <button type="submit" className="w-full px-6 py-3 bg-[#8DC63F] text-white rounded-lg hover:bg-[#7AB62F] transition-colors">
                  <i className="ri-save-line mr-2"></i>Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Innovation Section */}
        {activeSection === 'innovation' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Innovation Section</h2>
            <form onSubmit={(e) => handleSubmit(e, 'innovation')}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                  <input type="text" name="title" defaultValue={getFieldValue('innovation', 'title')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent" placeholder="Salient features" />
                </div>
                {[1, 2, 3, 4, 5, 6].map((num) => {
                  const items = getFieldValue('innovation', 'items') || [];
                  const item = items[num - 1] || { icon: '', title: '', description: '' };
                  return (
                    <div key={num} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <h3 className="text-sm font-semibold text-gray-800 mb-3">Feature {num}</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Icon (RemixIcon class)</label>
                          <input type="text" name={`innovation_${num}_icon`} defaultValue={item.icon} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent text-sm" placeholder="ri-settings-3-line" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                          <input type="text" name={`innovation_${num}_title`} defaultValue={item.title} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent text-sm" placeholder="Feature title" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                          <textarea name={`innovation_${num}_description`} defaultValue={item.description} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent text-sm" placeholder="Feature description" />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button type="submit" className="w-full px-6 py-3 bg-[#8DC63F] text-white rounded-lg hover:bg-[#7AB62F] transition-colors">
                  <i className="ri-save-line mr-2"></i>Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Comparison Section */}
        {activeSection === 'comparison' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Comparison Section</h2>
            <form onSubmit={(e) => handleSubmit(e, 'comparison')}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                  <input type="text" name="title" defaultValue={getFieldValue('comparison', 'title')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent" placeholder="Technology Comparison" />
                </div>
                {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                  const rows = getFieldValue('comparison', 'rows') || [];
                  const row = rows[num - 1] || { aspect: '', vensys: '', dfig: '' };
                  return (
                    <div key={num} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <h3 className="text-sm font-semibold text-gray-800 mb-3">Row {num}</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Aspect</label>
                          <input type="text" name={`row_${num}_aspect`} defaultValue={row.aspect} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent text-sm" placeholder="Design concept" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Vensys GWH182-5.3 PMG Hybrid</label>
                          <textarea name={`row_${num}_vensys`} defaultValue={row.vensys} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent text-sm" placeholder="Vensys description" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Gearbox wind turbines DFIG</label>
                          <textarea name={`row_${num}_dfig`} defaultValue={row.dfig} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent text-sm" placeholder="DFIG description" />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button type="submit" className="w-full px-6 py-3 bg-[#8DC63F] text-white rounded-lg hover:bg-[#7AB62F] transition-colors">
                  <i className="ri-save-line mr-2"></i>Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Technical Advantages Section */}
        {activeSection === 'technical-advantages' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Technical Advantages Section</h2>
            <form onSubmit={(e) => handleSubmit(e, 'technical-advantages')}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                  <input type="text" name="title" defaultValue={getFieldValue('technical-advantages', 'title')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent" placeholder="Technical Advantages" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  <div className="flex gap-2">
                    <input 
                      type="url" 
                      name="imageUrl" 
                      id="technical-advantages-imageUrl"
                      defaultValue={getFieldValue('technical-advantages', 'imageUrl')} 
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent" 
                      placeholder="https://example.com/image.jpg" 
                    />
                    {(imageUrls['technical-advantages_imageUrl'] || getFieldValue('technical-advantages', 'imageUrl')) && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage('imageUrl', 'technical-advantages')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-delete-bin-line mr-2"></i>Remove
                      </button>
                    )}
                  </div>
                  <div className="mt-2">
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'imageUrl', 'technical-advantages')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#8DC63F] file:text-white hover:file:bg-[#7AB62F] file:cursor-pointer" />
                  </div>
                  {(imageUrls['technical-advantages_imageUrl'] || getFieldValue('technical-advantages', 'imageUrl')) && (
                    <div className="mt-2">
                      <img src={imageUrls['technical-advantages_imageUrl'] || getFieldValue('technical-advantages', 'imageUrl')} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-gray-200" />
                    </div>
                  )}
                </div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                  const items = getFieldValue('technical-advantages', 'items') || [];
                  const item = items[num - 1] || { title: '', content: '' };
                  return (
                    <div key={num} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <h3 className="text-sm font-semibold text-gray-800 mb-3">Advantage {num}</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                          <input type="text" name={`technical-advantages_${num}_title`} defaultValue={item.title} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent text-sm" placeholder="Advantage title" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Content</label>
                          <textarea name={`technical-advantages_${num}_content`} defaultValue={item.content} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent text-sm" placeholder="Advantage content" />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button type="submit" className="w-full px-6 py-3 bg-[#8DC63F] text-white rounded-lg hover:bg-[#7AB62F] transition-colors">
                  <i className="ri-save-line mr-2"></i>Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Advantages Section */}
        {activeSection === 'advantages' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Advantages Section</h2>
            <form onSubmit={(e) => handleSubmit(e, 'advantages')}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                  <input type="text" name="title" defaultValue={getFieldValue('advantages', 'title')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent" placeholder="Advantages over Competitors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  <div className="flex gap-2">
                    <input 
                      type="url" 
                      name="imageUrl" 
                      id="advantages-imageUrl"
                      defaultValue={getFieldValue('advantages', 'imageUrl')} 
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent" 
                      placeholder="https://example.com/image.jpg" 
                    />
                    {(imageUrls['advantages_imageUrl'] || getFieldValue('advantages', 'imageUrl')) && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage('imageUrl', 'advantages')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-delete-bin-line mr-2"></i>Remove
                      </button>
                    )}
                  </div>
                  <div className="mt-2">
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'imageUrl', 'advantages')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#8DC63F] file:text-white hover:file:bg-[#7AB62F] file:cursor-pointer" />
                  </div>
                  {(imageUrls['advantages_imageUrl'] || getFieldValue('advantages', 'imageUrl')) && (
                    <div className="mt-2">
                      <img src={imageUrls['advantages_imageUrl'] || getFieldValue('advantages', 'imageUrl')} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-gray-200" />
                    </div>
                  )}
                </div>
                {[1, 2, 3, 4, 5, 6].map((num) => {
                  const items = getFieldValue('advantages', 'items') || [];
                  const item = items[num - 1] || { title: '', content: '' };
                  return (
                    <div key={num} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <h3 className="text-sm font-semibold text-gray-800 mb-3">Advantage {num}</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                          <input type="text" name={`advantages_${num}_title`} defaultValue={item.title} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent text-sm" placeholder="Advantage title" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Content</label>
                          <textarea name={`advantages_${num}_content`} defaultValue={item.content} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent text-sm" placeholder="Advantage content" />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button type="submit" className="w-full px-6 py-3 bg-[#8DC63F] text-white rounded-lg hover:bg-[#7AB62F] transition-colors">
                  <i className="ri-save-line mr-2"></i>Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Benefits Section */}
        {activeSection === 'benefits' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits Section</h2>
            <form onSubmit={(e) => handleSubmit(e, 'benefits')}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                  <input type="text" name="title" defaultValue={getFieldValue('benefits', 'title')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent" placeholder="Other Benefits" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  <div className="flex gap-2">
                    <input 
                      type="url" 
                      name="imageUrl" 
                      id="benefits-imageUrl"
                      defaultValue={getFieldValue('benefits', 'imageUrl')} 
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent" 
                      placeholder="https://example.com/image.jpg" 
                    />
                    {(imageUrls['benefits_imageUrl'] || getFieldValue('benefits', 'imageUrl')) && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage('imageUrl', 'benefits')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-delete-bin-line mr-2"></i>Remove
                      </button>
                    )}
                  </div>
                  <div className="mt-2">
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'imageUrl', 'benefits')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#8DC63F] file:text-white hover:file:bg-[#7AB62F] file:cursor-pointer" />
                  </div>
                  {(imageUrls['benefits_imageUrl'] || getFieldValue('benefits', 'imageUrl')) && (
                    <div className="mt-2">
                      <img src={imageUrls['benefits_imageUrl'] || getFieldValue('benefits', 'imageUrl')} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-gray-200" />
                    </div>
                  )}
                </div>
                {[1, 2, 3, 4].map((num) => {
                  const items = getFieldValue('benefits', 'items') || [];
                  const item = items[num - 1] || { title: '', content: '' };
                  return (
                    <div key={num} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <h3 className="text-sm font-semibold text-gray-800 mb-3">Benefit {num}</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                          <input type="text" name={`benefits_${num}_title`} defaultValue={item.title} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent text-sm" placeholder="Benefit title" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Content</label>
                          <textarea name={`benefits_${num}_content`} defaultValue={item.content} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent text-sm" placeholder="Benefit content" />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button type="submit" className="w-full px-6 py-3 bg-[#8DC63F] text-white rounded-lg hover:bg-[#7AB62F] transition-colors">
                  <i className="ri-save-line mr-2"></i>Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
