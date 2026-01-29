document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
      alert("⚠️ Please fill in both fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");
    console.log("Users from localStorage:", users);
    console.log("Trying login:", username, password);

    if (users[username] && users[username] === password) {
      alert("✅ Login successful! Redirecting...");
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", username);
      window.location.href = "index.html";
    } else {
      alert("❌ Invalid username or password. Try again.");
    }
  });
});
