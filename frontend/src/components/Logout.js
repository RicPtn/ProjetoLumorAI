import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const response = await fetch(
        "http://localhost/ProjetoMLTumor/backend/PHP/screens/logout.php",
        {
          credentials: "include",
          mode: "cors",
        }
      );

      const result = await response.text();
      if (result === "Login") {
        navigate("/ProjetoMLTumor/frontend/build");
      }
    };

    logout();
  }, [navigate]);

  return <p>Desconectando.</p>;
}

export default Logout;
