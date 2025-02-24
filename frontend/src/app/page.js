'use client';

import { useState, useEffect } from 'react';
import { Upload, File, FileText, Image, Download, FolderOpen } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import useAuth from '../hooks/useAuth';
import Link from 'next/link';

export default function Home() {
  useAuth();

  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token being used:', token);
      
      const response = await fetch('http://localhost:5001/api/files', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log('Files received:', data);
      setFiles(data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const getFileIcon = (mimetype) => {
    if (!mimetype) return <File className="w-6 h-6 text-gray-500" />;
    if (mimetype.startsWith('text/')) {
      return <FileText className="w-6 h-6 text-blue-500" />;
    } else if (mimetype.startsWith('image/')) {
      return <Image className="w-6 h-6 text-green-500" />;
    }
    return <File className="w-6 h-6 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Your Files</h2>
        <FileUpload onUploadSuccess={fetchFiles} />
      </div>
      {files.length === 0 ? (
        <div className="text-center py-16 bg-white shadow-md rounded-lg">
          <FolderOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No files yet</h3>
          <p className="text-gray-500 mb-6">Upload your first file to get started!</p>
          <FileUpload 
            onUploadSuccess={fetchFiles}
            className="bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded inline-flex items-center cursor-pointer transition duration-300"
          >
            <Upload className="w-5 h-5 mr-2" />
            <span>Upload Your First File</span>
          </FileUpload>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {files.map((file) => (
              <li key={file._id} className="p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/files/${file._id}`}
                    className="flex items-center flex-1 cursor-pointer"
                  >
                    <div className="flex items-center">
                      {getFileIcon(file.mimetype)}
                      <span className="ml-3 text-sm font-medium text-gray-900">{file.originalName}</span>
                    </div>
                  </Link>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</span>
                    <Download 
                      className="w-5 h-5 ml-4 text-gray-400 hover:text-primary cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`http://localhost:5001/api/download/${file._id}`);
                      }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 