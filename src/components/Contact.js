import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const contactChannels = [
    {
      icon: '📞',
      title: 'Gọi điện',
      value: '0886826911',
      description: 'Gọi miễn phí 24/7'
    },
    {
      icon: '📧',
      title: 'Email',
      value: 'trungboydh2k4@gmail.com',
      description: 'Phản hồi trong 2 giờ'
    },
    {
      icon: '💬',
      title: 'Chat',
      value: 'Livechat 24/7',
      description: 'Hỗ trợ trực tiếp'
    },
    {
      icon: '📍',
      title: 'Địa chỉ',
      value: 'Hà Nội, Việt Nam',
      description: 'Mở cửa: 8:00 - 22:00'
    }
  ];

  const faqItems = [
    {
      question: 'Thời gian xử lý đơn hàng là bao lâu?',
      answer: 'Chúng tôi xử lý đơn hàng trong vòng 1-2 giờ sau khi nhận thanh toán.'
    },
    {
      question: 'Bạn giao hàng đến đâu?',
      answer: 'Chúng tôi giao hàng toàn quốc, miễn phí cho đơn hàng trên 500,000 đ.'
    },
    {
      question: 'Sản phẩm có bảo hành không?',
      answer: 'Tất cả sản phẩm đều có bảo hành chính hãng từ 12-36 tháng.'
    },
    {
      question: 'Nếu tôi không hài lòng thì sao?',
      answer: 'Bạn có thể hoàn trả sản phẩm trong 7 ngày, không cần lý do.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Liên Hệ Với Chúng Tôi</h1>
          <p>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7</p>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="contact-channels">
        <div className="container">
          <h2>Cách liên hệ với chúng tôi</h2>
          <div className="channels-grid">
            {contactChannels.map((channel, index) => (
              <div key={index} className="channel-card">
                <div className="channel-icon">{channel.icon}</div>
                <h3>{channel.title}</h3>
                <p className="channel-value">{channel.value}</p>
                <p className="channel-desc">{channel.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-wrapper">
            {/* Form */}
            <div className="contact-form-section">
              <h2>Gửi tin nhắn cho chúng tôi</h2>
              <p className="form-intro">Hãy điền biểu mẫu dưới đây và chúng tôi sẽ liên hệ với bạn sớm nhất có thể</p>
              
              {submitted && (
                <div className="success-message">
                  ✓ Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong 2 giờ.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Họ và Tên *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Nhập tên của bạn"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Điện thoại *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="0123456789"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Chủ đề *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Chủ đề liên hệ"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Tin nhắn *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">Gửi Tin Nhắn</button>
              </form>
            </div>

            {/* Info Section */}
            <div className="contact-info-section">
              <div className="info-card">
                <h3>Giờ hoạt động</h3>
                <div className="info-content">
                  <div className="info-row">
                    <span>Thứ Hai - Thứ Sáu:</span>
                    <strong>8:00 - 22:00</strong>
                  </div>
                  <div className="info-row">
                    <span>Thứ Bảy:</span>
                    <strong>9:00 - 21:00</strong>
                  </div>
                  <div className="info-row">
                    <span>Chủ Nhật:</span>
                    <strong>10:00 - 20:00</strong>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>Thông tin công ty</h3>
                <div className="info-content">
                  <p><strong>Tên:</strong> E-Commerce Store Vietnam</p>
                  <p><strong>Địa chỉ:</strong> 123 Đường Nguyễn Huệ, TP. Hồ Chí Minh</p>
                  <p><strong>Điện thoại:</strong> 0886826911</p>
                  <p><strong>Email:</strong> trungboydh2k4@gmail.com</p>
                  <p><strong>MST:</strong> 0123456789</p>
                </div>
              </div>

              <div className="info-card">
                <h3>Theo dõi chúng tôi</h3>
                <div className="social-links">
                  <a href="https://www.facebook.com/trung.van.850712?locale=vi_VN" className="social-icon">f</a>
                  <a href="#" className="social-icon">𝕏</a>
                  <a href="#" className="social-icon">📸</a>
                  <a href="#" className="social-icon">▶️</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Câu hỏi thường gặp</h2>
          <div className="faq-grid">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <h2>Tìm chúng tôi trên bản đồ</h2>
        <div className="map-container">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8662295254265!2d105.84101!3d21.028511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac6e3f6b6b6b%3A0x1234567890!2s123%20Nguyen%20Hue%2C%20Ho%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '10px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default Contact;