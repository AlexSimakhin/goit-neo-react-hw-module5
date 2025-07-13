import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import Navigation from '@/components/Navigation';
import Loader from '@/components/Loader';

const HomePage = lazy(() => import('@/pages/HomePage'));
const MoviesPage = lazy(() => import('@/pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('@/pages/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const MovieCast = lazy(() => import('@/components/MovieCast'));
const MovieReviews = lazy(() => import('@/components/MovieReviews'));

const App = () => {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--background-color)',
            color: 'var(--text-color)',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(var(--text-color-rgb), 0.15)',
            border: '1px solid rgba(var(--text-color-rgb), 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: 'var(--background-color)',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: 'var(--background-color)',
            },
          },
        }}
      />
    </>
  );
};

export default App;
