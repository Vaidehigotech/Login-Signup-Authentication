import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    id: string | null;
    isAuthenticated: boolean;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    users: Array<{name: string; email: string }>;
}

const initialState: AuthState = {
    id: localStorage.getItem("id") || null,
    isAuthenticated: localStorage.getItem("authToken") === "true",
    firstName: localStorage.getItem("firstName") || null,
    lastName: localStorage.getItem("lastName") || null,
    email: localStorage.getItem("email") || null,
    users: JSON.parse(localStorage.getItem("users") || "[]"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ id: string; firstName: string; lastName: string; email: string }>) {
            state.id = action.payload.id;
            state.isAuthenticated = true;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;

            localStorage.setItem("authToken", "true");
            localStorage.setItem("userId", action.payload.id);
            localStorage.setItem("firstName", action.payload.firstName);
            localStorage.setItem("lastName", action.payload.lastName);
            localStorage.setItem("email", action.payload.email);
        },
        logout(state) {
            state.id = null;
            state.isAuthenticated = false;
            state.firstName = null;
            state.lastName = null;
            state.email = null;
            state.users = [];

            localStorage.removeItem("authToken");
            localStorage.removeItem("userId");
            localStorage.removeItem("firstName");
            localStorage.removeItem("lastName");
            localStorage.removeItem("email");
            localStorage.removeItem("users");
        },
        addNewUser(state, action: PayloadAction<{name: string; email: string }>) {
            state.users.push(action.payload);
            localStorage.setItem("users", JSON.stringify(state.users));
        },
    },
});

export const { login, logout, addNewUser } = authSlice.actions;
export default authSlice.reducer;
