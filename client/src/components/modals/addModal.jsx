// CourseModal.tsx
import { ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { useGetSettings } from "@/hooks/payments/useGetSettings";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import { useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import { useUpdateSunnahSettings } from "@/hooks/payments/useUpdateSunnahSettings";

export default function CourseModal() {
    const  userInfo  = useAuthUser();
    
    const { 
        data: settings, 
        isLoading,
        isError,
        error 
    } = useGetSettings({ userId:userInfo?.userId });
    const updateSunnah = useUpdateSunnahSettings();
    const [isExpanded, setIsExpanded] = useState(true);
    const { isOpen, onClose, type } = useModal();
    
    const isModalOpen = isOpen && type === MODAL_TYPE.ADD_MODAL;

    if (isError) {
        console.error('Settings fetch error:', error);
        return null;
    }

    const handleSunnahToggle = () => {
        // Get current state, default to false if undefined
        updateSunnah.mutate({
        userId:userInfo.userId,
        });
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md border-neutral-800 bg-[#1A1F24] p-0 text-white">
            <DialogHeader className="border-b border-neutral-800 p-4">
            <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-medium">
                Choose a tool
                </DialogTitle>
            </div>
            </DialogHeader>

            <div 
            className="p-2" 
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
            {isLoading ? (
                <div className="flex justify-center p-4">
                <LoadingSpinner />
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg bg-[#1E242A] transition-all">
                <button
                    className="w-full hover:bg-[#252B32] transition-colors"
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-expanded={isExpanded}
                >
                    <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-light">Sunnah</span>
                    </div>
                    <ChevronDown 
                        className={`h-5 w-5 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                        }`} 
                    />
                    </div>
                </button>

                {isExpanded && (
                    <div className="flex flex-col gap-4 px-4 pb-4">
                    <p className="text-sm text-neutral-400">
                        The right path to heaven.
                    </p>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                        <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mmmm-Q0IQtJCag8gpWCTqWPR0eLlpH2xnSj.png"
                        alt="Sunnah Preview"
                        className="object-cover"
                        loading="lazy"
                        />
                    </div>
                    <div className=" flex flex-row justify-end">
                    <button 
                        className=" w-fit flex flex-row justify-self-end p-2 rounded-xl hover:bg-[#1E2421] items-center gap-1 text-my-small-gold "
                        onClick={handleSunnahToggle}
                        disabled={updateSunnah.isLoading}
                    >
                        {updateSunnah.isLoading ? (
                        <LoadingSpinner className="h-4 w-4" />
                        ) : (
                        <>
                            {settings?.settings?.Sunnah ? 'Turn Off' : 'Turn On'}
                            <ChevronDown className="h-5 w-5 -rotate-90" />
                        </>
                        )}
                    </button>
                    </div>
                    </div>
                )}
                </div>
            )}
            </div>
        </DialogContent>
        </Dialog>
    );
}

