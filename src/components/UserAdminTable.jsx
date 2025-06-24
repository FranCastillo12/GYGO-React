import "../styles/UserTable.css"


/**
 * UserTable Component - Displays users in a table format with actions
 * @param {Array} users - Array of user objects
 * @param {Function} onRemoveUser - Callback when user is removed
 * @param {boolean} loading - Loading state
 */
const UserTable = ({ users, onRemoveUser, loading }) => {
  const handleRemoveClick = (userId, userName) => {
    if (window.confirm(`Are you sure you want to remove ${userName} from the group?`)) {
      onRemoveUser(userId)
    }
  }

  if (loading) {
    return (
      <div className="user-table-container">
        <div className="loading-state">Loading users...</div>
      </div>
    )
  }

  if (!users || users.length === 0) {
    return (
      <div className="user-table-container">
        <div className="empty-state">No users found in this group.</div>
      </div>
    )
  }

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="user-info">
                  <div className="user-avatar">{user.name ? user.name.charAt(0).toUpperCase() : "U"}</div>
                  <span>{user.name || "Unknown User"}</span>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                <span className={`role-badge ${user.role?.toLowerCase()}`}>{user.role || "Member"}</span>
              </td>
              <td>
                <span className={`status-badge ${user.status?.toLowerCase()}`}>{user.status || "Active"}</span>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveClick(user.id, user.name)}
                    title="Remove user from group"
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable