import { useState } from "react"
import "../styles/InviteModal.css"

/**
 * InviteModal Component - Modal for inviting new users
 * @param {boolean} isOpen - Whether modal is open
 * @param {Function} onClose - Callback to close modal
 * @param {Function} onInvite - Callback when invite is sent
 * @param {boolean} loading - Loading state for invite action
 */
const InviteModal = ({ isOpen, onClose, onInvite, loading }) => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      setError("Email is required")
      return
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    onInvite(email)
  }

  const handleClose = () => {
    setEmail("")
    setError("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Invite User to Group</h2>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter user's email address"
              disabled={loading}
              className={error ? "error" : ""}
            />
            {error && <span className="error-message">{error}</span>}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Sending..." : "Send Invite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InviteModal