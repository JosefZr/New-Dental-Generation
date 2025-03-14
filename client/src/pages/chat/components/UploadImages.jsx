import { X } from "lucide-react";


export default function UploadImages({handleSubmit,images,uploadingImages,removeImage}) {
  return (
    <div className="flex flex-shrink-0 w-full items-center gap-3 border-gray-700 border-t px-3">
    <div className="w-full max-w-md mx-auto flex flex-col-reverse">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-start pt-3 w-full">
        </div>
      </form>
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.preview}
                alt={`Preview of ${image.file.name}`}
                className="w-full h-auto rounded-lg object-cover"
              />
              {/* Overlay for uploading state */}
              {uploadingImages[image.id] && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                </div>
              )}
              {/* Status indicator */}
              {image.status === 'failed' && (
                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
                  Failed
                </div>
              )}
              <button
                type="button"
                onClick={() => removeImage(image.id)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove ${image.file.name}`}
                disabled={uploadingImages[image.id]}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  )
}
