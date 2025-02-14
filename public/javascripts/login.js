document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        // Clear previous error messages
        document.querySelectorAll(".error-message").forEach(el => el.remove());

        let isValid = true;

        // Email format validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError("email", "Enter a valid email address");
            isValid = false;
        }

        if (!isValid) return;

        // Send data to backend
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (!response.ok) {
                if (data.error === "User not found") {
                    showError("email", "No account found with this email");
                } else if (data.error === "Incorrect password") {
                    showError("password", "Incorrect password");
                }
                return;
            }

            alert("Login successful!");
            window.location.href = "/dashboard"; // Redirect after successful login
        } catch (error) {
            console.error("Error:", error);
        }
    });

    function showError(id, message) {
        const inputField = document.getElementById(id);
        const errorElement = document.createElement("p");
        errorElement.className = "error-message";
        errorElement.style.color = "red";
        errorElement.textContent = message;
        inputField.parentNode.appendChild(errorElement);
    }
});
