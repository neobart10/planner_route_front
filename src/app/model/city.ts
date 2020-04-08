export class City {
  constructor(public codigo: number, public descripcion: string) {
  }

  static fromJson(json): City {
    return new City(json.codigo, json.descripcion);
  }
}
