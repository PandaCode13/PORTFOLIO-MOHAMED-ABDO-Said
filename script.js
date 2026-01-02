// Effet de scroll sur le header
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Activation des liens de navigation
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 150)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Smooth scroll avec offset pour le header fixe
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

const nom_user = document.querySelector('#nom_user');
const prenom_user = document.querySelector('#prenom_user');
const email_user = document.querySelector('#email_user');
const message_user = document.querySelector('#message_user');
const form = document.querySelector('#contact-form');

// ============================================
// GESTION DU FORMULAIRE DE CONTACT
// ============================================

function sendEmail(e) {
    e.preventDefault();

    // Validation
    if (!nom_user || !prenom_user || !email_user || !message_user) {
        alert("Erreur : formulaire non trouvé");
        return;
    }

    if (
        nom_user.value.trim() === "" ||
        prenom_user.value.trim() === "" ||
        email_user.value.trim() === "" ||
        message_user.value.trim() === ""
    ) {
        alert("Veuillez remplir tous les champs du formulaire.");
        return;
    }

    const subject = `Message de ${prenom_user.value} ${nom_user.value} - Portfolio`;
    const body = `
                  Nom : ${nom_user.value}
                  Prénom : ${prenom_user.value}
                  Email : ${email_user.value}

                  Message : 
                  ${message_user.value}
    `;

    window.location.href =
        `mailto:${emailGeneral}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    form.reset();
    alert("Votre message a été préparé. Votre client de messagerie va s'ouvrir.");
}