
'use client'
import { useState } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [error, setError] = useState('');

  const user = 'admin';
  const pass = 'admin123';

  const handleLogin = (e:any) => {
    e.preventDefault();
    if (username === user && password === pass) {
      setAutenticado(true);
    } else {
      setError('Usuario o contraseña incorrectos, intenta de nuevo');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Validar credenciales</button>
        </form>

        {autenticado && (
          <Link href="/presupuestomens">
            credenciales validas!! Click aquí para ingresar
          </Link>
        )}
      </div>
    </div>
  );
};


