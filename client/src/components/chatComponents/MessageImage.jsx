import { useUserToChatContext } from "@/context/ToChatUser";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";

export default function MessageImage({message}) {
  const{onOpen} = useModal()
  const{ setImagesToShow,
    setInitialIndex} = useUserToChatContext()
   return(
    <>
     {message?.images.length > 0 && (
        <div className="mt-2">
          {/* Single Image */}
          {message.images.length === 1 && (
            <div className="max-w-[400px]">
              <img
                src={message.images[0]}
                alt="Attachment 1"
                onClick={()=>{
                  setInitialIndex(0)
                  setImagesToShow(message.images)
                  onOpen(MODAL_TYPE.IMAGES_MODAL)
      
                }}
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
          )}
      
          {/* Two Images */}
          {message.images.length === 2 && (
            <div className="grid grid-cols-2 gap-2 max-w-[400px]">
              {message.images.map((file, index) => (
                <img
                  key={index}
                  onClick={()=>{
                    setInitialIndex(index)
                    setImagesToShow(message.images)
                    onOpen(MODAL_TYPE.IMAGES_MODAL)
                  }}
                  src={file}
                  alt={`Attachment ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              ))}
            </div>
          )}
      
          {/* Three Images */}
          {message.images.length === 3 && (
            <div className="grid grid-cols-2 gap-2 max-w-[400px]">
              <img
                src={message.images[0]}
                alt="Attachment 1"
                className="w-full h-auto rounded-lg"
                loading="lazy"
                onClick={()=>{
                  setInitialIndex(0)
                  setImagesToShow(message.images)
                    onOpen(MODAL_TYPE.IMAGES_MODAL)
                }}
              />
              <div className="grid grid-rows-2 gap-2">
                {message.images.slice(1).map((file, index) => (
                  <img
                    key={index + 1}
                    src={file}
                    alt={`Attachment ${index + 2}`}
                    onClick={()=>{
                      setInitialIndex(index+1)
                    }}
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          )}
      
          {/* Four Images */}
          {message.images.length === 4 && (
            <div className="grid grid-cols-2 gap-2 w-full">
              {message.images.map((file, index) => (
                <img
                  key={index}
                  src={file}
                  onClick={()=>{
                    setInitialIndex(index)
                    setImagesToShow(message.images)
                    onOpen(MODAL_TYPE.IMAGES_MODAL)
                  }}
                  alt={`Attachment ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              ))}
            </div>
          )}
      
          {/* Five Images */}
          {message.images.length === 5 && (
            <div className="grid grid-cols-2 gap-2 max-w-[400px]">
              <div className="grid gap-2">
                {message.images.slice(0, 3).map((file, index) => (
                  <img
                    key={index}
                    src={file}
                    onClick={()=>{
                      setInitialIndex(index)
                      setImagesToShow(message.images)
                      onOpen(MODAL_TYPE.IMAGES_MODAL)
                    }}
                    alt={`Attachment ${index + 1}`}
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="grid gap-2">
                {message.images.slice(3).map((file, index) => (
                  <img
                    key={index + 3}
                    onClick={()=>{
                      setInitialIndex(index + 3)
                    }}
                    src={file}
                    alt={`Attachment ${index + 4}`}
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
    )} 
    </>
   )
}
