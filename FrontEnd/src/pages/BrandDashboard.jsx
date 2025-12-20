import "./BrandDashboard.css";

export default function BrandDashboard() {
  return (
    <div className="dashboard-container">
      {/* Page Title */}
      <h1 className="dashboard-title">Brand Dashboard</h1>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-card">
          <h3>Total Views</h3>
          <p>1,240</p>
        </div>

        <div className="stat-card">
          <h3>Products Listed</h3>
          <p>12</p>
        </div>

        <div className="stat-card">
          <h3>Followers</h3>
          <p>320</p>
        </div>
      </section>

      {/* Profile Completion */}
      <section className="profile-section">
        <h2>Profile Completion</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "70%" }}></div>
        </div>
        <p className="progress-text">70% completed</p>
      </section>

      {/* Quick Actions */}
      <section className="actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-buttons">
          <button>Add Product</button>
          <button>Edit Profile</button>
          <button>View Public Page</button>
        </div>
      </section>
    </div>
  );
}
