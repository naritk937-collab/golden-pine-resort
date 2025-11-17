// Simple Booking System - Direct Formspree
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submit-btn');
        const submitText = document.getElementById('submit-text');
        const loadingText = document.getElementById('loading-text');
        const successMessage = document.getElementById('success-message');
        const errorMessage = document.getElementById('error-message');
        
        // Show loading
        submitBtn.disabled = true;
        submitText.classList.add('hidden');
        loadingText.classList.remove('hidden');
        
        // Hide messages
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');

        // Generate booking ID
        const bookingId = 'GP' + Date.now();
        
        // Prepare form data
        const formData = new FormData(this);
        formData.append('bookingId', bookingId);
        formData.append('timestamp', new Date().toLocaleString('th-TH'));
        formData.append('_subject', `การจองห้องพัก - ${bookingId} - Golden Pine Resort`);

        try {
            const response = await fetch('https://formspree.io/f/xpznvqko', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                successMessage.innerHTML = `
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-check-circle text-green-600 text-2xl"></i>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-lg font-semibold text-green-800">ส่งคำขอจองสำเร็จ! 🎉</h3>
                            <p class="text-green-700 mt-1">
                                รหัสการจอง: <strong>${bookingId}</strong><br>
                                เราจะติดต่อกลับภายใน 2 ชั่วโมง หรือโทร 053-706270-4
                            </p>
                        </div>
                    </div>
                `;
                successMessage.classList.remove('hidden');
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                form.reset();
            } else {
                throw new Error('Network response was not ok');
            }
            
        } catch (error) {
            console.error('Error:', error);
            errorMessage.classList.remove('hidden');
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitText.classList.remove('hidden');
            loadingText.classList.add('hidden');
        }
    });
});