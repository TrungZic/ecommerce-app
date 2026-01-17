async function testRegister() {
  const data = {
    username: "debugtest123",
    email: "debugtest123@test.com",
    password: "Test@12345",
    confirmPassword: "Test@12345",
    fullName: "Debug Test User",
    phoneNumber: "0901234567",
    address: "Debug Address",
    city: "Debug City"
  };

  console.log('🔍 Sending registration request...');
  console.log('Request body:', JSON.stringify(data, null, 2));
  console.log('---');

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    console.log(`✓ Status: ${response.status}`);
    const result = await response.json();
    console.log('Response:', JSON.stringify(result, null, 2));
    
    console.log('---');
    if (result.user) {
      console.log('User fields returned:');
      Object.keys(result.user).forEach(key => {
        console.log(`  - ${key}: ${result.user[key]}`);
      });
    }
  } catch (error) {
    console.error('✗ Error:', error.message);
  }
}

testRegister();
