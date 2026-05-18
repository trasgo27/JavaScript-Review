1. The Core Components
prompt(): This built-in function displays a dialog box with a message and an input field. It returns the text entered by the user, or null if the user clicks "Cancel".

while Loop: This allows the code to repeat as long as a specific condition remains true.

2. The Logic Flow
To meet your requirements, the loop must check for two "exit" conditions:

Cancel: The variable becomes null.

Empty Word: The variable becomes an empty string "".

3. Step-by-Step Implementation
Initialize a Variable: Create a variable to store the word the user types.

Start the Loop: Use a while loop. A common trick is to assign the prompt directly inside the loop condition.

Check for Content: Inside the loop, you can process the word (e.g., log it to the console).

Terminate: If the user hits "Cancel" or leaves it blank, the loop condition will evaluate to false and stop the popups.