import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setCart }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const tonav = () => navigate("/toregister");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });


      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        console.log('Logged in user:', data);

            // Fetch all existing users
            const usersRes = await fetch('https://dummyjson.com/users');
            const usersData = await usersRes.json();
            console.log('All existing users:', usersData.users);
    
            navigate('/dashboard');
    

        const savedCart = JSON.parse(localStorage.getItem(`cart_${data.username}`)) || [];
        setCart(savedCart);
        navigate('/dashboard');
      }
       else {
        const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
        if (storedUser?.username === username && storedUser?.password === password) {
          localStorage.setItem('user', JSON.stringify(storedUser));
          console.log('Registered user:', storedUser);

          // Fetch all existing users
          const usersRes = await fetch('https://dummyjson.com/users');
          const usersData = await usersRes.json();
          console.log('All existing users:', usersData.users);

          

          const savedCart = JSON.parse(localStorage.getItem(`cart_${storedUser.username}`)) || [];
          setCart(savedCart);
          navigate('/dashboard');
        } else {
          alert('Invalid login credentials.');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred during login.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label>
        <p style={{ color: 'black' }}>Show Password</p>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
      </label>
      <div className='button-group'>
        <button type="submit">Login</button>
        <button type="button" onClick={tonav}>New User</button>
      </div>
    </form>
  );
}
