import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed, check credentials!');
    }

    // Assuming the server sends a token back, you can store it using your Auth utility
    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  } catch (err) {
    console.error('Error during login:', err);
    return Promise.reject('Login failed, please try again.');
  }
}



export { login };
