import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(errorText || 'Login failed, check credentials!');
    }

    const data = await response.json();

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
