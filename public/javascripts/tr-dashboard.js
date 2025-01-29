const cards = document.querySelectorAll('.card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => observer.observe(card));

        // Simulate new updates
        const updatesContainer = document.querySelector('.updates-container');
        setInterval(() => {
            const newUpdate = document.createElement('div');
            newUpdate.className = 'bg-green-50 p-4 rounded-lg animate__animated animate__fadeInLeft';
            newUpdate.innerHTML = `
                <p class="font-medium">New Activity</p>
                <p class="text-sm text-gray-600">Random update ${Math.floor(Math.random() * 100)}</p>
                <span class="text-xs text-gray-500">Just now</span>
            `;
            updatesContainer.prepend(newUpdate);
            if (updatesContainer.children.length > 5) {
                updatesContainer.removeChild(updatesContainer.lastChild);
            }
        }, 30000);

        // Add click handlers for cards
        cards.forEach(card => {
            card.addEventListener('click', function() {
                this.classList.add('animate__animated', 'animate__pulse');
                setTimeout(() => {
                    this.classList.remove('animate__animated', 'animate__pulse');
                }, 1000);
            });
        });