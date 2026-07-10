// Function declaration for insert_Row
function insert_Row()
{
    // Getting reference to the table with id 'sampleTable' and inserting a new row at index 0
    var x=document.getElementById('sampleTable').insertRow(0);
    // Inserting a new cell in the newly inserted row at index 0
    var y = x.insertCell(0);
    // Inserting a new cell in the newly inserted row at index 1
    var z = x.insertCell(1);
    // Setting inner HTML content of the first newly inserted cell
    y.innerHTML="New Cell1";
    // Setting inner HTML content of the second newly inserted cell
    z.innerHTML="New Cell2";
}
