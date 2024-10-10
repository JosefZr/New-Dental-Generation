
const peopleImages = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=6",
  "https://i.pravatar.cc/150?img=7",
  "https://i.pravatar.cc/150?img=8",
]

function getRandomPeople(count) {
  return [...peopleImages]
    .sort(() => 0.5 - Math.random())
    .slice(0, count)
}

export default function Subscribers() {
    const randomPeople = getRandomPeople(4)

    return (
        <div className=" text-black py-4 px-1 rounded-lg flex items-center space-x-3 max-w-sm">
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
            15,000+ <span className="font-medium text-slate-900">like-minded students</span>
        </span>
        </div>
    )
}