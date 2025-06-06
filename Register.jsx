import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function tologin() {
    navigate("/tologinpage");
  }

  const handleRegister = (e) => {
    e.preventDefault();

    if (password[0] !== password[0].toUpperCase()) {
      setError('Password must start with a capital letter.');
      return;
    }

    if (password.length < 8) {
      setError('Password must contain at least 8 characters');
      return;
    }

    // Clear any previous error message
    setError('');

    // Save user info to localStorage
    localStorage.setItem('registeredUser', JSON.stringify({ username, password }));
    console.log('Registered User details');
    console.log('User Name:', username);
    console.log('User Password:', password);

    navigate('/login');
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
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
      <p style={{color:'black'}}> Show Password</p>
        <input
          type="checkbox"
          onChange={() => setShowPassword(!showPassword)}
        />
        
      </label>
      <p style={{ color: 'red' }}>{error}</p>
      <div className="button-group">
      <button type="submit">Register</button>
      <button type="button" onClick={tologin} className="secondary">Already a User</button>
      </div>

    </form>
  );
}