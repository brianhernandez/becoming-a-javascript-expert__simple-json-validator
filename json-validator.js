var fileUploadElement = document.getElementById('fileUpload');

console.log("json-validator.js file has loaded.");

fileUploadElement.addEventListener('change', function(event) {
  var file = this.files[0].name;
  // var default = this.attr("placeholder");
  console.log(this.parentNode.firstChild);
  this.parentNode.firstChild.innerHTML = file;
});

// $("[type=file]").on("change", function(){
//   // Name of file and placeholder
//   var file = this.files[0].name;
//   var dflt = $(this).attr("placeholder");
//   if($(this).val()!=""){
//     $(this).next().text(file);
//   } else {
//     $(this).next().text(dflt);
//   }
// });
