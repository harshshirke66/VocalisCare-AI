import React, { useRef, useState } from 'react';
import { Camera, X, RotateCcw, Upload } from 'lucide-react';

interface MedicineScannerProps {
  onScan: (imageData: string) => void;
  onClose: () => void;
  isAnalyzing: boolean;
}

export function MedicineScanner({ onScan, onClose, isAnalyzing }: MedicineScannerProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null; 
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null; 
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setCapturedImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    if (capturedImage) {
      onScan(capturedImage);
    }
  };

  const resetScanner = () => {
    setCapturedImage(null);
    stopCamera();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Camera className="h-6 w-6" />
            Medicine Scanner
          </h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="aspect-square bg-black/20 rounded-lg overflow-hidden mb-4">
          {capturedImage ? (
            <img
              src={capturedImage}
              alt="Captured medicine"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/60">
              No image captured
            </div>
          )}
        </div>

        <div className="space-y-3">
          {!capturedImage && (
            <label className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors cursor-pointer">
              <Upload className="h-5 w-5" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          )}

          {capturedImage && (
            <div className="flex gap-3">
              <button
                onClick={handleScan}
                disabled={isAnalyzing}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Medicine'}
              </button>
              <button
                onClick={resetScanner}
                className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg px-4 py-2 transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
