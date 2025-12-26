import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../components/AdminLayout';

interface CMSData {
  [key: string]: any;
}

export function useCMSData(page: string) {
  const [cmsData, setCmsData] = useState<CMSData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCMSData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/admin/cms/page/${page}`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            // Transform the data structure from { section: data } to { cms_page_section: data }
            const transformedData: CMSData = {};
            Object.keys(result.data).forEach(section => {
              transformedData[`cms_${page}_${section}`] = result.data[section];
            });
            setCmsData(transformedData);
          }
        }
      } catch (error) {
        console.error('Error loading CMS data from API:', error);
        // Fallback to localStorage if API fails
        const loadedData: CMSData = {};
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith(`cms_${page}_`)) {
            try {
              loadedData[key] = JSON.parse(localStorage.getItem(key) || '{}');
            } catch (e) {
              console.error('Error loading', key);
            }
          }
        });
        setCmsData(loadedData);
      } finally {
        setLoading(false);
      }
    };

    loadCMSData();
  }, [page]);

  const getFieldValue = (section: string, field: string) => {
    const key = `cms_${page}_${section}`;
    return cmsData[key]?.[field] || '';
  };

  return { cmsData, loading, getFieldValue };
}

