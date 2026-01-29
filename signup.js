const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(e){
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if(password !== confirmPassword){
        alert("Passwords do not match!");
        return;
    }

    if(password.length < 4){
        alert("Password must be at least 4 characters long!");
        return;
    }

    // Retrieve existing users
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if(users[username]){
        alert("Username already exists! Try another one.");
        return;
    }

    // Save new user
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully! Redirecting to login...");
    window.location.href = "login.html";
});