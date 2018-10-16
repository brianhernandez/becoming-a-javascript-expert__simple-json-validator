'use strict';
// Obtain both file upload button and text submit button elements and save
// them to a variable
var fileUploadElement = document.getElementById('fileUpload');
var textSubmitElement = document.getElementById('textSubmit');

// Add an event listener to the file upload button...
fileUploadElement.addEventListener('change', function(event) {
  // Obtain the name of the file that fired the change event and save to a var
  var file = this.files[0].name;
  // Change the text of the file upload button to the name of the file choosen
  this.parentNode.firstChild.innerHTML = file;
});
// Add an event listener to the text submit button...
textSubmitElement.addEventListener('click', function(event) {
  // Get the textarea value and save to a variable
  var textareaValue = document.getElementById('textarea').value;
  // Trim the textarea value text then split into an array by carriage returns
  var textareaValueSplitArray = document.getElementById('textarea').value.trim().split(/\n/g);
  // Get a pointer to the results tab ul element
  var resultsTabElement = document.getElementsByClassName('evo_c-markup__item');
  // Create a div element to put the validator output in
  var codeResultContainer = document.createElement("div");
  // Create a pre element to put entered code in correct formatting in results
  var preFormattedTextElement = document.createElement("pre");
  // Create a code element to put entered code in an appropirate element for display
  var codeElement = document.createElement("code");
  // Create a p element to enter validator results message
  var resultsMessageElement = document.createElement("p");
  //  Initialize the invalid JSON message
  var invalidJSONMessage = "";
  // Initialize the valid JSON message
  var validJSONMessage = "Your JSON code is valid.";

  // Add class name to the p element for styling for validator results message
  resultsMessageElement.className = "codeResults__paragraph";
  // Add class name to div element for style for outputted code in results tab
  codeResultContainer.className = "codeResults__code";
  // Trim the code entered in the textarea field and set it as the inner text
  // of the created code element
  codeElement.innerHTML = textareaValue.trim();
  // Append the code element to the created pre element
  preFormattedTextElement.appendChild(codeElement);
  // Append the preformatted code block to the codeResultContainer div
  codeResultContainer.appendChild(preFormattedTextElement);
  // prevent the default action of the event handler
  event.preventDefault();

  // For each entry in the textareaValueSplitArray array...
  for (var i = 0; i < textareaValueSplitArray.length; i++) {
    // Set the beginning JSON match pattern
    var beginJSONPattern = /^{{1}/g;
    // Set the end JSON match pattern
    var endJSONPattern = /}{1}$/g;
    // Set the last JSON key value pair match pattern
    var lastKeyValueJSONPattern = /\s*"[\w-$]+":\s{1}"[\w\s,]+"/g;
    // Set every other JSON key value pair match patter not at the end
    var notLastKeyValueJSONPattern = /\s*"[\w-$]+":\s{1}"[\w\s,]+",/g;

    // If i is at the beginning of the entered code block...
    if (i === 0) {
      // ...if the beginning JSON pattern is NOT matched...
      if (!textareaValueSplitArray[i].match(beginJSONPattern)) {
        // ...add the first line error message to invalidJSONMessage variable...
        invalidJSONMessage += "Code inputted is invalid at line 1.\n";
      }
      // ...else if i is at the last line of the entered code block...
    } else if (i === textareaValueSplitArray.length - 1) {
      // ...if last line JSON pattern is NOT matched...
      if (!textareaValueSplitArray[i].match(endJSONPattern)) {
        // ...add the last line invalid error message to invalidJSONMessage
        invalidJSONMessage += "Code inputted is invalid at last line.\n";
      }
      // ...else if i is at the last key value pair line...
    } else if (i === textareaValueSplitArray.length - 2) {
      // ...if the last key value pair JSON pattern is NOT matched...
      if (!textareaValueSplitArray[i].match(lastKeyValueJSONPattern)) {
        // ...add the invalid error message with the appropriate line number in
        // the code
        invalidJSONMessage += "Code inputted is invalid at line " + (i + 1) + ".\n";
      }
      // ...else if i is neither at the end, or beginning of the code block...
    } else if ( i >= 1 && i <= textareaValueSplitArray.length) {
      // ...if the current i position in the array does NOT match the key value
      // pair JSON match pattern...
      if (!textareaValueSplitArray[i].match(notLastKeyValueJSONPattern)) {
        // ...add the invalid error message along with the appropriate human
        // readable line number
        invalidJSONMessage += "Code inputted is invalid at line " + (i + 1) + ".\n";
      }
    }
  }
  // If the invalidJSONMessage is empty...
  if (invalidJSONMessage === "") {
    // ...set the p resultsMessageElement to valid styling via a class
    resultsMessageElement.classList.add("codeResults__paragraph--valid");
    // JSON is valid, set the appropriate valid message to the p element
    resultsMessageElement.innerText = validJSONMessage;
    // ...else...
  } else {
    // ...set the p resultsMessageElement to invalid styling via a class
    resultsMessageElement.classList.add("codeResults__paragraph--invalid");
    // JSON is invalid, set the appropriate invalid message(s) to the p element
    resultsMessageElement.innerText = invalidJSONMessage;
  }
  // Get the contents of the results tab content area and set it to an empty string
  document.getElementsByClassName('evo_c-markup__content')[2].innerHTML = "";
  // Append the codeResultsContainer div and its formatted code content to the
  // results tab
  document.getElementsByClassName('evo_c-markup__content')[2].appendChild(codeResultContainer);
  // Append the resultsMessageElement p and its message contents to the results tab
  document.getElementsByClassName('evo_c-markup__content')[2].appendChild(resultsMessageElement);
  // Initiate a click event on the results tab to bring it in focus and its contents
  // visible
  document.getElementsByClassName('evo_c-markup__item')[2].click();
});
