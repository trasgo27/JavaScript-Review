// Function declaration for getOptions
function getOptions()
{
    // Getting reference to the select element with id 'mySelect'
    var x=document.getElementById("mySelect");
    // Initializing text variable to hold the message
    var txt1 = "No. of items : ";
    var i;
    // Getting the length of the select element
    l=document.getElementById("mySelect").length;  
    // Concatenating the length of the select element to the message
    txt1 = txt1+l;
    // Looping through each option in the select element
    for (i=0;i<x.length;i++)
    {
        // Concatenating each option's text to the message with a newline character
        txt1 = txt1 + "\n" + x.options[i].text;
    }
    // Displaying the message in an alert dialog
    alert(txt1);
}
