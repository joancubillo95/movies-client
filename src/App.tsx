import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from './components/LoginPage';
import { MoviesPage } from './components/MoviesPage';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/movies" /> : <LoginPage />}
      />
      <Route
        path="/movies"
        element={isAuthenticated ? <MoviesPage /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/movies" : "/login"} />} />

    </Routes>
  )
}

export default App
