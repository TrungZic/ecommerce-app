#!/bin/bash
# 🎯 Script Khởi Động Toàn Bộ Hệ Thống

echo "╔═════════════════════════════════════════════════╗"
echo "║  🚀 KHỞI ĐỘNG HỆ THỐNG ECOMMERCE              ║"
echo "╚═════════════════════════════════════════════════╝"
echo ""

# Kiểm tra OS
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
    echo "🖥️  OS: Windows"
    echo ""
    echo "❌ Hãy chạy các lệnh này trong PowerShell:"
    echo ""
    echo "📌 Terminal 1 - MongoDB:"
    echo "   mongod"
    echo ""
    echo "📌 Terminal 2 - Backend:"
    echo "   cd backend"
    echo "   npm install"
    echo "   npm start"
    echo ""
    echo "📌 Terminal 3 - Frontend:"
    echo "   cd ecomerce-app"
    echo "   npm install"
    echo "   npm start"
    echo ""
    echo "📌 Sau đó truy cập: http://localhost:3000"
    exit 0
fi

# Cho Linux/Mac
echo "🖥️  Hệ thống phát hiện: $OSTYPE"
echo ""
echo "📌 Bạn đang sử dụng Linux/Mac"
echo ""
echo "Mở 3 Terminal riêng biệt:"
echo ""
echo "Terminal 1 - MongoDB:"
echo "  mongod"
echo ""
echo "Terminal 2 - Backend:"
echo "  cd backend && npm install && npm start"
echo ""
echo "Terminal 3 - Frontend:"
echo "  cd ecomerce-app && npm install && npm start"
echo ""
echo "Sau đó truy cập: http://localhost:3000"
