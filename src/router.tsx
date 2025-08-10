import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const Login = lazy(() => import('./components/Login'));
const MainContent = lazy(() => import('./components/MainContent'));
const ToDoApp = lazy(() => import('./components/To-Do-App/ToDoApp'));
const Shopping = lazy(() => import('./components/Shopping/Shopping'));
const Loading = () => <div>Loading...</div>;

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo/*" element={<MainContent/>}>
            <Route index element={<ToDoApp />} />
          </Route>
           <Route path="/shopping/*" element={<MainContent/>}>
            <Route index element={<Shopping />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
