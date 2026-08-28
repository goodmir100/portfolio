function Header({ onClickCart, onClickFavorites, onClickProfile, onClickLogo, cartCount }) {
  return (
    <header className="flex items-center justify-between bg-white rounded-2xl rounded-b-none shadow p-6 border-b border-gray-300">
      
      <div className="flex gap-2 cursor-pointer" onClick={onClickLogo}>
        <img src="/img/logo.jpg" alt="Logo" />
      
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-bold leading-5">
            REACT SNEAKERS
          </h2>
          <p className="text-sm text-gray-400 leading-4">
            Магазин лучших кроссовок
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        
        <button onClick={onClickCart} className="flex items-center gap-1 cursor-pointer">
          <img src="/img/cart.svg" alt="Cart" />
          <p className="text-gray-500">
            Корзина ({cartCount})
          </p>
        </button>

        <button onClick={onClickFavorites} className="flex items-center gap-1 cursor-pointer">
          <img src="/img/heart.svg" alt="favorite" />
          <p className="text-gray-500">Избранное</p>
        </button>

        <button onClick={onClickProfile} className="flex items-center gap-1 cursor-pointer">
          <img src="/img/profile.svg" alt="Profile" />
          <p className="text-gray-500">Профиль</p>
        </button>

      </div>
    </header>
  );
}

export default Header;