async function testLogin() {
  const data = {
    username: 'test1',
    password: 'Test@12345'
  };

  console.log('🔍 Sending login request...');
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    console.log(`✓ Status: ${response.status}`);
    const result = await response.json();
    console.log('Response:', JSON.stringify(result, null, 2));

    if (result.token) {
      console.log('Token received (length):', result.token.length);
    }
  } catch (error) {
    console.error('✗ Error:', error.message);
  }
}

testLogin();
