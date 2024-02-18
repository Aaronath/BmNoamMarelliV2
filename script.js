document.addEventListener("DOMContentLoaded", function() {
    const showInvitationBtn = document.getElementById('showInvitationBtn');
    const invitationLayer = document.getElementById('invitationLayer');
    const backgroundMusic = document.getElementById('backgroundMusic');

    showInvitationBtn.addEventListener('click', function() {
        invitationLayer.style.transition = "transform 1s ease-out";
        invitationLayer.style.transform = "translateY(-100%)";
        backgroundMusic.play();
    });

    // Afficher/masquer le champ pour le nombre de personnes selon la réponse à la présence
    const attendanceRadioYes = document.getElementById('yes');
    const guestsNumDiv = document.getElementById('guestsNum');

    attendanceRadioYes.addEventListener('change', function() {
        if (attendanceRadioYes.checked) {
            guestsNumDiv.style.display = 'block';
        } else {
            guestsNumDiv.style.display = 'none';
        }
    });

    // Configuration EmailJS
    emailjs.init("EDSi49UfrOVwiM-2w");

    const rsvpForm = document.getElementById('rsvpForm');

    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut

        // Récupérer les données du formulaire
        const lastName = document.getElementById('lastName').value;
        const firstName = document.getElementById('firstName').value;
        const eventi = document.getElementById('eventi').value;

        const attendance = document.querySelector('input[name="attendance"]:checked').value;
        const guests = document.getElementById('guests').value;

        // Envoyer les données par e-mail en utilisant EmailJS
        emailjs.send("service_eh63orf", "template_ue189uu", {
            lastName: lastName,
            firstName: firstName,
            attendance: attendance,
            eventi: eventi,
            guests: guests
        }).then(function(response) {
            console.log("E-mail envoyé avec succès!", response);
            alert("Votre réponse a été envoyée avec succès!");
        }, function(error) {
            console.error("Erreur lors de l'envoi de l'e-mail:", error);
            alert("Une erreur s'est produite lors de l'envoi de votre réponse.");
        });

        // Réinitialiser le formulaire après l'envoi
        rsvpForm.reset();
    });
});
