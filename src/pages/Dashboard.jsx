import { useEffect, useState } from "react";

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [role, setRole] = useState("Viewer");
    const [editingUserId, setEditingUserId] = useState(null);

    //Fake API call
    useEffect(() => {
        setTimeout(() => {
            setUsers([
                { id: 1, name: "John Doe", role: "Admin" },
                { id: 2, name: "Jane Smaith", role: "Editor" },
                { id: 3, name: "Mike Brown", role: "Viewer" }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <p>Loading Users...</p>;
    }

    return (
        <main>
            <h1>Users</h1>
            
            <form 
                onSubmit={(e) => {
                    e.preventDefault();

                    if (!name.trim()) return;

                    if (editingUserId) {
                        setUsers(
                            users.map((user) => 
                                user.id === editingUserId 
                                    ? { ...user, name, role } 
                                    : user)
                        );
                        setEditingUserId(null);
                    } else {
                    setUsers([
                        ...users,
                        {
                            id: Date.now(),
                            name,
                            role
                        }
                    ]);
                }
                    setName("");
                    setRole("Viewer");
                }}
            >
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => 
                    setName(e.target.value)}
                />

                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option>Admin</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                </select>

                <button type="submit">{editingUserId ? "Update User" : "Add User"}</button>
            </form>

            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.role}

                        <button
                            onClick={() => {
                                setEditingUserId(user.id);
                                setName(user.name);
                                setRole(user.role);
                            }}>
                                Edit
                            </button>
                        
                        <button
                            onClick={() =>
                                setUsers(users.filter((u) => u.id !== user.id))
                            }>
                                Delete
                            </button>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default Dashboard;