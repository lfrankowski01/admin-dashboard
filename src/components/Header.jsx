import "./Header.css";

function Header({ onToggleSidebar, onLogout }) {
  return (
    <header>
      {/* Sidebar toggle button */}
      <button onClick={onToggleSidebar}>☰</button>

      <h2>Admin Panel</h2>

      {/* Logout button */}
      <button onClick={onLogout}>Logout</button>
    </header>
  );
}

export default Header;