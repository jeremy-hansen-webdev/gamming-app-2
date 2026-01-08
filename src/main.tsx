import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import App from './App';

const container = document.getElementById('root');

if (container) {
  const queryClient = new QueryClient();

  createRoot(container).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <div className="min-h-screen bg-zinc-800">
          <App />
        </div>
      </QueryClientProvider>
    </StrictMode>
  );
}
