export default class Storage {
  constructor(key) {
    this.key = key;
    this.data = null;
  }

  read() {
    const value = localStorage.getItem(this.key);

    if (this.isValidJson(value)) {
      this.data = JSON.parse(value);
    }
  }

  write() {
    if (this.data !== null) {
      localStorage.setItem(this.key, JSON.stringify(this.data));
    }
  }

  isValidJson (value) {
    try {
      JSON.parse(value);
      return true;
    } catch (e) {
      return false;
    }
  }
}