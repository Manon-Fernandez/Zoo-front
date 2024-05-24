export class Image {

  private _id : number;

  private _galerieHabitat : string;

  constructor(data : any) {
    this._id = data.id ? data.id : null;
    this._galerieHabitat = data.galerieHabitat ? data.galerieHabitat : null;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get galerieHabitat(): string {
    return this._galerieHabitat;
  }

  set galerieHabitat(value: string) {
    this._galerieHabitat = value;
  }
}
