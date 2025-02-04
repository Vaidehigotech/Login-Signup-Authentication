import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState 
{
    isAuthenticated : boolean;
    firstName : string | null;
    lastName : string | null;
    email : string | null;
}

const  initialState : AuthState = 
{
    isAuthenticated : localStorage.getItem("authToken")==="true",
    firstName : localStorage.getItem("firstName") || null,
    lastName : localStorage.getItem("lastName") || null,
    email : localStorage.getItem("email")|| null
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {        
        login(state, action: PayloadAction<{ firstName: string; lastName: string; email: string }>) {
            state.isAuthenticated = true;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;

            localStorage.setItem("authToken", "true");
            localStorage.setItem("firstName", action.payload.firstName);
            localStorage.setItem("lastName", action.payload.lastName);
            localStorage.setItem("email", action.payload.email);
        },
        logout(state)
        {
            state.isAuthenticated = false;
            state.firstName = null;
            state.lastName = null;
            state.email = null;
            localStorage.removeItem("authToken");
            localStorage.removeItem("firstName");
            localStorage.removeItem("lastName");
            localStorage.removeItem("email");
        }
    },
});

export const { login , logout } = authSlice.actions;
export default authSlice.reducer;
