async function test() {
  const data = {
    username: "test1",
    email: "test1@test.com",
    password: "Test@123",
    confirmPassword: "Test@123",
    fullName: "Test User 1",
    phoneNumber: "0901111111",
    address: "Test Address 1",
    city: "Test City 1"
  };

  console.log('📤 Gửi request...');
  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const json = await res.json();
    console.log(`📥 Status: ${res.status}`);
    console.log('📋 Response:', JSON.stringify(json, null, 2));
    
    if (json.user) {
      console.log('\n🔍 Kiểm tra user fields:');
      console.log(Object.keys(json.user));
    }
  } catch (e) {
    console.error('❌ Error:', e.message);
  }
}

test();
