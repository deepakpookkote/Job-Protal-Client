export class UserAuth {
    constructor(
      public id: string,
      private token: string,
      private name: string,
      private email: string

    ) {}
    get tokenName() {
    //   if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
    //     return null;
    //   }
      return this.token;
    }
  }
