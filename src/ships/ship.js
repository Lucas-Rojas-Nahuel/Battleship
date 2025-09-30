export class ship {
  constructor(length) {
    this.length = length;
    this.damageReceived = 0;
    this.StateOfSinking = false;
  }

  hit() {
    this.damageReceived++;
  }

  isSunk() {
    if (this.damageReceived >= this.length) {
      this.StateOfSinking = true;
      return true;
    }

    return false;
  }
}
