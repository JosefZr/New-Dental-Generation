// CourseModal.tsx
import { ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { useGetSettings } from "@/hooks/payments/useGetSettings";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import { useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import { useUpdateSunnahSettings } from "@/hooks/settings/useUpdateSunnahSettings";
import { useUpdateTopDentistSettings } from "@/hooks/settings/useUpdateTopDentist";

export default function CourseModal() {
    const  userInfo  = useAuthUser();
    
    const { 
        data: settings, 
        isLoading,
        isError,
        error 
    } = useGetSettings({ userId:userInfo?.userId });
    const updateSunnah = useUpdateSunnahSettings();
    const updateTopDentist = useUpdateTopDentistSettings();

    const [expandedSections, setExpandedSections] = useState({});    
    const { isOpen, onClose, type } = useModal();
    
    const isModalOpen = isOpen && type === MODAL_TYPE.ADD_MODAL;

    if (isError) {
        console.error('Settings fetch error:', error);
        return null;
    }
    const  Config = [
        {
            id: 'sunnah',
            title: 'Sunnah',
            description: 'The right path to heaven.',
            image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mmmm-Q0IQtJCag8gpWCTqWPR0eLlpH2xnSj.png',
            settingsKey: 'Sunnah',
            mutation: updateSunnah
        },
        {
            id: 'top-dentist',
            title: 'Top Dentist Opportunity',
            description: 'Professional dental growth program.',
            image: 'https://example.com/top-dentist-image.png',
            settingsKey: 'topDentist',
            mutation: updateTopDentist
        }
        // Add more courses here
    ];
    const handleToggle = (mutation, userId) => {
        mutation.mutate({ userId });
    };
    const toggleSection = (courseId) => {
        setExpandedSections(prev => ({
            ...prev,
            [courseId]: !prev[courseId]
        }));
    };
    if (isError) {
        console.error('Settings fetch error:', error);
        return null;
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="custom-scroll max-w-md border-neutral-800 bg-[#1A1F24] p-0 text-white max-h-[90vh] flex flex-col">
            <DialogHeader className="border-b border-neutral-800 p-4">
            <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-medium">
                Choose a tool
                </DialogTitle>
            </div>
            </DialogHeader>

            <div className="p-2 overflow-y-scroll" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                    {isLoading ? (
                        <div className="flex justify-center p-4">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        Config.map((course) => (
                            <div key={course.id} className="overflow-hidden  rounded-lg bg-[#1E242A] transition-all mb-4">
                                <button
                                    className="w-full hover:bg-[#252B32] transition-colors"
                                    onClick={() => toggleSection(course.id)}
                                    aria-expanded={expandedSections[course.id]}
                                >
                                    <div className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl font-light">{course.title}</span>
                                        </div>
                                        <ChevronDown 
                                            className={`h-5 w-5 transition-transform duration-200 ${
                                                expandedSections[course.id] ? "rotate-180" : ""
                                            }`} 
                                        />
                                    </div>
                                </button>

                                {expandedSections[course.id] && (
                                    <div className="flex flex-col gap-4 px-4 pb-4">
                                        <p className="text-sm text-neutral-400">
                                            {course.description}
                                        </p>
                                        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                                            <img
                                                src={course.image}
                                                alt={`${course.title} Preview`}
                                                className="object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="flex flex-row justify-end">
                                            <button 
                                                className="w-fit flex flex-row justify-self-end p-2 rounded-xl hover:bg-[#1E2421] items-center gap-1 text-my-small-gold"
                                                onClick={() => handleToggle(course.mutation, userInfo.userId)}
                                                disabled={course.mutation.isLoading}
                                            >
                                                {course.mutation.isLoading ? (
                                                    <LoadingSpinner className="h-4 w-4" />
                                                ) : (
                                                    <>
                                                        {settings?.settings?.[course.settingsKey] ? 'Turn Off' : 'Turn On'}
                                                        <ChevronDown className="h-5 w-5 -rotate-90" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

