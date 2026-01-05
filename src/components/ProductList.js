import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function ProductList({ products }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>Không tìm thấy sản phẩm nào</p>
      ) : (
        products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">{product.price.toLocaleString('vi-VN')} đ</p>
            <button onClick={() => addToCart(product)}>Thêm vào Giỏ</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;