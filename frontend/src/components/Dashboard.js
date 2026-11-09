import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleInvalidSession = async () => {
      const response = await fetch(
        "http://localhost/ProjetoMLTumor/backend/PHP/screens/dashboard.php",
        {
          credentials: "include",
          mode: "cors",
        }
      );

      const result = await response.text();
      setMessage(result);

      if (result.includes("Sessão inválida.")) {
        navigate("/logout");
      }
    };

    handleInvalidSession();
  }, [navigate]);

  if (message.includes("Sessão inválida.")) {
    return null; // ou <p>Redirecionando...</p>
  }

  return (
    <div>
      <p>{message}</p>
      <Link to="/logout">Logout</Link>
    </div>
  );
}

export default Dashboard;
