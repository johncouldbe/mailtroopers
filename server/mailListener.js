class Mail {
  constructor(){
    this.callback = null;
  }

  processMail(mail) {
    if(this.callback) {
      this.callback(mail);
    }
    else console.log("Callback method has not been set.");
  }

  arrived(callback) {
    this.callback = callback;
  }

}

exports.listen = new Mail();
