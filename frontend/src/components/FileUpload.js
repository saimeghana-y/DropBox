'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function FileUpload({ onUploadSuccess, className }) {
  const [uploading, setUploading] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5001/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        onUploadSuccess();
        e.target.value = ''; // Reset file input
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <label className={className || "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center cursor-pointer transition duration-300"}>
      <Upload className="w-4 h-4 mr-2" />
      <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept=".txt,.json,.jpg,.png"
        disabled={uploading}
      />
    </label>
  );
} 