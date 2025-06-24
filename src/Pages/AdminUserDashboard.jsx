import { useState, useEffect } from "react"
import UserTable from "../components/UserAdminTable"
import InviteModal from "../components/InviteModal"
import { getGroupUsers, sendUserInvite, removeUserFromGroup, fetchGroupId} from "../API/Admin"
import '../App.css'
import "../styles/AdminDashboard.css"
import { useNavigate } from 'react-router-dom';

const AdminUserDashboard = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [inviteLoading, setInviteLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  var GROUP_ID = fetchGroupId() 

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError("")
      const userData = await getGroupUsers(GROUP_ID)
      setUsers(userData)
    } catch (err) {
      setError("Failed to load users. Please try again.")
      console.error("Error fetching users:", err)
    } finally {
      setLoading(false)
    }
  }

const handleInviteUser = async (email) => {
  try {
    setInviteLoading(true);
    setError("");

    await sendUserInvite(email);

    setSuccessMessage(`Invitation sent to ${email} successfully!`);
    setInviteModalOpen(false);

    fetchUsers();

    setTimeout(() => setSuccessMessage(""), 3000);
  } catch (err) {
    setError(err.message || "Failed to send invitation. Please try again.");
    console.error("Error sending invite:", err);
  } finally {
    setInviteLoading(false);
  }
};

const handleRemoveUser = async (userId) => {
  try {
    setError("");

    await removeUserFromGroup(userId);

    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

    setSuccessMessage("User removed successfully!");

    setTimeout(() => setSuccessMessage(""), 3000);
  } catch (err) {
    setError("Failed to remove user. Please try again.");
    console.error("Error removing user:", err);

    fetchUsers();
  }
};


  const clearError = () => setError("")

  return (
    <div className="admin-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Group Users</h1>
        </div>
        <button className="btn btn-primary" onClick={() => setInviteModalOpen(true)}>
          + Invite User
        </button>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={clearError} className="alert-close">
            ×
          </button>
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success">
          <span>{successMessage}</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{users.length}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{users.filter((user) => user.status === "active").length}</div>
          <div className="stat-label">Active Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{users.filter((user) => user.status === "pending").length}</div>
          <div className="stat-label">Pending Invites</div>
        </div>
      </div>

      {/* User Table */}
      <UserTable users={users} onRemoveUser={handleRemoveUser} loading={loading} />

      {/* Invite Modal */}
      <InviteModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        onInvite={handleInviteUser}
        loading={inviteLoading}
      />
    </div>
  )
}

export default AdminUserDashboard;