import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ProductList from './ProductList';
import './Home.css';

function Home() {
  const allProducts = [
    // Danh mục: Laptop
    { id: 1, name: 'Laptop Dell XPS 13', description: 'Laptop nhẹ, hiệu năng cao', price: 25000000, category: 'Laptop', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT6BBKx4P73Jwt6AF75pdqwd2WIl6IoV6ec3uD-zegbvU3A4Mym-colq-XO-jxu9fW_EpSCChYVAGRYk5xnaR6pKwimcYJO5R9AFunwrnr0heunEgWit4x_oRwOhObERn6u8GpOH1zYFw&usqp=CAc' },
    { id: 2, name: 'Laptop HP Pavilion', description: 'Laptop đa năng cho công việc', price: 15000000, category: 'Laptop', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSJ3I4rq_QjTP0JAwkcr_8CwSqTvPyGy7Zmc7PU9YEgR8_Ax-n2DIuy1iJD1pDVIuyyilKgfnNX1uiy4y0yOUSLLBx8Z9aHYUBYjVogDTywVYfnB_ivC_tFzqg4d81TkDWCXXakAR-WsmQ&usqp=CAc' },
    { id: 3, name: 'Laptop ASUS VivoBook', description: 'Laptop mỏng nhẹ, pin lâu', price: 12000000, category: 'Laptop', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ9dqFb5K9URcABbTIohyfeJvD0c8yg4FS9hNVvaQPj58lAqAN7oCLlmT4zzNnRCjFz7nIBQfIQtC3qBVkbjuIGBe7yS9xPjp0fjfCxT_Ty76I_dWlATNA1UvFSNP6r9fwnjZlt5qAPjQ&1=CAc' },
    { id: 16, name: 'Surface Laptop 7', description: 'Laptop mỏng nhẹ, pin lâu', price: 22000000, category: 'Laptop', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRASZVVhFgMqqYGEcZFf4L_TazMoRpDBXlGZBNNH4Caxxndwn9kuNgJ5JaX9hA7chay5GcH9GU4Cn1-oJPC5ENHu6TxFU3ynpDmmlYhedxx1NiUFFyveAGMagkhbCQ8J2a8LTZOyKnOHG4&usqp=CAc' },
    { id: 17, name: 'MacBook Pro 16"', description: 'Laptop chuyên nghiệp cho creator', price: 45000000, category: 'Laptop', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT6BBKx4P73Jwt6AF75pdqwd2WIl6IoV6ec3uD-zegbvU3A4Mym-colq-XO-jxu9fW_EpSCChYVAGRYk5xnaR6pKwimcYJO5R9AFunwrnr0heunEgWit4x_oRwOhObERn6u8GpOH1zYFw&usqp=CAc' },
    { id: 18, name: 'Lenovo ThinkPad', description: 'Laptop mạnh mẽ cho doanh nhân', price: 18000000, category: 'Laptop', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSJ3I4rq_QjTP0JAwkcr_8CwSqTvPyGy7Zmc7PU9YEgR8_Ax-n2DIuy1iJD1pDVIuyyilKgfnNX1uiy4y0yOUSLLBx8Z9aHYUBYjVogDTywVYfnB_ivC_tFzqg4d81TkDWCXXakAR-WsmQ&usqp=CAc' },
    { id: 19, name: 'ASUS ROG Gaming', description: 'Laptop gaming cao cấp', price: 35000000, category: 'Laptop', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ9dqFb5K9URcABbTIohyfeJvD0c8yg4FS9hNVvaQPj58lAqAN7oCLlmT4zzNnRCjFz7nIBQfIQtC3qBVkbjuIGBe7yS9xPjp0fjfCxT_Ty76I_dWlATNA1UvFSNP6r9fwnjZlt5qAPjQ&1=CAc' },
    
    // Danh mục: Điện thoại
    { id: 4, name: 'iPhone 15 Pro', description: 'Smartphone cao cấp nhất', price: 30000000, category: 'Điện thoại', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQpIxu22KacdR8EFViPF4Gwgp_yfHVUpUL6GsCNrv7q9vWk7iCvHRYQppD7-pSSxb-lhtucomjKrrr6dlwetxmaV2S8miRRQxkjerGzyN7GjYu8tPB9kPf5FkUG4wlFFjvA4OF1EIo&usqp=CAc' },
    { id: 5, name: 'Samsung Galaxy S24', description: 'Điện thoại flagship mới nhất', price: 22000000, category: 'Điện thoại', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS9xP6vBT13okYs3IEuLIVgV6sh46o4tlsTTebPXh1f9RTrkG6oDIBD3Tm9JRgJIcjlAge7xcPs3PsvpFSmnAMdh7fyElVsg-ssC3DObJLc0sIcntSmGnJwsxHuWhp_GLHEsNJ1Eg719A&usqp=CAc' },
    { id: 6, name: 'Xiaomi 14', description: 'Điện thoại tầm trung giá tốt', price: 12000000, category: 'Điện thoại', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTPAR8iDUXMiy9ICiDhGLDT2KAQnxkfBSR_4DdAeTs_jaCBBYQMIDlLgy2OHD2Ars27l7q3lN0N4w5QHOYZlEvsfnosLa751MPNaQTzbYOmBal-b5jU11oAe4xcPcYJGh0Hds-_1Pk&usqp=CAc' },
    { id: 20, name: 'Google Pixel 8', description: 'Điện thoại camera tốt nhất', price: 20000000, category: 'Điện thoại', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQpIxu22KacdR8EFViPF4Gwgp_yfHVUpUL6GsCNrv7q9vWk7iCvHRYQppD7-pSSxb-lhtucomjKrrr6dlwetxmaV2S8miRRQxkjerGzyN7GjYu8tPB9kPf5FkUG4wlFFjvA4OF1EIo&usqp=CAc' },
    { id: 21, name: 'OnePlus 12', description: 'Điện thoại nhanh, pin lâu', price: 16000000, category: 'Điện thoại', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS9xP6vBT13okYs3IEuLIVgV6sh46o4tlsTTebPXh1f9RTrkG6oDIBD3Tm9JRgJIcjlAge7xcPs3PsvpFSmnAMdh7fyElVsg-ssC3DObJLc0sIcntSmGnJwsxHuWhp_GLHEsNJ1Eg719A&usqp=CAc' },
    { id: 22, name: 'Samsung A54', description: 'Điện thoại tầm trung tốt', price: 10000000, category: 'Điện thoại', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTPAR8iDUXMiy9ICiDhGLDT2KAQnxkfBSR_4DdAeTs_jaCBBYQMIDlLgy2OHD2Ars27l7q3lN0N4w5QHOYZlEvsfnosLa751MPNaQTzbYOmBal-b5jU11oAe4xcPcYJGh0Hds-_1Pk&usqp=CAc' },
    
    // Danh mục: Tai nghe
    { id: 7, name: 'Sony WH-1000XM5', description: 'Tai nghe chống ồn tốt nhất', price: 8000000, category: 'Tai nghe', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSy5YbWzVqiaayo6s4HoR5n2Biyu4_Cxna7QCLw8CwBx-eA-1gRsZN913HyAgV9rPX055c8u-DY69t7EtShMWVDUBYRcr_VbzVu2KFeX3Pxs8xtFd7nACAkBA4SaWf92gB99Kr1QHYYww&usqp=CAc' },
    { id: 8, name: 'Apple AirPods Pro', description: 'Tai nghe không dây chất lượng cao', price: 6000000, category: 'Tai nghe', image: 'https://24hstore.vn/images/products/2024/10/17/large/airpods-pro-2-2023.jpg' },
    { id: 9, name: 'JBL Tune 770NC', description: 'Tai nghe giá rẻ, chất lượng tốt', price: 3500000, category: 'Tai nghe', image: 'https://hdradio.com.vn/upload/hinhanh/tai-nghe/JBL/Tune-770NC/JBL-Tune-770NC-23.jpg' },
    { id: 23, name: 'Bose QuietComfort', description: 'Tai nghe chống ồn chuyên nghiệp', price: 9500000, category: 'Tai nghe', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSy5YbWzVqiaayo6s4HoR5n2Biyu4_Cxna7QCLw8CwBx-eA-1gRsZN913HyAgV9rPX055c8u-DY69t7EtShMWVDUBYRcr_VbzVu2KFeX3Pxs8xtFd7nACAkBA4SaWf92gB99Kr1QHYYww&usqp=CAc' },
    { id: 24, name: 'Sennheiser Momentum', description: 'Tai nghe âm thanh audiophile', price: 7500000, category: 'Tai nghe', image: 'https://24hstore.vn/images/products/2024/10/17/large/airpods-pro-2-2023.jpg' },
    { id: 25, name: 'Beats Studio Pro', description: 'Tai nghe studio chuyên dụng', price: 8500000, category: 'Tai nghe', image: 'https://hdradio.com.vn/upload/hinhanh/tai-nghe/JBL/Tune-770NC/JBL-Tune-770NC-23.jpg' },
    
    // Danh mục: Chuột & Bàn phím
    { id: 10, name: 'Logitech MX Master 3S', description: 'Chuột không dây chuyên nghiệp', price: 2500000, category: 'Chuột & Bàn phím', image: 'https://bizweb.dktcdn.net/thumb/grande/100/082/878/products/54216-chuot-choi-game-khong-day-logitech-g502-lightspeed-usb-rgb-den-0000-1-1.jpg?v=1634090729933' },
    { id: 11, name: 'Mechanical Keyboard RGB', description: 'Bàn phím cơ với đèn RGB', price: 2000000, category: 'Chuột & Bàn phím', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQs_hlI_-XSJTM29Vq82u193MrUNhJh8oRvKcMlD0F9cInYk7t4tqZSvRm6NRDMHwAszHbZpybnhnXbGakhVghcL6SW8pnURKC90xQyQvoaoHpq3Bx5UDlCeCFJBPlz57KgFZP9IFUslQ&usqp=CAc' },
    { id: 12, name: 'Razer DeathAdder V3', description: 'Chuột gaming tốc độ cao', price: 1800000, category: 'Chuột & Bàn phím', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRaUPzZ07VFP0ZwST_eBw7Iwe_RA7IglgQ84NDLhFsUb4o5ZOrOZiYhxVDni1lRe65KYSqvih2UigjJi_bAlrzBFqT_7lpwEuvLquyeMWCeZDxZyDVAPeS3aLr2ADvwcL9dI2WqIxS4xw&usqp=CAc' },
    { id: 26, name: 'Corsair K95 Platinum', description: 'Bàn phím gaming cao cấp', price: 3500000, category: 'Chuột & Bàn phím', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQs_hlI_-XSJTM29Vq82u193MrUNhJh8oRvKcMlD0F9cInYk7t4tqZSvRm6NRDMHwAszHbZpybnhnXbGakhVghcL6SW8pnURKC90xQyQvoaoHpq3Bx5UDlCeCFJBPlz57KgFZP9IFUslQ&usqp=CAc' },
    { id: 27, name: 'SteelSeries Rival 600', description: 'Chuột gaming đo cân bằng', price: 2200000, category: 'Chuột & Bàn phím', image: 'https://bizweb.dktcdn.net/thumb/grande/100/082/878/products/54216-chuot-choi-game-khong-day-logitech-g502-lightspeed-usb-rgb-den-0000-1-1.jpg?v=1634090729933' },
    { id: 28, name: 'HyperX Alloy Elite', description: 'Bàn phím gaming bền bỉ', price: 2300000, category: 'Chuột & Bàn phím', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRaUPzZ07VFP0ZwST_eBw7Iwe_RA7IglgQ84NDLhFsUb4o5ZOrOZiYhxVDni1lRe65KYSqvih2UigjJi_bAlrzBFqT_7lpwEuvLquyeMWCeZDxZyDVAPeS3aLr2ADvwcL9dI2WqIxS4xw&usqp=CAc' },
    
    // Danh mục: Phụ kiện
    { id: 13, name: 'Sạc nhanh 65W', description: 'Sạc nhanh cho mọi thiết bị', price: 500000, category: 'Phụ kiện', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTKBPTWlApRMFCxvZEZlEy9OQFqVJPLXVKmYbT7bMyhDNRAfRFgGp75-29CjQXZjFieqe7YK_1HZ4CHId1A9T7UkepAPh7bl9sQmT0txwTzQlLn578AIfXS4KN0qA-OWGTU&usqp=CAc' },
    { id: 14, name: 'Cáp USB-C dài 2m', description: 'Cáp chất lượng, bền bỉ', price: 200000, category: 'Phụ kiện', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSfBUFzCZYg24MTP5qXPqYKoG4dxVyJRFBajxz8Bjhpx-0QYinvLJIDuLBCX5PVkRXlAUelnzveDI1vK3_Mc1FqPFg9paxPafnt0lDq7yXby_B4ErsNk89BI-5dR58fAkozMHtUVA&usqp=CAc' },
    { id: 15, name: 'Bao da laptop 15.6 inch', description: 'Bảo vệ laptop an toàn', price: 450000, category: 'Phụ kiện', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR1zXjFmLk7YBKuNVdWF_H4JTOJE-k622xhHpuC4cQNG1kGKc_QrhAMJhykRt_l0cvOLI4DJcewkK0NLbhkvvGNNqCPF7j7qAJ4mUHcUVknH3qGNd_-fUtOlOO_XN0d-9UBoA8tZQ&usqp=CAc' },
    { id: 29, name: 'Sạc dự phòng 20000mAh', description: 'Pin dự phòng công suất cao', price: 800000, category: 'Phụ kiện', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTKBPTWlApRMFCxvZEZlEy9OQFqVJPLXVKmYbT7bMyhDNRAfRFgGp75-29CjQXZjFieqe7YK_1HZ4CHId1A9T7UkepAPh7bl9sQmT0txwTzQlLn578AIfXS4KN0qA-OWGTU&usqp=CAc' },
    { id: 30, name: 'Dây cáp HDMI 4K', description: 'Cáp hỗ trợ 4K 60Hz', price: 350000, category: 'Phụ kiện', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSfBUFzCZYg24MTP5qXPqYKoG4dxVyJRFBajxz8Bjhpx-0QYinvLJIDuLBCX5PVkRXlAUelnzveDI1vK3_Mc1FqPFg9paxPafnt0lDq7yXby_B4ErsNk89BI-5dR58fAkozMHtUVA&usqp=CAc' },
    { id: 31, name: 'Chuối cáp tổ chức', description: 'Tổ chức dây cáp gọn gàng', price: 120000, category: 'Phụ kiện', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR1zXjFmLk7YBKuNVdWF_H4JTOJE-k622xhHpuC4cQNG1kGKc_QrhAMJhykRt_l0cvOLI4DJcewkK0NLbhkvvGNNqCPF7j7qAJ4mUHcUVknH3qGNd_-fUtOlOO_XN0d-9UBoA8tZQ&usqp=CAc' },
  ];

  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = ['Laptop', 'Điện thoại', 'Tai nghe', 'Chuột & Bàn phím', 'Phụ kiện'];

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
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
    setCurrentPage(1);
    setSearchTerm('');
    filterProducts(newCategory, '');
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

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
        <div className="banner-content">
          <h2>🎉 Chào mừng bạn đến với cửa hàng của chúng tôi</h2>
          <p>Sản phẩm chất lượng, giá tốt, giao hàng nhanh</p>
        </div>
      </div>

      {/* Danh mục sản phẩm */}
      <div className="categories-section">
        <div className="section-container">
          <h3>Danh Mục Sản Phẩm</h3>
          <div className="categories-container">
            <button
              className={`category-btn ${selectedCategory === null && searchTerm === '' ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(null);
                setFilteredProducts(allProducts);
                setSearchTerm('');
                setCurrentPage(1);
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
      </div>

      {/* Hiển thị danh mục hiện tại */}
      {selectedCategory && (
        <div className="current-category">
          <div className="section-container">
            <h3>📂 Danh mục: {selectedCategory}</h3>
            <p>Hiển thị {filteredProducts.length} sản phẩm</p>
          </div>
        </div>
      )}

      {/* Nếu chọn một danh mục cụ thể */}
      {selectedCategory ? (
        <div className="section-container">
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>Không tìm thấy sản phẩm nào phù hợp</p>
            </div>
          ) : (
            <>
              <ProductList products={currentProducts} />
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    ← Trước
                  </button>
                  
                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    Sau →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="section-container">
          {/* Hiển thị tất cả sản phẩm theo danh mục */}
          {searchTerm !== '' ? (
            <>
              <div className="search-results-header">
                <h3>🔍 Kết quả tìm kiếm: {filteredProducts.length} sản phẩm</h3>
              </div>
              {filteredProducts.length === 0 ? (
                <div className="no-products">
                  <p>Không tìm thấy sản phẩm nào</p>
                </div>
              ) : (
                <>
                  <ProductList products={currentProducts} />
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="pagination">
                      <button 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                      >
                        ← Trước
                      </button>
                      
                      <div className="pagination-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      
                      <button 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                      >
                        Sau →
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            categories.map(category => (
              <div key={category} className="category-section">
                <div className="category-header">
                  <h2 className="category-title">{category}</h2>
                  <span className="category-count">({productsByCategory[category].length} sản phẩm)</span>
                </div>
                <div className="category-divider"></div>
                
                {category === 'Laptop' && <span className="category-icon">💻</span>}
                {category === 'Điện thoại' && <span className="category-icon">📱</span>}
                {category === 'Tai nghe' && <span className="category-icon">🎧</span>}
                {category === 'Chuột & Bàn phím' && <span className="category-icon">⌨️</span>}
                {category === 'Phụ kiện' && <span className="category-icon">🔌</span>}

                <ProductList products={productsByCategory[category].slice(0, 4)} />
                
                {productsByCategory[category].length > 4 && (
                  <div className="view-more">
                    <button 
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className="view-more-btn"
                    >
                      Xem thêm ({productsByCategory[category].length - 4} sản phẩm) →
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home;