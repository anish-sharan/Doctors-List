  
const tk="tk";
let tok;

export const login = (token) => {
    localStorage.setItem(tk, token);
    tok=token;
}

export const logout = () => {
    localStorage.removeItem(tk);
}

export const getToken = () => {
    return tok;   
}
export const isLogin = () => {
    if (localStorage.getItem(tk)) {
        return true;
    }

    return false;
}