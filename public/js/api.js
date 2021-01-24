class Api {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  get(url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        callback(response);
      }
    };
    xhr.open('GET', this.endpoint + "/" + url);
    xhr.send();
  }

  post(url, callback, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', this.endpoint + "/" + url);
    xhr.setRequestHeader('hands', JSON.stringify(data));
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        callback(response);
      }
    };
    xhr.send(data);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.api = new Api("http://localhost:5000/api");
});
