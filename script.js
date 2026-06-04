const box = document.querySelector('.hand-drawn-box');
const faceHolder = document.querySelector('.hand-drawn-box .face');


let isResetting = false;

// ----------------------------------------------------
// PHASE 1: The Mouseover Dodging (Runs continuously)
// ----------------------------------------------------
box.addEventListener('mouseover', function runAway() {
    // If the box is already caught and resetting, do nothing
    if (isResetting) return;

    // Switch to absolute positioning if not already
    if (box.style.position !== 'absolute') {
        box.style.position = 'absolute';
    }

    // Calculate random X and Y coordinates within the viewport.
    // We subtract 150px (rough max size) to ensure it stays on screen.
    const randomX = Math.floor(Math.random() * (window.innerWidth - 150));
    const randomY = Math.floor(Math.random() * (window.innerHeight - 150));

    // Calculate a slight random rotation
    const randomRot = (Math.random() * 20) - 10; // Between -10 and +10 degrees

    // Apply the new position and rotation smoothly (via CSS transition)
    box.style.left = `${randomX}px`;
    box.style.top = `${randomY}px`;
    box.style.transform = `rotate(${randomRot}deg)`;
});


// ----------------------------------------------------
// PHASE 2: The Click (Catching it)
// ----------------------------------------------------
box.addEventListener('click', function caughtSquare() {
    // Prevent catching multiple times if they double click really fast
    if (isResetting) return;

    // Start the reset phase
    isResetting = true;

    // 1. Instantly stop the box by removing the transition
    box.style.transition = 'none';

    // 2. Add the angry face and the "caught" style class
    faceHolder.innerText = '>:( ';
    box.classList.add('caught');

    // ------------------------------------------------
    // PHASE 3: The 2-Second Delay and Reset
    // ------------------------------------------------
    
    // Fade out after 1.5 seconds (leaving 0.5s for the reset animation to complete by 2s)
    setTimeout(() => {
        box.style.opacity = '0';
        box.style.transition = 'opacity 0.5s ease';
    }, 1500);

    // Full game reset at exactly 2 seconds
    setTimeout(() => {
        // A. Remove the "caught" state styles
        box.classList.remove('caught');
        faceHolder.innerText = '';

        // B. Re-show the box instantly
        box.style.transition = 'none'; // Don't animate the reappear
        box.style.opacity = '1';

        // C. Restore base properties and re-enable base transitions
        // We set transition back so next mouseover works smoothly.
        // Important: Wait 50ms before restoring transition so the jump-reset doesn't animate.
        setTimeout(() => {
             // Reset its base rotation and restore smooth transitions
             box.style.transition = 'all 0.2s ease-out';
             box.style.transform = `rotate(-1deg)`;
             
             // Optionally jump back to center or last playing spot. 
             // We'll jump slightly off-center for a fresh play again spot.
             const centerX = Math.floor(window.innerWidth / 2 - 100);
             const centerY = Math.floor(window.innerHeight / 2 - 100);
             box.style.left = `${centerX}px`;
             box.style.top = `${centerY}px`;

             // Game is playable again!
             isResetting = false; 
        }, 50);

    }, 2000); // The full delay
});