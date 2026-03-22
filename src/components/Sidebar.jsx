import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li>Users</li>
                <li>Bookings</li>
                <li><Link to="/Settings">Settings</Link></li>
            </ul>
        </aside>
    );
}

export default Sidebar;