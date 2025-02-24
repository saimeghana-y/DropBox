'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';
import useAuth from '../../../hooks/useAuth';

export default function FilePreview() {
  useAuth();
  const router = useRouter();
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5001/api/files/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('File not found');
        }

        const fileData = await response.json();
        setFile(fileData);

        // Fetch preview content for text files
        if (fileData.mimetype === 'text/plain' || fileData.mimetype === 'application/json') {
          const previewResponse = await fetch(`http://localhost:5001/api/preview/${id}`);
          const textContent = await previewResponse.text();
          setContent(textContent);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFile();
  }, [id]);

  const handleDownload = () => {
    window.open(`http://localhost:5001/api/download/${id}`);
  };

  if (error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500">{error}</p>
        <Link href="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          Back to Files
        </Link>
      </div>
    );
  }

  if (!file) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Link 
          href="/"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Files
        </Link>
        <button
          onClick={handleDownload}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {file.originalName}
          </h1>
          <p className="text-gray-500 mb-4">
            Size: {(file.size / 1024).toFixed(2)} KB
          </p>

          <div className="mt-6">
            {file.mimetype.startsWith('image/') ? (
              <img
                src={`http://localhost:5001/api/preview/${id}`}
                alt={file.originalName}
                className="max-w-full h-auto rounded"
              />
            ) : file.mimetype === 'text/plain' || file.mimetype === 'application/json' ? (
              <pre className="bg-gray-50 p-4 rounded overflow-x-auto whitespace-pre-wrap text-gray-900">
                {content}
              </pre>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Preview not available for this file type
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 