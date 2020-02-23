var el = x => document.getElementById(x);

function showPicker() {
  el("file-input").click();
}

function showPicked(input) {
  el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function(e) {
    el("image-picked").src = e.target.result;
    el("image-picked").className = "";
  };
  reader.readAsDataURL(input.files[0]);
}

function analyze() {
  var uploadFiles = el("file-input").files;
  if (uploadFiles.length !== 1) alert("Analiz için bir dosya seçiniz!!");

  el("analyze-button").innerHTML = "Analiz Ediliyor...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open(
    "POST",
    `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true
  );
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);
      if (response === "erdil") {
        el("result-label").innerHTML = `Karikatürist = Erdil Yaşaroğlu`;
      }
      if (response === "umut") {
        el("result-label").innerHTML = `Karikatürist = Umut Sarıkaya`;
      }
      if (response === "yiğit") {
        el("result-label").innerHTML = `Karikatürist = Yiğit Özgür`;
      }
    }
    el("analyze-button").innerHTML = "Analiz";
  };

  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
}
