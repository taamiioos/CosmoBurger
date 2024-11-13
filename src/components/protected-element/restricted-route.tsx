import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from '../../services/store';
import {RestrictedRouteProps} from './../types/components-types'

export const RestrictedRoute: React.FC<RestrictedRouteProps> = ({children}) => {
    const isAuth = useSelector(state => state.authUser.isAuth);

    if (isAuth) {
        return <Navigate to="/" replace/>;
    }

    return <>{children}</>;
};
