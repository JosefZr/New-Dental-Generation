import { useUserToChatContext } from "@/context/ToChatUser";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // Blur effect

export default function MessageImage({ message,onImageLoad }) {
  const { onOpen } = useModal();
  const { setImagesToShow, setInitialIndex } = useUserToChatContext();

  return (
    <>
      {message?.images.length > 0 && (
        <div className="mt-2">
          {/* Single Image */}
          {message.images.length === 1 && (
            <div className="max-w-[400px]">
              <LazyLoadImage
                src={message.images[0]}
                onLoad={onImageLoad} // Add this

                alt="Attachment 1"
                effect="blur"
                onClick={() => {
                  setInitialIndex(0);
                  setImagesToShow(message.images);
                  onOpen(MODAL_TYPE.IMAGES_MODAL);
                }}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          {/* Two Images */}
          {message.images.length === 2 && (
            <div className="grid grid-cols-2 gap-2 max-w-[400px]">
              {message.images.map((file, index) => (
                <LazyLoadImage
                  key={index}
                  src={file}
                  onLoad={onImageLoad} // Add this
                  alt={`Attachment ${index + 1}`}
                  effect="blur"
                  onClick={() => {
                    setInitialIndex(index);
                    setImagesToShow(message.images);
                    onOpen(MODAL_TYPE.IMAGES_MODAL);
                  }}
                  className="w-full h-auto rounded-lg"
                />
              ))}
            </div>
          )}

          {/* More than 2 images (general case) */}
          {message.images.length > 2 && (
            <div className="grid grid-cols-2 gap-2 max-w-[400px]">
              {message.images.slice(0, 4).map((file, index) => (
                <LazyLoadImage
                  key={index}
                  src={file}
                  onLoad={onImageLoad} // Add this
                  alt={`Attachment ${index + 1}`}
                  effect="blur"
                  onClick={() => {
                    setInitialIndex(index);
                    setImagesToShow(message.images);
                    onOpen(MODAL_TYPE.IMAGES_MODAL);
                  }}
                  className="w-full h-auto rounded-lg"
                />
              ))}
              {message.images.length > 4 && (
                <div
                  className="relative w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white rounded-lg cursor-pointer"
                  onClick={() => {
                    setInitialIndex(4);
                    setImagesToShow(message.images);
                    onOpen(MODAL_TYPE.IMAGES_MODAL);
                  }}
                >
                  +{message.images.length - 4} more
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
