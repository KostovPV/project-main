import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AuthGuard = (props) => {

    const {isAuthenticated} = useContext(AuthContext)

    if(!isAuthenticated) {
        
        return <Navigate to="/"/>
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default AuthGuard;
