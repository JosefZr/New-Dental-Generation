export default function Journey({ user }) {
  console.log(user);

  return (
    <div
      style={{ position: "relative" }}
      className="h-[370px] custom-scroll overflow-y-auto p-[24px] swipe-dialog-scroll-descendant"
    >
      {user.journey && user.journey.length > 0 ? (
        user.journey.map((info, index) => (
          <div key={index} className="mb-2">
            {/* Header */}
            <div className="z-10 mt-2 flex h-[44px] items-center justify-between truncate rounded-t-md border border-slate-700 border-b-0 bg-base-200 px-2 text-sm first:mt-0 md:text-md">
              <span className="cursor-pointer font-medium hover:underline">
                10/28/2024
              </span>
              <div className="flex items-center">
                <div className="text-teal-500 hover:underline active">
                  <span>{info.chanTitle}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex items-center justify-center rounded-b-md border border-slate-700 border-t-0 py-2">
              <div className="chat-message group relative flex w-full focus:border-primary focus:ring lg:pr-4 px-10">
                <section className="mb-[2px] inline-block w-full rounded-md border bg-bubble-gradient px-2 py-[4px] border-transparent">
                  <span className="custom-break-words break-words text-sm">
                    <div className="markdown break-words false">
                      <p className="m-0  whitespace-pre-wrap">{info.content}</p>
                    </div>
                  </span>

                  {/* Image Gallery */}
                  {info.images && info.images.length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {info.images.map((image, imgIndex) => (
                        <button
                          key={imgIndex}
                          className="relative overflow-hidden rounded-md filter-none transition-[filter]"
                          style={{
                            width: "199px",
                            height: "200px",
                            backgroundImage: `url(${image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></button>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center p-3">
          <img src="/jouney.jpg" alt="Journey" className="h-[128px] w-[128px] rounded-full" />
          <div className="mt-2 text-center text-sm">Their journey is just beginning...</div>
        </div>
      )}
    </div>
  );
}
