document.addEventListener('DOMContentLoaded', function() {
    
    const thoughts = [
        { text: "Believe in yourself. You are braver than you think.", author: "Roy T. Bennett" },
        { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
        { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" }
    ];

    const thoughtText = document.querySelector(".thought-box p");
    const thoughtAuthor = document.querySelector(".thought-box .author");

    if (!thoughtText || !thoughtAuthor) {
        console.error("Error: Unable to find elements.");
        return;
    }

    let today = new Date().toISOString().split("T")[0];
    let storedDate = localStorage.getItem("thoughtDate");
    let storedThought = localStorage.getItem("dailyThought");

    // Ensure storedThought is valid JSON, else reset it
    try {
        storedThought = storedThought ? JSON.parse(storedThought) : null;
    } catch (error) {
        console.error("Invalid JSON in localStorage, resetting...", error);
        storedThought = null;
    }

    if (storedDate !== today || !storedThought) {
        let randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
        localStorage.setItem("dailyThought", JSON.stringify(randomThought));
        localStorage.setItem("thoughtDate", today);
        storedThought = randomThought;
    }

    thoughtText.textContent = `"${storedThought.text}"`;
    thoughtAuthor.textContent = `${storedThought.author}`;
    
    // Get the logout button
    const logoutBtn = document.getElementById('logout-btn');

    // Add click event listener to logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function(e) {
            e.preventDefault(); // Prevent the default anchor behavior

            try {
                // Make a request to the logout endpoint
                const response = await fetch('/logout', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin' // Important for sending cookies
                });

                if (response.ok) {
                    // If logout was successful, redirect to login page
                    window.location.href = '/login';
                } else {
                    console.error('Logout failed');
                    alert('Failed to logout. Please try again.');
                }
            } catch (error) {
                console.error('Error during logout:', error);
                alert('An error occurred during logout. Please try again.');
            }
        });
    }

    // Add any other dashboard functionality here
    // For example, handling notifications, phone calls, etc.

    // Notification icon click handler
    const notificationIcon = document.querySelector('.fa-bell');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            // Add notification functionality here
            alert('Notifications feature coming soon!');
        });
    }

    // Phone icon click handler
    const phoneIcon = document.querySelector('.fa-phone');
    if (phoneIcon) {
        phoneIcon.addEventListener('click', function() {
            // Add phone call functionality here
            alert('Phone call feature coming soon!');
        });
    }
});