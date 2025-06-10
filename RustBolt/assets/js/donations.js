// /assets/js/donations.js

document.addEventListener('DOMContentLoaded', function() {
    // Function to handle interactions within a donation tab
    function setupDonationTab(tabPaneId) {
        const tabPane = document.getElementById(tabPaneId);
        if (!tabPane) return;

        const presets = tabPane.querySelectorAll('.preset-amount');
        const customInput = tabPane.querySelector('input[type="number"]');
        const donateButton = tabPane.querySelector('.donate-submit-btn');

        // Event listener for preset amount buttons
        presets.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all presets in this tab
                presets.forEach(btn => btn.classList.remove('active'));
                // Add active class to the clicked button
                this.classList.add('active');
                // Update the custom input value
                customInput.value = this.dataset.amount;
            });
        });

        // Event listener for the custom input field
        customInput.addEventListener('input', function() {
            const currentValue = this.value;
            let matchedPreset = false;
            // Remove active class from all presets
            presets.forEach(button => {
                if (button.dataset.amount === currentValue) {
                    button.classList.add('active');
                    matchedPreset = true;
                } else {
                    button.classList.remove('active');
                }
            });
        });
        
        // You can add logic for the final donate button here
        donateButton.addEventListener('click', function(e) {
            e.preventDefault(); // prevent form submission for this example
            const amount = customInput.value;
            const type = tabPaneId.includes('monthly') ? 'monthly' : 'one-time';
            alert(`Thank you for your ${type} donation of $${amount}!`);
            // Here you would integrate with a payment processor like Stripe or PayPal
        });
    }

    // Initialize logic for both tabs
    setupDonationTab('monthly');
    setupDonationTab('one-time');
    
    // Ensure Bootstrap pills work correctly with our custom logic
    var triggerTabList = [].slice.call(document.querySelectorAll('#donateTypeTab button'))
    triggerTabList.forEach(function (triggerEl) {
      var tabTrigger = new bootstrap.Tab(triggerEl)

      triggerEl.addEventListener('click', function (event) {
        event.preventDefault()
        tabTrigger.show()
      })
    });
});