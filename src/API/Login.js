import { appsettings } from "../settings/appsettings";


export async function Login( email, password) {
   try {
      const response = await fetch("http://localhost:7217/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
       
        return false;
      }
      return true

      const data = await response.json();
      console.log(data);

    if (!data.isSuccess) {
      setError(data.errors ? data.errors.join(", ") : "Login failed");
      return;
    }
   
    if (data.is2FactorRequired) {
      localStorage.setItem("tempToken", data.tempToken);
      alert("Two-factor authentication required. Please verify.");
      return;
    }

    if (data.token) {
      //localStorage.setItem("authToken", data.token.AccessToken);
      alert("Login successful!");
      navigate("/DashboardGroupPage");
      // falta redirect a la pagina de dashboard

    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (err) {
    setError(err.message);
  }
};