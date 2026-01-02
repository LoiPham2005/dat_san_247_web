import { Button } from './button';
import { cn } from '@/lib/utils/format';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export const Dialog = ({ isOpen, onClose, title, children, footer }: DialogProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                        <span className="sr-only">Close</span>
                        &times;
                    </Button>
                </div>
                <div className="p-4">{children}</div>
                {footer && <div className="p-4 border-t bg-gray-50 rounded-b-lg flex justify-end gap-2">{footer}</div>}
            </div>
        </div>
    );
};
