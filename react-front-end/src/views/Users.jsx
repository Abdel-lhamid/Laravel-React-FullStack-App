import { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()
    const [meta, setMeta] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getUsers(currentPage);
    }, [currentPage]);

    const onDeleteClick = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/users/${user.id}`).then(() => {
            setNotification("User was successfully deleted");
            getUsers(currentPage);
        });
    };

    const getUsers = (page) => {
        setLoading(true);
        axiosClient
            .get(`/users?page=${page}`)
            .then(({ data }) => {
                setUsers(data.data);
                setMeta(data.meta.links);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onPageChange = (pageNum) => {
        if (pageNum === "&laquo; Previous") {
            pageNum = currentPage - 1;
        } else if (pageNum === "Next &raquo;") {
            pageNum = currentPage + 1;
        }
        setCurrentPage(pageNum);
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Users</h1>
                <Link className="btn-add" to="/users/new">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.created_at}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={`/users/${u.id}`}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            className="btn-delete"
                                            onClick={() => onDeleteClick(u)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
                <div className="pagination-container">
                    {meta.map((link) => (
                        <button
                            key={link.label}
                            className={`pagination-button ${
                                link.active ? "active" : ""
                            }`}
                            disabled={!link.url || link.label === currentPage.toString()}
                            onClick={() => onPageChange(link.label)}
                        >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
