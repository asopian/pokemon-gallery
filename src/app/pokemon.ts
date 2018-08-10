export class Pokemon {
  url: string;
  name: string;
  id: number;

  // Capture the last digits of URL as Pokemon ID
  private idFromUrlPattern: RegExp = /^.*\/(\d+)\/$/ ;

  /*
  constructor(url: string, name: string, id: number) {
    this.url = url;
    this.name = name;
    this.id = id;
  }
  */

  constructor(url: string, name: string) {
    this.url = url;
    this.name = name;
    var parsedValue = url.replace(this.idFromUrlPattern, "$1");
    this.id = parseInt(parsedValue);
  }
}
