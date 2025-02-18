function makeSure(x) 
{
    let confirmation;
    const phoneInput = document.getElementById('phone').value;
    const phoneRegex = /^\d{10}$/;

    if (x == 1) 
    {
        if (!phoneRegex.test(phoneInput)) {
            alert("Please enter a valid phone number with exactly 10 digits.");
            return false;
        }
        confirmation = confirm("Are you sure you wish to submit?");
        if (confirmation == true) 
        {
            alert("Form submitted!");
            return true;
        } 
        else
            return false;

    }    
    if (x == 2) 
    {
        confirmation = confirm("Are you sure you wish to reset?");
        return true; // Allow reset
    }
}
