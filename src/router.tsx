import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const Login = lazy(() => import('./components/Login'));
const MainContent = lazy(() => import('./components/MainContent'));
const ToDoApp = lazy(() => import('./components/To-Do-App/ToDoApp'));
const Shopping = lazy(() => import('./components/Shopping/Shopping'));
const Weather = lazy(() => import('./components/Weather/Weather'));
const Recipes = lazy(() => import('./components/Recipes/Recipes'));
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
           <Route path="/weather/*" element={<MainContent/>}>
            <Route index element={<Weather />} />
          </Route>
           <Route path="/recipes/*" element={<MainContent/>}>
            <Route index element={<Recipes />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
