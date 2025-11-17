// Fixed Booking System - Golden Pine Resort
class BookingSystem {
    constructor() {
        this.bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        this.bookingCounter = parseInt(localStorage.getItem('bookingCounter') || '1000');
        this.init();
    }

    init() {
        this.setupFormHandler();
    }

    generateBookingId() {
        this.bookingCounter++;
        localStorage.setItem('bookingCounter', this.bookingCounter.toString());
        return `GP${this.bookingCounter}`;
    }

    submitBooking(formData) {
        const booking = {
            id: this.generateBookingId(),
            timestamp: new Date().toISOString(),
            status: 'pending',
            customerData: formData
        };

        this.bookings.push(booking);
        this.saveBookings();
        
        // Send to Formspree directly
        this.sendToFormspree(booking);
        
        return booking;
    }

    saveBookings() {
        localStorage.setItem('bookings', JSON.stringify(this.bookings));
    }

    async sendToFormspree(booking) {
        const form = document.getElementById('booking-form');
        if (!form) return;

        // Create FormData from the actual form
        const formData = new FormData(form);
        
        // Add booking ID
        formData.append('bookingId', booking.id);
        formData.append('timestamp', new Date().toLocaleString('th-TH'));

        try {
            const response = await fetch('https://formspree.io/f/xpznvqko', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                console.log('Email sent successfully to admin');
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    setupFormHandler() {
        const form = document.getElementById('booking-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
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
            
            // Hide previous messages
            successMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');

            try {
                // Get form data
                const formData = new FormData(form);
                const bookingData = Object.fromEntries(formData.entries());
                
                // Submit booking
                const booking = this.submitBooking(bookingData);
                
                // Send to Formspree
                const response = await fetch('https://formspree.io/f/xpznvqko', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    this.showSuccessMessage(booking.id);
                    form.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
                
            } catch (error) {
                console.error('Error:', error);
                this.showErrorMessage();
            } finally {
                // Reset button
                submitBtn.disabled = false;
                submitText.classList.remove('hidden');
                loadingText.classList.add('hidden');
            }
        });
    }

    showSuccessMessage(bookingId) {
        const successDiv = document.getElementById('success-message');
        if (successDiv) {
            successDiv.innerHTML = `
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
            successDiv.classList.remove('hidden');
            successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    showErrorMessage() {
        const errorDiv = document.getElementById('error-message');
        if (errorDiv) {
            errorDiv.classList.remove('hidden');
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Initialize booking system
const bookingSystem = new BookingSystem();
window.bookingSystem = bookingSystem;