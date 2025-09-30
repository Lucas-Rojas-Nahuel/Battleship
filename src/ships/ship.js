export class Ship {
  constructor(length) {
    this.length = length;
    this.damageReceived = 0;
    this.StateOfSinking = false;
  }

  hit() {
    if (this.damageReceived < this.length) {
      this.damageReceived++;
    }
  }

  isSunk() {
    if (this.damageReceived === this.length) {
      this.StateOfSinking = true;
      return true;
    }

    return false;
  }
}
