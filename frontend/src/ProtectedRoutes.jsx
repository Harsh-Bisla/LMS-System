import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { userContext } from "./store/userContext";


export const Authenticated = ({ children }) => {
    if (localStorage.getItem("token")) {
        return <Navigate to="/" />;
    }
    return children;
};

export const LoggedIn = ({ children }) => {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return children;
}



export const AdminRoute = ({ children }) => {
    if (localStorage.getItem("token")) {
        if (localStorage.role !== "instructor") {
            return <Navigate to="/" />
        }
    }
    else {
        return <Navigate to="/" />
    }
    return children;
};