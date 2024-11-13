import {
    ActionTypes,
    TProfileActionTypes
} from '../types/profile-types';

export interface IProfileState {
    email: string;
    name: string;
    error: string;
    successGet: boolean;
    successPatch: boolean;
}

const initialState: IProfileState = {
    email: "",
    name: "",
    error: '',
    successGet: false,
    successPatch: false
};

const profileReducer = (state = initialState, action: TProfileActionTypes): IProfileState => {
    switch (action.type) {
        case ActionTypes.GET_USER_REQUEST:
            return {
                ...state,
                successGet: false,
            };
        case ActionTypes.GET_USER_SUCCESS:
            if (action.payload) {
                return {
                    ...state,
                    successGet: true,
                    email: action.payload.email,
                    name: action.payload.name,
                };
            }
        case ActionTypes.GET_USER_FAILURE:
            if (action.payload) {

                return {
                    ...state,
                    successGet: false,
                };
            }

        case ActionTypes.UPDATE_USER_REQUEST:
            return {
                ...state,
                successPatch: false,
            };
        case ActionTypes.UPDATE_USER_SUCCESS:
            if (action.payload) {

                return {
                    ...state,
                    successPatch: true,
                    email: action.payload.email,
                    name: action.payload.name,
                };
            }

        case ActionTypes.UPDATE_USER_FAILURE:
            return {
                ...state,
                successPatch: false,
            };
        default:
            return state;
    }
};

export default profileReducer;
