import React from 'react';
import './About.css';

function About() {
  const features = [
    {
      icon: '✓',
      title: 'Sản phẩm chính hãng',
      description: 'Tất cả sản phẩm đều được nhập khẩu chính thức từ các nhà sản xuất uy tín'
    },
    {
      icon: '🚚',
      title: 'Giao hàng nhanh',
      description: 'Giao hàng toàn quốc trong 1-3 ngày với phí vận chuyển cạnh tranh'
    },
    {
      icon: '💰',
      title: 'Giá tốt nhất',
      description: 'Cam kết mức giá cạnh tranh, có chương trình khuyến mãi thường xuyên'
    },
    {
      icon: '🛡️',
      title: 'Bảo hành đầy đủ',
      description: 'Bảo hành chính hãng, hỗ trợ bảo hành mở rộng cho tất cả sản phẩm'
    }
  ];

  const team = [
    {
      name: 'Nguyễn Văn A',
      role: 'Tổng Giám Đốc',
      image: '👔'
    },
    {
      name: 'Trần Thị B',
      role: 'Giám Đốc Bán Hàng',
      image: '💼'
    },
    {
      name: 'Lê Văn C',
      role: 'Trưởng Bộ Phận CSKH',
      image: '📞'
    },
    {
      name: 'Phạm Thị D',
      role: 'Quản Lý Kho',
      image: '📦'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Khách hàng' },
    { number: '10K+', label: 'Sản phẩm' },
    { number: '99%', label: 'Hài lòng' },
    { number: '24/7', label: 'Hỗ trợ' }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Chào mừng bạn đến với cửa hàng điện tử của chúng tôi</h1>
          <p>Nơi bạn tìm thấy những sản phẩm công nghệ chất lượng cao với giá tốt nhất thị trường</p>
        </div>
        <div className="hero-image">
          <div className="hero-emoji">🛍️</div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2>Về Chúng Tôi</h2>
            <p>
              Chúng tôi là một nhà bán lẻ điện tử hàng đầu, chuyên cung cấp các sản phẩm công nghệ chất lượng cao từ các thương hiệu ternó tiếng thế giới. Với hơn 10 năm kinh nghiệm trong lĩnh vực này, chúng tôi đã phục vụ hơn 50,000 khách hàng hài lòng trên toàn quốc.
            </p>
            <p>
              Sứ mệnh của chúng tôi là cung cấp các sản phẩm chính hãng, giá cạnh tranh, cùng với dịch vụ khách hàng tuyệt vời. Chúng tôi tin rằng công nghệ tốt không phải luôn đắt tiền, và mục tiêu của chúng tôi là làm cho các sản phẩm chất lượng cao có thể tiếp cận được cho mọi người.
            </p>
          </div>
          <div className="about-image">
            <div className="about-emoji">💻</div>
            <div className="emoji-decor">📱 ⌨️ 🖱️</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Tại sao chọn chúng tôi?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <h2>Thành tích của chúng tôi</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Đội ngũ của chúng tôi</h2>
        <p className="team-intro">Một đội ngũ tận tâm, chuyên nghiệp và luôn sẵn sàng phục vụ bạn</p>
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar">{member.image}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Giá trị cốt lõi</h2>
        <div className="values-grid">
          <div className="value-item">
            <div className="value-icon">⭐</div>
            <h3>Chất lượng</h3>
            <p>Sản phẩm chính hãng, được kiểm tra kỹ lưỡng trước khi giao tới tay khách hàng</p>
          </div>
          <div className="value-item">
            <div className="value-icon">🤝</div>
            <h3>Tin tưởng</h3>
            <p>Minh bạch trong giao dịch, cam kết vì quyền lợi của khách hàng</p>
          </div>
          <div className="value-item">
            <div className="value-icon">🚀</div>
            <h3>Đổi mới</h3>
            <p>Luôn cập nhật sản phẩm mới, công nghệ mới để đáp ứng nhu cầu khách hàng</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Sẵn sàng khám phá các sản phẩm tuyệt vời?</h2>
          <p>Hãy ghé thăm cửa hàng của chúng tôi và khám phá hàng ngàn sản phẩm chất lượng</p>
          <button className="cta-button">Bắt Đầu Mua Sắm Ngay</button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Liên Hệ Với Chúng Tôi</h2>
        <div className="contact-grid">
          <div className="contact-item">
            <div className="contact-icon">📍</div>
            <h3>Địa chỉ</h3>
            <p>123 Đường Nguyễn Huệ, TP. Hồ Chí Minh</p>
          </div>
          <div className="contact-item">
            <div className="contact-icon">📞</div>
            <h3>Điện thoại</h3>
            <p>1900 1234 (miễn phí)</p>
          </div>
          <div className="contact-item">
            <div className="contact-icon">📧</div>
            <h3>Email</h3>
            <p>support@ecommerce.vn</p>
          </div>
          <div className="contact-item">
            <div className="contact-icon">🕐</div>
            <h3>Giờ hoạt động</h3>
            <p>8:00 - 22:00 (Tất cả các ngày)</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;