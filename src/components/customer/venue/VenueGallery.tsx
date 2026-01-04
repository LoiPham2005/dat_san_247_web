'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';

export const VenueGallery = ({ images }: { images: string[] }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const extraImages = images.length - 5;

    return (
        <div className="grid grid-cols-4 gap-2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden relative group">
            <div className="col-span-2 row-span-2 relative cursor-pointer" onClick={() => setIsOpen(true)}>
                <img src={images[0]} alt="Main" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            {images.slice(1, 4).map((img, idx) => (
                <div key={idx} className="relative cursor-pointer" onClick={() => { setSelectedImage(idx + 1); setIsOpen(true); }}>
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
            ))}
            <div className="relative cursor-pointer" onClick={() => { setSelectedImage(4); setIsOpen(true); }}>
                <img src={images[4]} alt="Gallery 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                {extraImages > 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xl backdrop-blur-sm group-hover:bg-black/40 transition-colors">
                        +{extraImages}
                    </div>
                )}
            </div>

            <Button
                variant="outline"
                size="sm"
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur shadow-sm hover:bg-white border-transparent"
                onClick={() => setIsOpen(true)}
            >
                <ImageIcon className="mr-2 h-4 w-4" /> View All Photos
            </Button>

            {/* Simple Lightbox (Placeholder behavior) */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-black border-none">
                    <div className="relative h-[80vh]">
                        <img
                            src={images[selectedImage]}
                            alt="Full View"
                            className="w-full h-full object-contain"
                        />
                        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex gap-2 overflow-x-auto justify-center">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${selectedImage === idx ? 'border-primary-500' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
