"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/Dialog';
import { Button } from '@/components/common/Button';
import { X, QrCode, Camera, AlertCircle } from 'lucide-react';

interface QRScannerDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onScanSuccess: (decodedText: string) => void;
}

export const QRScannerDialog: React.FC<QRScannerDialogProps> = ({ isOpen, onClose, onScanSuccess }) => {
    const [error, setError] = useState<string | null>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const containerId = "qr-reader-container";

    useEffect(() => {
        if (isOpen) {
            setError(null);
            const startScanner = async () => {
                try {
                    // Slight delay to ensure DOM is ready
                    setTimeout(async () => {
                        const html5QrCode = new Html5Qrcode(containerId);
                        scannerRef.current = html5QrCode;
                        
                        const config = { 
                            fps: 10, 
                            qrbox: { width: 250, height: 250 },
                            aspectRatio: 1.0 
                        };

                        await html5QrCode.start(
                            { facingMode: "environment" }, 
                            config, 
                            (decodedText) => {
                                onScanSuccess(decodedText);
                                handleStop();
                            },
                            (errorMessage) => {
                                // Ignore common errors
                            }
                        );
                    }, 500);
                } catch (err: any) {
                    setError("Không thể khởi động camera. Vui lòng cấp quyền truy cập.");
                    console.error("QR Error:", err);
                }
            };
            startScanner();
        }

        return () => {
            handleStop();
        };
    }, [isOpen]);

    const handleStop = async () => {
        if (scannerRef.current && scannerRef.current.isScanning) {
            try {
                await scannerRef.current.stop();
                scannerRef.current = null;
            } catch (err) {
                console.error("Stop error:", err);
            }
        }
    };

    const handleManualClose = async () => {
        await handleStop();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(val) => !val && handleManualClose()}>
            <DialogContent className="p-8">
                <DialogHeader className="mb-6">
                    <DialogTitle className="text-2xl font-black text-slate-900">Quét Mã QR Đặt Sân</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center">
                    <div className="w-full bg-slate-900 rounded-2xl overflow-hidden relative border-4 border-slate-800 shadow-2xl aspect-square max-w-[400px]">
                        <div id={containerId} className="w-full h-full"></div>
                        
                        {!error && (
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                <div className="w-64 h-64 border-2 border-primary/50 rounded-3xl animate-pulse flex items-center justify-center">
                                    <div className="w-48 h-48 border border-white/20 rounded-2xl"></div>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-6 text-center text-white">
                                <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
                                <p className="font-bold text-lg mb-2">Lỗi Camera</p>
                                <p className="text-sm text-slate-400">{error}</p>
                                <Button variant="outline" className="mt-6 border-slate-700 text-white" onClick={() => window.location.reload()}>
                                    Thử Lại
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 text-center space-y-2">
                        <p className="text-sm font-bold text-slate-700 flex items-center justify-center gap-2">
                            <Camera className="w-4 h-4 text-indigo-600" /> Vui lòng đưa mã QR vào khung hình
                        </p>
                        <p className="text-xs text-slate-500">Mã QR nằm trong chi tiết đặt sân trên ứng dụng khách hàng.</p>
                    </div>

                    <div className="mt-8 flex gap-3 w-full">
                        <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold" onClick={handleManualClose}>
                            Hủy Bỏ
                        </Button>
                    </div>
                </div>

                <button
                    onClick={handleManualClose}
                    className="absolute right-6 top-6 p-2 text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded-full transition-all"
                >
                    <X className="w-6 h-6" />
                </button>
            </DialogContent>
        </Dialog>
    );
};
