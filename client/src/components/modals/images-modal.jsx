import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { useCallback, useEffect, useContext } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useUserToChatContext } from "@/context/ToChatUser";

export default function ImagesModal() {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === MODAL_TYPE.IMAGES_MODAL;

  const { imagesToShow, initialIndex, setInitialIndex } = useUserToChatContext();
  const images = imagesToShow || [];
  const currentIndex = initialIndex;

  const handlePrevious = useCallback(() => {
    setInitialIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length, setInitialIndex]);

  const handleNext = useCallback(() => {
    setInitialIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length, setInitialIndex]);

  useEffect(() => {
    if (isOpen) {
      setInitialIndex(initialIndex);
    }
  }, [isOpen, initialIndex, setInitialIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrevious, handleNext]);

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-fit border-none bg-background/95 p-0">
        <button
          size="icon"
          className="fixed right-[-200px] top-[-50px] z-50 h-8 w-8 rounded-full "
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex min-h-[200px] min-w-[200px] items-center justify-center">
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-[-200px] top-1/2 z-50 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-[-200px] top-1/2 z-50 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80"
                onClick={handleNext}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next image</span>
              </Button>
            </>
          )}

          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Image ${currentIndex + 1} of ${images.length}`}
            className="max-h-[80vh] max-w-[90vw] object-contain"
          />

          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-background/50 px-2 py-1">
              {images.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
                  onClick={() => setInitialIndex(index)}
                >
                  <span className="sr-only">Go to image {index + 1}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
