import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [appStatus, setAppStatus] = useState("");
  const [nodeHealth, setNodeHealth] = useState("");

  const [statusLoading, setStatusLoading] = useState(false);
  const [healthLoading, setHealthLoading] = useState(false);

  // Get hello message when app loads
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error("Hello API error:", error);
      });
  }, []);

  // Check application status
  const handleAppStatus = () => {
    setStatusLoading(true);

    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => setAppStatus(data.message))
      .catch((error) => {
        console.error("Status API error:", error);
        setAppStatus("Failed to get app status");
      })
      .finally(() => {
        setStatusLoading(false);
      });
  };

  // Check Node health
  const handleNodeHealth = () => {
    setHealthLoading(true);

    fetch("/api/health-check")
      .then((res) => res.json())
      .then((data) => setNodeHealth(data.message))
      .catch((error) => {
        console.error("Health API error:", error);
        setNodeHealth("Failed to get Node health");
      })
      .finally(() => {
        setHealthLoading(false);
      });
  };

  return (
    <main className="app">
      <div className="card">
        <div className="badge">
          <span>●</span> Backend Connected
        </div>

        <h1>Hello there! 👋</h1>

        <p className="subtitle">
          A simple React + Node.js application
        </p>

        {/* API Message */}
        <div className="message-box">
          <span>API Message</span>
          <strong>{message || "Loading..."}</strong>
        </div>

        {/* App Status */}
        <button
          onClick={handleAppStatus}
          disabled={statusLoading}
        >
          {statusLoading ? "Checking..." : "Check Backend Status"}
        </button>

        {appStatus && (
          <div className="status">
            <span className="status-dot">●</span>
            <span>{appStatus}</span>
          </div>
        )}

        {/* Node Health */}
        <button
          onClick={handleNodeHealth}
          disabled={healthLoading}
        >
          {healthLoading ? "Getting Health..." : "Get Node Status"}
        </button>

        {nodeHealth && (
          <div className="status">
            <span className="status-dot">●</span>
            <span>{nodeHealth}</span>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
