let currentPage = 1;
const totalPages = 7;
let noBtnAttempts = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    typeWriterEffect();
});

// Floating Hearts Background
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['💖', '💕', '💗', '💓', '💝', '❤️', '💘', '💞'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 12000);
    }, 300);
}

// Typewriter Effect for Diyaana
function typeWriterEffect() {
    const text = "my beautiful diyaana";
    const element = document.getElementById('typingText');
    let index = 0;
    
    // Disable the CSS typing animation
    element.style.animation = 'blink 0.75s step-end infinite';
    element.style.width = 'auto';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 150);
        }
    }
    
    setTimeout(() => {
        element.textContent = '';
        type();
    }, 500);
}

// Page Navigation
function nextPage() {
    const current = document.getElementById(`page${currentPage}`);
    current.classList.remove('active');
    
    currentPage++;
    
    if (currentPage <= totalPages) {
        const next = document.getElementById(`page${currentPage}`);
        next.classList.add('active');
        
        // Special animations for specific pages
        if (currentPage === 3) {
            animateReasons();
        } else if (currentPage === 6) {
            resetQuestion();
        } else if (currentPage === 7) {
            celebrate();
        }
    }
}

// Animate Reasons
function animateReasons() {
    const cards = document.querySelectorAll('.reason-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = '';
            }, 10);
        }, index * 100);
    });
}

// Memory Display
const memories = [
    {
        title: "when we first met (and highkey stared at eachother)",
        text: "when you first saw me walk into the room and you said 'thats my future husband' you were right, im gonna be your future husband monkey !!, but fr tho, the first time i saw you i fell in love, if i walk into that room 100 more times youd be the only person i look at each 100 time."
    },
    {
        title: "birthday",
        text: "i havent experienced my bday with you yet, but i know you have made it so so so special and i love that you put so much effort into it"
    },
    {
        title: "how nice you are to me",
        text: "when you ditched everyone to take care of me when i was sick in cape town, might have been a tiny thing for you but to me, seeing how much i meant to you in that moment was the sweetest thing i have ever felt"
    },
    {
        title: "my favorite day with you",
        text: "im not gonna lie and be like the new years date we had was my favorite day, it is it really really is, but my actual favorite memory of us is when we went to my appartement, we had my mom's food and we heated it up and sat down and watched a movie and series while we ate, lowkey cringe but it showed me what life would look like in the future with you."
    }
];

function showMemory(index) {
    const display = document.getElementById('memoryDisplay');
    const memory = memories[index];
    
    display.style.animation = 'none';
    setTimeout(() => {
        display.innerHTML = `
            <h3 style="margin-bottom: 20px; font-size: 2rem;">${memory.title}</h3>
            <p style="font-size: 1.2rem;">${memory.text}</p>
        `;
        display.style.animation = 'fadeIn 0.8s ease';
    }, 10);
}

// Question Page Interactions
function resetQuestion() {
    noBtnAttempts = 0;
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const hint = document.getElementById('hint');
    
    yesBtn.style.transform = 'scale(1)';
    yesBtn.style.padding = '25px 60px';
    noBtn.style.position = 'relative';
    noBtn.style.left = '0';
    noBtn.style.top = '0';
    noBtn.style.zIndex = '99999';
    hint.textContent = '';
}

function moveButton() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const hint = document.getElementById('hint');
    
    noBtnAttempts++;
    
    // Get button dimensions for better positioning
    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width || 150;
    const btnHeight = btnRect.height || 60;
    
    // Keep button safely within viewport with good margins
    const margin = 50;
    const maxX = window.innerWidth - btnWidth - margin;
    const maxY = window.innerHeight - btnHeight - margin;
    const randomX = Math.max(margin, Math.random() * maxX);
    const randomY = Math.max(margin, Math.random() * maxY);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '99999';
    
    // Add pulsing effect to make it easier to find
    noBtn.style.animation = 'buttonPulse 1s ease-in-out 3';
    
    // Grow the Yes button
    const newScale = 1 + (noBtnAttempts * 0.15);
    const newPadding = 25 + (noBtnAttempts * 5);
    yesBtn.style.transform = `scale(${newScale})`;
    yesBtn.style.padding = `${newPadding}px ${newPadding * 2.4}px`;
    
    // Ensure hint stays visible
    hint.style.display = 'block';
    hint.style.visibility = 'visible';
    hint.style.opacity = '0.8';
    
    // Show hints
    const hints = [
        "so you hate me",
        "just say yes, ill get you boba",
        "no more matcha for you",
        "just sat yes :(",
        "remmeber that kid photo? youre making him sad",
        "dont make me mad pwincess (feet clap)",
        "no more pp pics",
        "say yes or ill cry",
        "i know you like green, so press it",
        "im gonna kms"
    ];
    
    if (noBtnAttempts <= hints.length) {
        hint.textContent = hints[noBtnAttempts - 1];
    }
}

function handleNo() {
    // This is just a backup - the button should move before being clicked
    moveButton();
}

function handleYes() {
    createConfetti();
    nextPage();
}

// Celebration Effects
function celebrate() {
    createConfetti();
    playFireworks();
}

function createConfetti() {
    const colors = ['#ff6b95', '#ff8fab', '#667eea', '#764ba2', '#f093fb', '#ffd700', '#ff69b4', '#ff1493'];
    
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-20px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

function playFireworks() {
    const emojis = ['✨', '🎉', '🎊', '💖', '💕', '💗', '🌟', '⭐'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            firework.style.position = 'fixed';
            firework.style.fontSize = Math.random() * 30 + 20 + 'px';
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = Math.random() * window.innerHeight + 'px';
            firework.style.pointerEvents = 'none';
            firework.style.zIndex = '9999';
            firework.style.animation = 'fadeIn 0.5s ease, fadeOut 2s ease 0.5s';
            
            document.body.appendChild(firework);
            
            setTimeout(() => firework.remove(), 2500);
        }, i * 100);
    }
}

// Restart
function restart() {
    currentPage = 1;
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page1').classList.add('active');
    typeWriterEffect();
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);
