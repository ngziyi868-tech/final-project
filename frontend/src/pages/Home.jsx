import { useAuth } from "../store/useAuth";

function Home() {
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  return (
    <div>
      <h1>Recipes Home</h1>

      <p>Logged in as: {user?.email}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
