export default function Section({ name, data }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">{name}</h2>
      <div
        id={`${name.toLowerCase()}-container`}
        className="flex overflow-x-auto"
      >
        {data.map((item, index) => (
          <div key={index} className="w-56 flex-shrink-0 mr-4">
            <img
              src={item.coverImage}
              alt={item.title.romaji}
              className="w-full h-80 object-cover rounded-lg"
            />
            <h3 className="text-lg font-medium text-white mt-2">
              {item.title.romaji}
            </h3>
          </div>
        ))}
      </div>
      <button
        className="mt-4"
        data-carousel-prev
        onClick={() =>
          (document.getElementById(
            `${name.toLowerCase()}-container`
          ).scrollLeft -= 1000)
        }
      >
        Prev
      </button>
      <button
        className="mt-4 ml-4"
        data-carousel-next
        onClick={() =>
          (document.getElementById(
            `${name.toLowerCase()}-container`
          ).scrollLeft += 1000)
        }
      >
        Next
      </button>
    </div>
  );
}
