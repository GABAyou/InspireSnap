document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const q1 = document.getElementById('inspired');
    const q2 = document.getElementById('saw-inspiration');
    const q3 = document.getElementById('caused-inspiration');
    const storySection = document.getElementById('story-section');
    const emailSection = document.getElementById('email-section');
    const submitBtn = document.getElementById('submit-btn');

    // Load saved state
    loadState();

    // Event listeners for checkboxes
    q1.addEventListener('change', () => {
        toggleNextQuestion(q1, 'q2');
        saveState();
    });

    q2.addEventListener('change', () => {
        toggleNextQuestion(q2, 'q3');
        saveState();
    });

    q3.addEventListener('change', () => {
        if (q3.checked) {
            storySection.classList.remove('hidden');
            storySection.classList.add('show');
            emailSection.classList.remove('hidden');
            emailSection.classList.add('show');
        } else {
            storySection.classList.add('hidden');
            storySection.classList.remove('show');
            emailSection.classList.add('hidden');
            emailSection.classList.remove('show');
        }
        saveState();
    });

    // Submit handler
    submitBtn.addEventListener('click', handleSubmit);

    // Functions
    function toggleNextQuestion(checkbox, nextId) {
        const nextQuestion = document.getElementById(nextId);
        if (checkbox.checked) {
            nextQuestion.classList.remove('hidden');
            nextQuestion.classList.add('show');
        } else {
            nextQuestion.classList.add('hidden');
            nextQuestion.classList.remove('show');
            // Reset subsequent questions
            const questions = ['q2', 'q3'].slice(questions.indexOf(nextId));
            questions.forEach(q => {
                document.getElementById(q).classList.add('hidden');
                document.getElementById(q).classList.remove('show');
                document.querySelector(`#${q} input`).checked = false;
            });
            storySection.classList.add('hidden');
            storySection.classList.remove('show');
            emailSection.classList.add('hidden');
            emailSection.classList.remove('show');
        }
    }

    function saveState() {
        const state = {
            inspired: q1.checked,
            sawInspiration: q2.checked,
            causedInspiration: q3.checked,
            story: document.getElementById('inspiration-story').value,
            email: document.getElementById('email').value
        };
        localStorage.setItem('inspireSnapState', JSON.stringify(state));
    }

    function loadState() {
        const savedState = localStorage.getItem('inspireSnapState');
        if (savedState) {
            const state = JSON.parse(savedState);
            q1.checked = state.inspired;
            q2.checked = state.sawInspiration;
            q3.checked = state.causedInspiration;
            document.getElementById('inspiration-story').value = state.story;
            document.getElementById('email').value = state.email;

            // Show relevant sections based on state
            if (state.inspired) toggleNextQuestion(q1, 'q2');
            if (state.sawInspiration) toggleNextQuestion(q2, 'q3');
            if (state.causedInspiration) {
                storySection.classList.remove('hidden');
                storySection.classList.add('show');
                emailSection.classList.remove('hidden');
                emailSection.classList.add('show');
            }
        }
    }

    function handleSubmit() {
        const email = document.getElementById('email').value;
        const story = document.getElementById('inspiration-story').value;
        
        if (!email) {
            alert('Please enter your email to submit your inspiration!');
            return;
        }

        // For now, we'll just log the submission
        console.log('Submission:', {
            inspired: q1.checked,
            sawInspiration: q2.checked,
            causedInspiration: q3.checked,
            story,
            email
        });

        alert('Thank you for sharing your inspiration! We\'ll be in touch.');
        
        // Clear state and form
        localStorage.removeItem('inspireSnapState');
        location.reload();
    }
});
