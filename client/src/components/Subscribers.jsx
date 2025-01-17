
const peopleImages = [
    "/staff/photo_2025-01-16_02-19-20.jpg",
    "/staff/photo_2025-01-16_02-19-48.jpg",
    "/staff/photo_2025-01-16_02-19-52.jpg",
    "/staff/photo_2025-01-16_02-19-56.jpg",
]

function getRandomPeople(count) {
  return [...peopleImages]
    .sort(() => 0.5 - Math.random())
    .slice(0, count)
}

export default function Subscribers() {
    const randomPeople = getRandomPeople(4)

    return (
        <div className=" text-my-white py-4 px-1 rounded-lg flex items-center space-x-3 max-w-sm">
        <div className="flex -space-x-2 overflow-hidden">
            {randomPeople.map((src, i) => (
            <img
                key={i}
                src={src}
                alt={`Student ${i + 1}`}
                width={32}
                height={32}
                className="inline-block h-8 w-8 rounded-full ring-0  object-cover"
            />
            ))}
        </div>
        <span className="text-sm font-semibold">
            15,000+ <span className="font-medium text-my-white-gray opacity-70">like-minded dentists</span>
        </span>
        </div>
    )
}