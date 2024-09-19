const ImageCard = (props) => {
  const { dish } = props;
  return (
    <div
      key={dish.id}
      className="flex-none w-40 cursor-pointer hover:scale-[0.95] transition-[2s]"
    >
      {/* Debugging: Check if image path exists */}
      {dish.image ? (
        <img
          src={dish.image} // Use the dynamically imported image
          alt={dish.name}
          className="w-full h-32 object-cover rounded-md mb-2 "
        />
      ) : (
        <div className="w-full h-32 bg-gray-300 rounded-md mb-2">
          Image not found
        </div>
      )}
      <p className="text-lg font-semibold text-center ">{dish.name}</p>
    </div>
  );
};

export default ImageCard;
