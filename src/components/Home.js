import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ProductList from './ProductList';

function Home() {
  const allProducts = [
    // Danh mục: Laptop
    { id: 1, name: 'Laptop Dell XPS 13', description: 'Laptop nhẹ, hiệu năng cao', price: 25000000, category: 'Laptop', image: 'https://via.placeholder.com/200?text=Dell+XPS' },
    { id: 2, name: 'Laptop HP Pavilion', description: 'Laptop đa năng cho công việc', price: 15000000, category: 'Laptop', image: 'https://via.placeholder.com/200?text=HP+Pavilion' },
    { id: 3, name: 'Laptop ASUS VivoBook', description: 'Laptop mỏng nhẹ, pin lâu', price: 12000000, category: 'Laptop', image: 'https://via.placeholder.com/200?text=ASUS+VivoBook' },
    
    // Danh mục: Điện thoại
    { id: 4, name: 'iPhone 15 Pro', description: 'Smartphone cao cấp nhất', price: 30000000, category: 'Điện thoại', image: 'https://via.placeholder.com/200?text=iPhone+15' },
    { id: 5, name: 'Samsung Galaxy S24', description: 'Điện thoại flagship mới nhất', price: 22000000, category: 'Điện thoại', image: 'https://via.placeholder.com/200?text=Samsung+S24' },
    { id: 6, name: 'Xiaomi 14', description: 'Điện thoại tầm trung giá tốt', price: 12000000, category: 'Điện thoại', image: 'https://via.placeholder.com/200?text=Xiaomi+14' },
    
    // Danh mục: Tai nghe
    { id: 7, name: 'Sony WH-1000XM5', description: 'Tai nghe chống ồn tốt nhất', price: 8000000, category: 'Tai nghe', image: 'https://via.placeholder.com/200?text=Sony+WH' },
    { id: 8, name: 'Apple AirPods Pro', description: 'Tai nghe không dây chất lượng cao', price: 6000000, category: 'Tai nghe', image: 'https://via.placeholder.com/200?text=AirPods+Pro' },
    { id: 9, name: 'JBL Tune 770NC', description: 'Tai nghe giá rẻ, chất lượng tốt', price: 3500000, category: 'Tai nghe', image: 'https://via.placeholder.com/200?text=JBL+Tune' },
    
    // Danh mục: Chuột & Bàn phím
    { id: 10, name: 'Logitech MX Master 3S', description: 'Chuột không dây chuyên nghiệp', price: 2500000, category: 'Chuột & Bàn phím', image: 'https://via.placeholder.com/200?text=Logitech+MX' },
    { id: 11, name: 'Mechanical Keyboard RGB', description: 'Bàn phím cơ với đèn RGB', price: 2000000, category: 'Chuột & Bàn phím', image: 'https://via.placeholder.com/200?text=Mechanical+KB' },
    { id: 12, name: 'Razer DeathAdder V3', description: 'Chuột gaming tốc độ cao', price: 1800000, category: 'Chuột & Bàn phím', image: 'https://via.placeholder.com/200?text=Razer+DeathAdder' },
    
    // Danh mục: Phụ kiện
    { id: 13, name: 'Sạc nhanh 65W', description: 'Sạc nhanh cho mọi thiết bị', price: 500000, category: 'Phụ kiện', image: 'https://via.placeholder.com/200?text=Charger+65W' },
    { id: 14, name: 'Cáp USB-C dài 2m', description: 'Cáp chất lượng, bền bỉ', price: 200000, category: 'Phụ kiện', image: 'https://via.placeholder.com/200?text=USB-C+Cable' },
    { id: 15, name: 'Bao da laptop 15.6 inch', description: 'Bảo vệ laptop an toàn', price: 450000, category: 'Phụ kiện', image: 'https://via.placeholder.com/200?text=Laptop+Case' },
  ];

  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Laptop', 'Điện thoại', 'Tai nghe', 'Chuột & Bàn phím', 'Phụ kiện'];

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterProducts(selectedCategory, term);
  };

  const filterProducts = (category, search) => {
    let filtered = allProducts;

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    if (search !== '') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryClick = (category) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);
    filterProducts(newCategory, searchTerm);
  };

  // Lấy các danh mục có sản phẩm để hiển thị
  const getProductsByCategory = () => {
    const grouped = {};
    categories.forEach(cat => {
      grouped[cat] = allProducts.filter(p => p.category === cat);
    });
    return grouped;
  };

  const productsByCategory = getProductsByCategory();

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />

      {/* Banner quảng cáo */}
      <div className="banner">
        <h2>🎉 Chào mừng bạn đến với cửa hàng của chúng tôi</h2>
        <p>Sản phẩm chất lượng, giá tốt, giao hàng nhanh</p>
      </div>

      {/* Danh mục sản phẩm */}
      <div className="categories-section">
        <h3>Danh Mục Sản Phẩm</h3>
        <div className="categories-container">
          <button
            className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(null);
              setFilteredProducts(allProducts);
              setSearchTerm('');
            }}
          >
            Tất Cả Sản Phẩm
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Hiển thị danh mục hiện tại */}
      {selectedCategory && (
        <div className="current-category">
          <h3>Danh mục: {selectedCategory}</h3>
          <p>Hiển thị {filteredProducts.length} sản phẩm</p>
        </div>
      )}

      {/* Nếu chọn một danh mục cụ thể */}
      {selectedCategory ? (
        <>
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>Không tìm thấy sản phẩm nào phù hợp</p>
            </div>
          ) : (
            <ProductList products={filteredProducts} />
          )}
        </>
      ) : (
        // Hiển thị tất cả sản phẩm theo danh mục
        <>
          {categories.map(category => (
            <div key={category} className="category-section">
              <div className="category-header">
                <h2 className="category-title">{category}</h2>
              </div>
              <div className="category-divider"></div>
              
              {category === 'Laptop' && <span className="category-icon">💻</span>}
              {category === 'Điện thoại' && <span className="category-icon">📱</span>}
              {category === 'Tai nghe' && <span className="category-icon">🎧</span>}
              {category === 'Chuột & Bàn phím' && <span className="category-icon">⌨️</span>}
              {category === 'Phụ kiện' && <span className="category-icon">🔌</span>}

              <ProductList products={productsByCategory[category]} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Home;