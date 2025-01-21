// Calculate "Pallets Processed" and "Cartons Processed"
document.getElementById('calculate-btn').addEventListener('click', () => {
    const palletsStart = parseFloat(document.getElementById('pallets-start').value) || 0;
    const palletsEnd = parseFloat(document.getElementById('pallets-end').value) || 0;
    const palletsDelivered = parseFloat(document.getElementById('pallets-delivered').value) || 0;

    // Calculate pallets processed
    const palletsProcessed = (palletsStart + palletsDelivered) - palletsEnd;
    document.getElementById('pallets-processed').value = palletsProcessed.toFixed(2);

    // Sync pallets processed with the CPH form
    const cphPalletsProcessedField = document.getElementById('cph-pallets-processed');
    if (cphPalletsProcessedField) {
        cphPalletsProcessedField.value = palletsProcessed.toFixed(2);
    }

    // Calculate cartons processed (assuming 25 cartons per pallet)
    const cartonsProcessed = palletsProcessed * 25;
    document.getElementById('cartons-processed').value = cartonsProcessed.toFixed(2);
});

// Calculate CPH (Cartons Processed Per Hour)
document.getElementById('calculate-cph-btn').addEventListener('click', () => {
    const palletsProcessed = parseFloat(document.getElementById('pallets-processed').value) || 0;
    const processingHours = parseFloat(document.getElementById('processing-hours').value) || 0;

    if (processingHours > 0) {
        // Calculate CPH (assuming 25 cartons per pallet)
        const cph = (palletsProcessed * 25) / processingHours;
        document.getElementById('cph-result').value = cph.toFixed(2);
    } else {
        alert('Please enter a valid number of processing hours.');
    }
});

// Calculate ZPH
document.getElementById('calculate-zph-btn').addEventListener('click', () => {
    const zRacksHung = parseFloat(document.getElementById('z-racks-pushed').value) || 0;
    const zphHours = parseFloat(document.getElementById('zph-hours').value) || 0;

    if (zphHours > 0) {
        const zph = zRacksHung / zphHours;
        document.getElementById('zph-result').value = zph.toFixed(2);
    } else {
        alert('Please enter a valid number of hours worked.');
    }
});

// Calculate ZFPH
document.getElementById('calculate-zfph-btn').addEventListener('click', () => {
    const zRacksFlowed = parseFloat(document.getElementById('z-racks-flowed').value) || 0;
    const zfphHours = parseFloat(document.getElementById('zfph-hours').value) || 0;

    if (zfphHours > 0) {
        const zfph = zRacksFlowed / zfphHours;
        document.getElementById('zfph-result').value = zfph.toFixed(2);
    } else {
        alert('Please enter a valid number of hours worked.');
    }
});

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM is ready");

    // Get the submit button and message div elements
    const submitButton = document.getElementById("submit-btn");
    const messageDiv = document.getElementById("message");
    const modal = document.getElementById("modal");
    const closeButton = document.getElementById("close-btn");

    // Add the click event listener to the submit button
    submitButton.addEventListener("click", function (event) {
        console.log("Button clicked");

        // Prevent the default form submission behavior
        event.preventDefault();

        // Parse input values
        const cph = parseFloat(document.getElementById("cph-result").value) || 0;
        const zph = parseFloat(document.getElementById("zph-result").value) || 0;
        const zfph = parseFloat(document.getElementById("zfph-result").value) || 0;
        const cphGoal = parseFloat(document.getElementById("cph-goal").value) || 0;
        const zphGoal = parseFloat(document.getElementById("zph-goal").value) || 0;
        const zfphGoal = parseFloat(document.getElementById("zfph-goal").value) || 0;
        const submitDate = parseFloat(document.getElementById("zfph-goal").value) || 0;

        // Get all form fields for validation
        const formFields = [
            cph, zph, zfph, cphGoal, zphGoal, zfphGoal, submitDate,
            document.getElementById("pallets-start").value,
            document.getElementById("pallets-end").value,
            document.getElementById("pallets-delivered").value,
            document.getElementById("processing-hours").value,
            document.getElementById("z-racks-pushed").value,
            document.getElementById("zph-hours").value,
            document.getElementById("z-racks-flowed").value,
            document.getElementById("zfph-hours").value,
            document.getElementById("submit-date").value
        ];

        // Check if all form fields are filled
        const allFieldsFilled = formFields.every(field => field !== "" && field !== null);

        // let unprocessedPalletSurvey = `Unprocessed Pallet Survey Data. \nCPH: ${cph} \nZPH: ${zph} \nCartons processed: ${palletsProcessed * 25} \nProcessing Hours: ${processingHours} \nRemaining Pallets: ${palletsEnd}`;
        let message = "";

        if (!allFieldsFilled) {
            message = "Please fill out all fields before submitting the form.";
        } else {
            console.log(`cph: ${cph}, zph: ${zph}, zfph: ${zfph}`);
            console.log(`cphGoal: ${cphGoal}, zphGoal: ${zphGoal}, zfphGoal: ${zfphGoal}`);

            // Check if goals are met and create appropriate message
            if (cph >= cphGoal && zph >= zphGoal && zfph >= zfphGoal) {
                message = "Congratulations! You've met all your goals!";
            } else {
                message = "Good work this week! Here's where you fell short: ";
                if (cph < cphGoal) message += `CPH is ${cphGoal - cph} below the goal. `;
                if (zph < zphGoal) message += `ZPH is ${zphGoal - zph} below the goal. `;
                if (zfph < zfphGoal) message += `ZFPH is ${zfphGoal - zfph} below the goal.`;
            }
        }

        // Display the message in the modal
        messageDiv.textContent = message;
        modal.style.display = "block"; // Show the modal

        // Optionally, add a success or error class for styling
        if (allFieldsFilled) {
            if (cph >= cphGoal && zph >= zphGoal && zfph >= zfphGoal) {
                messageDiv.className = 'success'; // Success message class
            } else {
                messageDiv.className = 'error'; // Error message class
            }
        } else {
            messageDiv.className = 'error'; // Error message class for incomplete fields
        }
    });

    // Add the click event listener to the close button
    closeButton.addEventListener("click", function () {
        modal.style.display = "none"; // Hide the modal when close button is clicked
    });

    // Close the modal when clicking anywhere outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Hide the modal when clicking outside the modal content
        }
    });
});

// DYNAMICALLY UPDATE DATA TABLE 