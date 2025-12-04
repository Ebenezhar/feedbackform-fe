// src/App.tsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { store } from './store/store'
import './App.css'
import { FeedbackList } from './Pages/Feedback'
import FeedbackForm from './Pages/FeedbackForm'

// Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="app">
            {/* <nav style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
              <a href="/" style={{ marginRight: '15px' }}>View Feedback</a>
              <a href="/feedback-form">Submit Feedback</a>
            </nav> */}
            
            <Routes>
              <Route path="/" element={<FeedbackList />} />
              <Route path="/feedback-form" element={<FeedbackForm />} />
            </Routes>
          </div>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  )
}

export default App