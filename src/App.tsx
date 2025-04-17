import React from "react";
import {ToastContainer} from "react-toastify";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import {HOME, LOGIN, ORDER} from "./constants/routeConstants";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./pages/Orders/Orders";
import Order from "./pages/Orders/Order/Order";
import NotFound from "./components/NotFound/NotFound";
import ManageProduct from "./pages/Admin/ManageProduct/ManageProduct";
import Forbidden from "./components/Forbidden/Forbidden";

const getUserRole = () => {
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.role?.roleId;
};

const isAuthenticated = () => !!getUserRole();

// @ts-ignore
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return isAuthenticated() ? children : <Navigate to={LOGIN}/>;
};

// @ts-ignore
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return getUserRole() === "ADMIN" ? children : <Forbidden/>;
};

function App() {
    return (
        <div className="App">
            <ToastContainer/>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path={LOGIN} element={<Login/>}/>

                    {/* Private Routes */}
                    <Route
                        path={HOME}
                        element={
                            <PrivateRoute>
                                <Home/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={ORDER}
                        element={
                            <PrivateRoute>
                                <Orders/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={`${ORDER}/:orderId`}
                        element={
                            <PrivateRoute>
                                <Order/>
                            </PrivateRoute>
                        }
                    />

                    {/* Admin Routes */}
                    <Route
                        path="/admin/manage-products"
                        element={
                            <AdminRoute>
                                <ManageProduct/>
                            </AdminRoute>
                        }
                    />

                    <Route path="*" element={<NotFound/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
