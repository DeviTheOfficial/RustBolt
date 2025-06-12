// /assets/js/donations.js - FINAL VERSION

jQuery(document).ready(function($) {

    // --- Manual Tab Switching Logic ---
    $('#donateTypeTab a[data-toggle="pill"]').on('click', function(e) {
        // Stop the browser from doing anything default
        e.preventDefault();
        
        // Get the ID of the content pane we want to show
        var targetPaneId = $(this).attr('href');

        // Deactivate all tab buttons and content panes
        $('#donateTypeTab .nav-link').removeClass('active');
        $('#donateTypeTabContent .tab-pane').removeClass('show active');

        // Activate the one tab button that was clicked
        $(this).addClass('active');

        // Show the one content pane that corresponds to it
        $(targetPaneId).addClass('show active');
    });
    
    // --- Logic for handling donation amount buttons ---
    $('.tab-pane').each(function() {
        var tabPane = $(this);
        var presets = tabPane.find('.preset-amount');
        var customInput = tabPane.find('.donation-custom-input');
        var donateButton = tabPane.find('.donate-submit-btn');

        // A preset amount button is clicked
        presets.on('click', function() {
            // Make only the clicked button active
            presets.removeClass('active');
            $(this).addClass('active');
            // Update the input box with the amount from the button
            customInput.val($(this).data('amount'));
        });

        // The user types in the input box
        customInput.on('input', function() {
            var currentValue = $(this).val();
            // Deselect all buttons
            presets.removeClass('active');
            // Reselect the matching button, if there is one
            presets.each(function() {
                if ($(this).data('amount') == currentValue) {
                    $(this).addClass('active');
                }
            });
        });
        
        // The final donate button is clicked
        donateButton.on('click', function(e) {
            e.preventDefault();
            var amount = customInput.val();
            var type = tabPane.attr('id').includes('monthly') ? 'monthly' : 'one-time';
            alert('Thank you for your ' + type + ' donation of $' + amount + '!');
        });
    });

});