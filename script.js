const box = document.querySelector('.hand-drawn-box');
const face = document.querySelector('.face');
let isResetting = false;

// 1. BEZI OD MISA (Square runs away)
box.addEventListener('mouseover', () => {
  if (isResetting) return;
  
  // Calculate random coordinates ensuring it stays fully on screen
  const randomX = Math.floor(Math.random() * (window.innerWidth - box.offsetWidth));
  const randomY = Math.floor(Math.random() * (window.innerHeight - box.offsetHeight));
  box.style.left = `${randomX}px`;
  box.style.top = `${randomY}px`;
  
  // Random wild rotations while playing
  box.style.transform = `rotate(${Math.random() * 360}deg)`;
});

// 2. KLIK (Square caught)
box.addEventListener('click', () => {
  if (isResetting) return;
  isResetting = true;
  
  // A. Square completely disappears instantly
  box.style.display = 'none';
  
  // B. Calculate random coordinates for the 50x50px face
  const faceX = Math.floor(Math.random() * (window.innerWidth - 50));
  const faceY = Math.floor(Math.random() * (window.innerHeight - 50));
  
  face.style.left = `${faceX}px`;
  face.style.top = `${faceY}px`;
  
  // C. Make the face pop up suddenly
  face.style.display = 'flex';
  
  // 3. THE 2-SECOND DELAY AND RESET
  setTimeout(() => {
    // Face disappears
    face.style.display = 'none';
    
    // Teleport the square back to the dead center of the screen while invisible
    box.style.transition = 'none';
    box.style.left = 'calc(50vw - 25vmin)';
    box.style.top = 'calc(50vh - 25vmin)';
    box.style.transform = 'rotate(-1deg)';
    
    // Square reappears
    box.style.display = 'block';
    
    // Brief delay to let the teleport finish before allowing movement again
    setTimeout(() => {
      box.style.transition = 'all 0.3s ease-out';
      isResetting = false; // Game starts again!
    }, 50);
  }, 2000); // 2000ms = 2 seconds
});