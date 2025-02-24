'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';

export default function FilePage() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/files/${id}`);
        const data = await response.json();
        setFile(data);
        
        if (data.mimetype === 'text/plain' || data.mimetype === 'application/json') {
          const contentResponse = await fetch(`http://localhost:5001/api/preview/${id}`);
          const textContent = await contentResponse.text();
          setContent(textContent);
        }
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    fetchFile();
  }, [id]);

  const handleDownload = () => {
    window.open(`http://localhost:5001/api/download/${id}`);
  };

  if (!file) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center text-primary hover:text-secondary transition duration-300">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back to files</span>
        </Link>
        <button 
          onClick={handleDownload}
          className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300"
        >
          <Download className="w-4 h-4 mr-2" />
          <span>Download</span>
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
        <h2 className="text-2xl font-semibold mb-4">{file.originalName}</h2>
        <p className="text-sm text-gray-500 mb-4">Size: {(file.size / 1024).toFixed(2)} KB</p>
        <div className="border rounded p-4 bg-gray-50">
          {file.mimetype.startsWith('image/') ? (
            <img 
              src={`http://localhost:5001/api/preview/${id}`}
              alt={file.originalName}
              className="max-w-full h-auto"
            />
          ) : (
            <pre className="whitespace-pre-wrap text-gray-900">{content}</pre>
          )}
        </div>
      </div>
    </div>
  );
} 