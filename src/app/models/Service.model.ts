export class Service {

  private _id : number;

  private _nom : string;

  private _description : string;

  constructor(data : any) {
    this._id = data.id ? data.id : null;
    this._nom = data.nom ? data.nom : '';
    this._description = data.description ? data.description : '';
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  serialize() {
    return {
      id : this._id,
      nom : this._nom,
      description : this._description,
    }
  }
}
