// Manages the input file
function handleFile(f, callBack) {
  var reader = new FileReader();

  reader.onload = (function() {
    return function(e) {
      callBack && callBack(e.target.result);
    };
  })(f[0]);
  // Read in the image file as a data URL
  reader.readAsDataURL(f[0]);
}

function listenForCameraChange(elemId, callBack) {
  var input = document.getElementById(elemId);
  // Detects file input
  input.addEventListener('change', function() {
    if (input.value !== "") {
      handleFile(input.files, callBack);
    }
  });
}