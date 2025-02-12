function makeSure(x)
{
    let confirmation;
    if (x == 1)
    {
        confirmation = confirm("Are you sure you wish to submit?");
        if (confirmation == true)
            alert("Form submitted!");
    }    
    if (x == 2)
        confirmation = confirm("Are you sure you wish to reset?");
}
