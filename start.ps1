# 🎯 PowerShell Script - Hướng Dẫn Khởi Động
# Chạy: powershell -ExecutionPolicy Bypass -File start.ps1

Write-Host "╔═══════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  🚀 KHỞI ĐỘNG HỆ THỐNG E-COMMERCE              ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Host "⚠️  HÃNG CHÚ Ý: Bạn cần mở 3 PowerShell Terminal riêng biệt!" -ForegroundColor Yellow
Write-Host ""

Write-Host "📌 TERMINAL 1 - MongoDB" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "mongod" -ForegroundColor White
Write-Host "✓ Chờ: 'waiting for connections on port 27017'" -ForegroundColor Green
Write-Host ""

Write-Host "📌 TERMINAL 2 - Backend" -ForegroundColor Blue
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Blue
Write-Host "cd backend" -ForegroundColor White
Write-Host "npm install" -ForegroundColor White
Write-Host "npm start" -ForegroundColor White
Write-Host "✓ Chờ: 'MongoDB connected successfully' và 'Server running on port 5000'" -ForegroundColor Blue
Write-Host ""

Write-Host "📌 TERMINAL 3 - Frontend" -ForegroundColor Magenta
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host "cd ecomerce-app" -ForegroundColor White
Write-Host "npm install" -ForegroundColor White
Write-Host "npm start" -ForegroundColor White
Write-Host "✓ App sẽ tự động mở ở http://localhost:3000" -ForegroundColor Magenta
Write-Host ""

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ HOÀN THÀNH SETUP" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Truy cập: http://localhost:3000/register" -ForegroundColor Yellow
Write-Host "2️⃣  Điền form đăng ký" -ForegroundColor Yellow
Write-Host "3️⃣  Nhấn 'Đăng Ký'" -ForegroundColor Yellow
Write-Host "4️⃣  Nếu lỗi, nhấn F12 → Console → copy lỗi cho tôi" -ForegroundColor Yellow
Write-Host ""

Read-Host "Nhấn Enter để đóng cửa sổ"
