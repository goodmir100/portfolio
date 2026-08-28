import { useState } from "react";

function Card({ id, title, price, image, onAdd, onFavorite, onRemoveFavorite }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-400 hover:shadow-md transition relative">
    
      <button
        onClick={() => {
          if (isFavorite) {
            onRemoveFavorite(id);
          } else {
            onFavorite({ id, title, price, image });
          }
          setIsFavorite(!isFavorite);
        }}
        className="absolute top-4 left-4"
      >
        <img
          src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
          className="w-6 h-6"
          alt="fav"
        />
      </button>

      <img src={image} className="w-full h-60 object-contain mb-4" />

      <h5 className="text-sm mb-2">{title}</h5>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-400">Цена:</p>
          <b>{price} тг.</b>
        </div>

       
        <button
          onClick={() => {
            if (!isAdded) {
              onAdd({ id, title, price, image });
            }
            setIsAdded(!isAdded);
          }}
          className="w-8 h-8 border border-gray-400 rounded-lg flex items-center justify-center"
        >
          <img
            src={isAdded ? "/img/checked.svg" : "/img/plus.svg"}
            className="w-4 h-4"
            alt="add"
          />
        </button>
      </div>
    </div>
  );
}

export default Card;