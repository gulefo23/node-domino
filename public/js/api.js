class Api {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  get(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', this.endpoint + "/" + url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
      console.log('readyState = ' + this.readyState);
      console.log('status = ' + this.status);
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.stringify(this.responseText);
        console.log(response);
        callback(response);
      } else {
        console.log('error:');
        console.log('readyState = ' + this.readyState);
        console.log('status = ' + this.status);
      }
      
    };
    xhr.send();
  }

  post(url, callback, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', this.endpoint + "/" + url, true);
    xhr.setRequestHeader('data', JSON.stringify(data));
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
