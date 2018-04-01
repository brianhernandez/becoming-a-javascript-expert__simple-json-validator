var fileUploadElement = document.getElementById('fileUpload');
var textSubmitElement = document.getElementById('textSubmit');

console.log("json-validator.js file has loaded.");

fileUploadElement.addEventListener('change', function(event) {
  var file = this.files[0].name;
  // var default = this.attr("placeholder");
  console.log(this.parentNode.firstChild);
  this.parentNode.firstChild.innerHTML = file;
});

textSubmitElement.addEventListener('click', function(event) {
  var textareaValue = document.getElementById('textarea').value;
  // var textareaValueSplit = textareaValue.split(/\n/g);
  var textareaValueSplitArray = document.getElementById('textarea').value.trim().split(/\n/g);
  var resultsTabElement = document.getElementsByClassName('evo_c-markup__item');
  var codeResultContainer = document.createElement("div");
  var preFormattedTextElement = document.createElement("pre");
  // var preFormattedResultsMessageElement = document.createElement("pre");
  var codeElement = document.createElement("code");
  var resultsMessageElement = document.createElement("p");
  var invalidJSONMessage = "";
  var validJSONMessage = "Your JSON code is valid.";

  resultsMessageElement.className = "codeResults__paragraph";
  codeResultContainer.className = "codeResults__code";
  codeElement.innerHTML = textareaValue;
  preFormattedTextElement.appendChild(codeElement);
  codeResultContainer.appendChild(preFormattedTextElement);

  event.preventDefault();


  // console.log(textareaValue);
  // console.log(textareaValueSplit);
  console.log(textareaValueSplitArray);



  for (var i = 0; i < textareaValueSplitArray.length; i++) {
    // console.log('textareaValueSplitArray length equals: ' + textareaValueSplitArray.length);
    var beginJSONPattern = /^{{1}?/g;
    var endJSONPattern = /^}{1}?/g;
    var lastKeyValueJSONPattern = /\s*"[\w-$]+":\s{1}"[\w\s,]+"/g;
    var notLastKeyValueJSONPattern = /\s*"[\w-$]+":\s{1}"[\w\s,]+",/g;



    if (i === 0) {
      console.log(textareaValueSplitArray[i]);
      console.log(typeof(textareaValueSplitArray[i]));
      // console.log('i is at the beginning at: ' + i);
      if (!textareaValueSplitArray[i].match(beginJSONPattern)) {
        invalidJSONMessage += "Code inputted is invalid at line 1.\n";
        // console.log("Code inputted is invalid at line 1.");
      }
    } else if (i === textareaValueSplitArray.length - 1) {
      if (!textareaValueSplitArray[i].match(endJSONPattern)) {
        invalidJSONMessage += "Code inputted is invalid at last line.\n";
        // console.log("Code inputted is invalid at last line.");
      }
      // console.log('i is at the ends at: ' + i);

    } else if (i === textareaValueSplitArray.length - 2) {
      if (!textareaValueSplitArray[i].match(lastKeyValueJSONPattern)) {
        invalidJSONMessage += "Code inputted is invalid at line " + (i + 1) + ".\n";
        // console.log("Code inputted is invalid at line " + i + ".");
      }
      // console.log('i is at the second to the last line at: ' + i);

    } else if ( i >= 1 && i <= textareaValueSplitArray.length) {
      if (!textareaValueSplitArray[i].match(notLastKeyValueJSONPattern)) {
        invalidJSONMessage += "Code inputted is invalid at line " + (i + 1) + ".\n";
        // console.log("Code inputted is invalid at line " + i + ".");
      }
      // console.log(' is iN THE MIDDLE at: ' + i);
    }
  }
  console.log(invalidJSONMessage);

  if (invalidJSONMessage === "") {
    resultsMessageElement.classList.add("codeResults__paragraph--valid");
    resultsMessageElement.innerText = validJSONMessage;
    // preFormattedResultsMessageElement.appendChild(resultsMessageElement);
  } else {
    resultsMessageElement.classList.add("codeResults__paragraph--invalid");
    resultsMessageElement.innerText = invalidJSONMessage;
    // preFormattedResultsMessageElement.appendChild(resultsMessageElement);
  }
  // console.log(preFormattedResultsMessageElement);
  // console.log(resultsTabElement[2]);
  console.log(document.getElementsByClassName('evo_c-markup__content')[2]);
  // document.getElementsByClassName('evo_c-markup__content')[2].removeChild("p");
  document.getElementsByClassName('evo_c-markup__content')[2].innerHTML = "";
  document.getElementsByClassName('evo_c-markup__content')[2].appendChild(codeResultContainer);
  document.getElementsByClassName('evo_c-markup__content')[2].appendChild(resultsMessageElement);

  document.getElementsByClassName('evo_c-markup__item')[2].click();

  console.log(codeResultContainer);



});
