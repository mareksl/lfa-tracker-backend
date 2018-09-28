export class Fund {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  modify(data) {
    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        this[prop] = data[prop];
      }
    }
  }
}
