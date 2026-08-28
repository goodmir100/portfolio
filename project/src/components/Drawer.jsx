import { useState } from "react";

function Drawer({ items, onClose, setCartItems, onRemove, onOrder }) {
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const totalPrice = (items || []).reduce(
    (sum, item) => sum + item.price,
    0
  );

  const onClickOrder = () => {
    onOrder(items);
    setIsOrderComplete(true);
    setCartItems([]);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-end z-50">
      <div className="bg-white w-96 h-full p-6 flex flex-col">

        <h2 className="text-xl mb-4 flex justify-between">
          Корзина
          <button onClick={onClose}>
            <img className="w-6 h-6" src="img/cross.svg" alt="" />
          </button>
        </h2>

        {items.length > 0 ? (
          <>
            <div className="flex-1 overflow-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border border-gray-200 rounded-xl p-3 mb-3 gap-3"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="w-16 h-16 object-contain"
                  />

                  <div className="flex-1">
                    <p className="text-sm">{item.title}</p>
                    <b>{item.price} тг.</b>
                  </div>

                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-gray-400 hover:text-black w-5 h-5">
                    <img className="w-6 h-6" src="img/cross.svg" alt="" />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <p className="mb-4">Итого: {totalPrice} тг.</p>

              <button
                onClick={onClickOrder}
                className="w-full bg-green-500 text-white p-3 rounded-xl"
              >
                Оформить заказ
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            {isOrderComplete ? (
              <>
                <img src="img/confirm.jpg" alt="" />
                <h3 className="text-2xl font-bold text-green-500">
                  Заказ оформлен!
                </h3>
                <p className="text-gray-400">
                  Скоро с вами свяжутся
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 bg-green-500 text-white py-3 px-6 rounded-xl"
                >
                  Вернуться назад
                </button>
              </>
            ) : (
              <>
                <img src="/img/cart-empty.jpg" alt="" />
                <h3 className="text-xl font-bold">
                  Корзина пустая
                </h3>
                <p className="text-gray-400">
                  Добавьте товар
                </p>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Drawer;