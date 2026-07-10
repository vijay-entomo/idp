// Interactions for IDP Rethink Prototype

// Point 6: Seamless Document Integration (Drag and drop interaction)
const dropzone = document.getElementById('docDropzone');

dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = 'var(--primary)';
    dropzone.style.background = 'var(--primary-light)';
});

dropzone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = '#cbd5e1';
    dropzone.style.background = 'var(--bg-card)';
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = 'var(--success)';
    dropzone.style.background = '#ecfdf5';
    
    dropzone.innerHTML = `
        <i class='bx bx-check-circle floating-icon' style="color: var(--success);"></i>
        <h3 style="color: var(--success);">Document Parsed Successfully</h3>
        <p>Extracting "System Architecture" and "Cross-functional Leadership" as core skill gaps...</p>
    `;
    
    // Simulate AI reacting to the upload
    setTimeout(() => {
        const aiContent = document.getElementById('aiContent');
        const newSuggestion = document.createElement('div');
        newSuggestion.className = 'ai-suggestion';
        newSuggestion.innerHTML = `
            <h5><i class='bx bx-analyse'></i> Document Insights Applied</h5>
            <p>I've added two new nodes to your journey based on your 2025 Performance Review doc.</p>
        `;
        aiContent.prepend(newSuggestion);
    }, 1500);
});

dropzone.addEventListener('click', () => {
    // Simulate click-to-upload
    dropzone.dispatchEvent(new Event('drop'));
});

// Point 5: Dynamic Feedback Loops (Score interaction)
function increaseScore() {
    const scoreElement = document.getElementById('impactScore');
    let currentScore = parseInt(scoreElement.innerText);
    const targetScore = 78;
    
    const interval = setInterval(() => {
        if (currentScore < targetScore) {
            currentScore++;
            scoreElement.innerText = currentScore;
            scoreElement.style.transform = 'scale(1.1)';
            setTimeout(() => scoreElement.style.transform = 'scale(1)', 50);
        } else {
            clearInterval(interval);
            scoreElement.style.color = 'var(--success)';
        }
    }, 40);

    // Update the button text to show success
    const btn = event.target;
    btn.innerHTML = "<i class='bx bx-check'></i> Added";
    btn.style.background = 'var(--success)';
}
