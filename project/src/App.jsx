import { useState } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import Drawer from "./components/Drawer";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState("home");
  const [orders, setOrders] = useState([]);

  const sneakers = [
    { id: 1, title: "Nike Blazer Mid Suede", price: 12999, image: "/img/7.png" },
    { id: 2, title: "Nike Air Max 270", price: 12999, image: "/img/11.png" },
    { id: 3, title: "Nike Blazer Mid Suede", price: 8499, image: "/img/8.png" },
    { id: 4, title: "Puma Future Rider", price: 8999, image: "/img/9.png" },
    { id: 5, title: "Under Armour Curry 8", price: 15199, image: "/img/1.png" },
    { id: 6, title: "Nike Kyrie 7", price: 11299, image: "/img/2.png" },
    { id: 7, title: "Air Jordan 11", price: 10179, image: "/img/4.png" },
    { id: 8, title: "Nike LeBron XVII", price: 16499, image: "/img/12.png" },
    { id: 9, title: "Nike LeBron XVII Low", price: 13999, image: "/img/6.png" },
    { id: 10, title: "Nike Blazer Mid Suede", price: 8499, image: "/img/10.png" },
    { id: 11, title: "Puma Future Rider", price: 8999, image: "/img/9.png" },
    { id: 12, title: "Nike Kyrie Flytrap IV", price: 11299, image: "/img/3.png" }
  ];

  const addToCart = (item) => {
  setCartItems((prev) => {
    const exists = prev.find((i) => i.id === item.id);
    if (exists) return prev;
    return [...prev, item];
  });
};

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addToFavorites = (item) => {
  setFavorites((prev) => {
    const exists = prev.find((i) => i.id === item.id);
    if (exists) return prev;
    return [...prev, item];
  });
};

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-[#E7F6FF] min-h-screen p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md">

        <Header
          onClickCart={() => setIsDrawerOpen(true)}
          onClickFavorites={() => setPage("favorites")}
          onClickProfile={() => setPage("profile")}
          onClickLogo={() => setPage("home")}
          cartCount={cartItems.length}
        />

        {isDrawerOpen && (
          <Drawer
            items={cartItems}
            setCartItems={setCartItems}
            onRemove={removeFromCart}
            onClose={() => setIsDrawerOpen(false)}
            onOrder={(items) => {
              const newOrder = {id: Date.now(), items,date: new Date().toLocaleString(),total: items.reduce((sum, item) => sum + item.price, 0)};
              setOrders((prev) => [...prev, newOrder]);
            }}
          />
        )}

        <div className="p-10">

          {page === "home" && (
            <>
              <div className="flex justify-between items-center mb-6">
  
              <h2 className="text-2xl font-bold">
                Все кроссовки
              </h2>

              <input
              value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Поиск..."
            className="border px-3 py-1 rounded-xl w-48 border-gray-400 focus:outline-none focus:border-[#a0dbff]" 
             />

              </div>

              <div className="grid grid-cols-4 gap-6" >
                {sneakers
                  .filter((item) =>
                  item.title.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((item) => (
                  <Card
                    key={item.id}
                    {...item}
                    onAdd={addToCart}
                    onFavorite={addToFavorites}
                    onRemoveFavorite={removeFromFavorites}
                  />
                ))}
              </div>
            </>
          )}

          {/* ❤️ ИЗБРАННОЕ */}
          {page === "favorites" && (
            <><div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Избранное </h2>
                <button className="bg-[#a0dbff] text-xl py-2 px-4 rounded-xl" onClick={() => setPage("home")}>Назад</button>
              </div>

              {favorites.length === 0 ? (
                <div className="h-140 flex flex-col items-center justify-center">
                  <img src="/img/sad-emoji.jpg" alt="" />
                  <p className="text-2xl">Нет избранных товаров :( </p>
                  <p className="text-gray-400">Вы ничего не добавили в избранное</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-6">
                {favorites.map((item) => (
                <div key={item.id} className="relative">
                <Card
                {...item}
                 onAdd={addToCart}
                 onFavorite={addToFavorites}
                 onRemoveFavorite={removeFromFavorites}
                />
                <button onClick={() => removeFromFavorites(item.id)}
                  className="h-5 w-5 absolute top-4 right-3">
                 <img src="img/cross.svg" alt="" />
                </button>
                </div>
                ))}
              </div>
              )}
            </>
          )}

          {page === "profile" && (
            <>
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Профиль M1R</h2>
                <button className="bg-[#a0dbff] text-xl py-2 px-4 rounded-xl" onClick={() => setPage("home")}>Назад</button>
              </div>

              {orders.length === 0 ? (
                 <div className="h-140 flex flex-col items-center justify-center">
                  <img className="h-20" src="/img/emoji-sad.jpg" alt="" />
                  <p className="text-2xl">У вас нет заказов </p>
                  <p className="text-gray-400">Вы еще не сделали ни одного заказа</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="mb-6 border border-gray-400 p-4 rounded-xl">
                    <p className="text-sm text-gray-400">
                      <img className="h-4" src="/img/calendar.svg" alt="" />{order.date}
                    </p>

                    <p className="mb-2 font-bold">
                       {order.total} тг.
                    </p>

                    <div className="grid grid-cols-3 gap-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="border border-gray-400 p-2 rounded-lg flex items-center gap-2"
                        >
                          <img src={item.image} className="w-12 h-12" />
                          <div>
                            <p className="text-xs">{item.title}</p>
                            <b className="text-xs">{item.price} тг.</b>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;