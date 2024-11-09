import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from '../../services/store';
import {ProtectedRouteElementProps} from './../types/components-types'

export const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({children}) => {
    const isAuth = useSelector(state => state.authUser.isAuth);
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
    return <>{children}</>;
};
