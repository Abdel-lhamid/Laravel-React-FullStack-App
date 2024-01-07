import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect } from "react";

export default function DefaultLayout() {
    const { user, token, setUser, setToken, notification } = useStateContext();
    if (!token) {
        return <Navigate to={"/login"} />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient
            .post("/logout")
            .then(() => {
                setUser({});
                setToken(null);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                <Link to={"/dashboard"}>Dashboard</Link>
                <Link to={"/users"}>Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>{user.name} &nbsp; &nbsp;</div>
                    <a onClick={onLogout} className="btn-logout" href="#">
                        Logout
                    </a>
                </header>
                <main>
                    <Outlet />
                </main>
                {notification && (
                    <div className="notification">{notification}</div>
                )}
            </div>
        </div>
    );
}
