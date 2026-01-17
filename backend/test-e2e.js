(async function(){
  const unique = Date.now();
  const username = `e2e_user_${unique}`;
  const email = `e2e_${unique}@example.com`;
  const password = 'E2ePass123!';

  const registerBody = { username, email, password, confirmPassword: password, fullName: 'E2E Tester', phoneNumber: '0900000000', address: 'E2E Addr', city: 'E2E City' };

  console.log('E2E: Registering', username);
  try {
    const regRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(registerBody)
    });
    const regJson = await regRes.json();
    console.log('Register status', regRes.status);
    console.log('Register response', regJson);

    if (!regJson.success) {
      console.error('Register failed');
      process.exit(1);
    }

    console.log('E2E: Logging in');
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password })
    });
    const loginJson = await loginRes.json();
    console.log('Login status', loginRes.status);
    console.log('Login response', loginJson);

    if (loginJson.success && loginJson.token && loginJson.user) {
      console.log('E2E SUCCESS: token length', loginJson.token.length);
      console.log('Returned user fields:', Object.keys(loginJson.user));
      process.exit(0);
    } else {
      console.error('E2E FAILED: login did not return token/user');
      process.exit(2);
    }
  } catch (e) {
    console.error('E2E ERROR', e.message);
    process.exit(3);
  }
})();
