document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Range Slider Functionality with Tooltips
    const rangeSliders = document.querySelectorAll('.range-slider input[type="range"]');
    rangeSliders.forEach(slider => {
        const output = slider.nextElementSibling;
        output.textContent = slider.value;

        const tooltip = document.createElement('span');
        tooltip.classList.add('range-tooltip');
        tooltip.textContent = slider.value;
        slider.parentElement.appendChild(tooltip);

        slider.addEventListener('input', function() {
            output.textContent = this.value;
            tooltip.textContent = this.value;
            tooltip.style.left = `${(this.value - this.min) / (this.max - this.min) * 100}%`;
        });

        // Initial Tooltip Position
        tooltip.style.left = `${(slider.value - slider.min) / (slider.max - slider.min) * 100}%`;
    });

    // Advanced Conditional Question Logic (Checkboxes)
    const checkboxes = document.querySelectorAll('input[type="checkbox"][data-conditional]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const conditionalId = this.getAttribute('data-conditional');
            const conditionalElement = document.getElementById(conditionalId);
            if (conditionalElement) {
                if (this.checked) {
                    conditionalElement.style.display = 'block';
                } else {
                    let anyOtherChecked = false;
                    checkboxes.forEach(cb => {
                        if (cb.getAttribute('data-conditional') === conditionalId && cb.checked) {
                            anyOtherChecked = true;
                        }
                    });

                    if (!anyOtherChecked) {
                        conditionalElement.style.display = 'none';
                    }
                }
            }
        });
        //Initial check
        const conditionalId = checkbox.getAttribute('data-conditional');
        const conditionalElement = document.getElementById(conditionalId);
        if(conditionalElement){
            if (checkbox.checked) {
                conditionalElement.style.display = 'block';
            } else {
                let anyOtherChecked = false;
                checkboxes.forEach(cb => {
                    if (cb.getAttribute('data-conditional') === conditionalId && cb.checked) {
                        anyOtherChecked = true;
                    }
                });

                if (!anyOtherChecked) {
                    conditionalElement.style.display = 'none';
                }
            }
        }
    });

    // Dynamic Form Validation with Error Messages
    const form = document.getElementById('feedbackForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(message => message.remove()); // Clear previous errors

            const emailInput = document.querySelector('input[type="email"][name="email"]');
            if (emailInput && document.querySelector('input[type="checkbox"][name="follow_up_needed"]') && document.querySelector('input[type="checkbox"][name="follow_up_needed"]').checked && !emailInput.value) {
                isValid = false;
                event.preventDefault();
                showError(emailInput, 'Please provide your email for follow-up.');
            }

            // Example: Check for required fields
            const requiredFields = document.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value) {
                    isValid = false;
                    event.preventDefault();
                    showError(field, 'This field is required.');
                }
            });

            if (!isValid) {
                event.preventDefault();
            }
        });

        function showError(element, message) {
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('error-message');
            errorDiv.textContent = message;
            element.parentElement.appendChild(errorDiv);
        }
    }

    // Conditional Questions (Select Elements) with Data Attributes
    const selectElements = document.querySelectorAll('select[data-conditional]');
    selectElements.forEach(select => {
        select.addEventListener('change', function() {
            const conditionalId = this.getAttribute('data-conditional');
            const conditionalElement = document.getElementById(conditionalId);
            if (conditionalElement) {
                if (this.value === this.getAttribute('data-show-if')) {
                    conditionalElement.style.display = 'block';
                } else {
                    conditionalElement.style.display = 'none';
                }
            }
        });
        //Initial check
        const conditionalId = select.getAttribute('data-conditional');
        const conditionalElement = document.getElementById(conditionalId);
        if (conditionalElement) {
            if (select.value === select.getAttribute('data-show-if')) {
                conditionalElement.style.display = 'block';
            } else {
                conditionalElement.style.display = 'none';
            }
        }
    });

    // Conditional Questions (Radio Buttons) with Data Attributes
    const radioGroups = document.querySelectorAll('input[type="radio"][data-conditional]');
    radioGroups.forEach(radio => {
        radio.addEventListener('change', function() {
            const conditionalId = this.getAttribute('data-conditional');
            const conditionalElement = document.getElementById(conditionalId);
            if (conditionalElement) {
                if (this.value === this.getAttribute('data-show-if')) {
                    conditionalElement.style.display = 'block';
                } else {
                    conditionalElement.style.display = 'none';
                }
            }
        });
        //Initial check
        if(radio.checked){
            const conditionalId = radio.getAttribute('data-conditional');
            const conditionalElement = document.getElementById(conditionalId);
            if (conditionalElement) {
                if (radio.value === radio.getAttribute('data-show-if')) {
                    conditionalElement.style.display = 'block';
                } else {
                    conditionalElement.style.display = 'none';
                }
            }
        }
    });

    // Example of a function to add dynamic content (e.g., loading states)
    function showLoading(element) {
        element.innerHTML = '<div class="loading">Loading...</div>';
    }

    function hideLoading(element, content) {
        element.innerHTML = content;
    }
})