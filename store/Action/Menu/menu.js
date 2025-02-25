import {
    setMenus,
    setSubMenus,
    setSubMenusById,
} from "../../reducers/menuSlice";

export const findMenus = () => async (dispatch) => {
    try {
        const response = await fetch(`/api/menu`);
        const { data } = await response.json();
        dispatch(setMenus(data));
    } catch (error) {
        return error;
    }
};

export const findSubMenus = (id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/menu/${id}`);
        const { data } = await response.json();
        dispatch(setSubMenus(data));
    } catch (error) {
        return error;
    }
};

export const findSubMenusById = (id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/menu/sub-menu/${id}`);
        const { data } = await response.json();
        dispatch(setSubMenusById(data));

    } catch (error) {
        return error;
    }
};
