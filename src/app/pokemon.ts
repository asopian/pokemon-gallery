export class Pokemon {
  url: string;
  name: string;
  id: number;

  constructor(url: string, name: string, id: number) {
    this.url = url;
    this.name = name;
    this.id = id;
  }
}
