import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const Login = lazy(() => import("./components/Login"));
const MainContent = lazy(() => import("./components/MainContent"));
const ToDoApp = lazy(() => import("./components/To-Do-App/ToDoApp"));
const Shopping = lazy(() => import("./components/Shopping/Shopping"));
const Weather = lazy(() => import("./components/Weather/Weather"));
const Recipes = lazy(() => import("./components/Recipes/Recipes"));

const Loading = () => <div>Loading...</div>;

export default function AppRouter() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Login />} />

                        <Route
                            path="/todo/*"
                            element={
                                <ProtectedRoute>
                                    <MainContent />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<ToDoApp />} />
                        </Route>

                        <Route
                            path="/shopping/*"
                            element={
                                <ProtectedRoute>
                                    <MainContent />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Shopping />} />
                        </Route>

                        <Route
                            path="/weather/*"
                            element={
                                <ProtectedRoute>
                                    <MainContent />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Weather />} />
                        </Route>

                        <Route
                            path="/recipes/*"
                            element={
                                <ProtectedRoute>
                                    <MainContent />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Recipes />} />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </AuthProvider>
    );
}
