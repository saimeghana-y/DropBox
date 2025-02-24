'use client';

import Link from 'next/link';

export default function FileList({ files }) {
  const handleDownload = async (id, filename) => {
    try {
      window.open(`http://localhost:5001/api/download/${id}`);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Your Files</h2>
      <div className="grid gap-4">
        {files.map((file) => (
          <div
            key={file._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <Link href={`/file/${file._id}`} className="hover:underline">
              <div>
                <p className="font-medium">{file.originalName}</p>
                <p className="text-sm text-gray-500">
                  Size: {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </Link>
            <button
              onClick={() => handleDownload(file._id, file.originalName)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 