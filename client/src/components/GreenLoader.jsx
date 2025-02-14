
export default function GreenLoader({big,left}) {
    return (
        <div className={`flex  ${left?"items-start justify-start":"items-center justify-center"} w-full h-full`}>
          <div className={`animate-spin rounded-full border-t-4 border-[#13F287] ${big?"h-12 w-12":"w-6 h-6"} `} />
        </div>
      );
}
