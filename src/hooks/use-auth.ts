import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { auth, setAuthToken } from '../lib/api';
import { socketService } from '../lib/socket';

export function useAuth() {
  const navigate = useNavigate();
  const { user, setUser, setIsAuthenticated } = useAuthStore();

  const login = async (username: string, password: string) => {
    try {
      const { token, user } = await auth.login(username, password);
      setAuthToken(token);
      setUser(user);
      setIsAuthenticated(true);
      socketService.connect(token);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    auth.logout();
    setUser(null);
    setIsAuthenticated(false);
    socketService.disconnect();
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      setAuthToken(token);
      auth.getCurrentUser()
        .then((user) => {
          setUser(user);
          setIsAuthenticated(true);
          socketService.connect(token);
        })
        .catch(() => {
          logout();
        });
    }
  }, []);

  return { user, login, logout };
}