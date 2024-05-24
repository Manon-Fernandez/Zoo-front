export class Animal {

  private _id : number;

  private _prenom : string;

  private _race : string;

  private _image_animal : string;

  constructor(data : any) {
    this._id = data.id ? data.id : null;
    this._prenom = data.prenom ? data.prenom : '';
    this._race = data.race ? data.race : '';
    this._image_animal  = data.image_animal ? data.image_animal : null;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get prenom(): string {
    return this._prenom;
  }

  set prenom(value: string) {
    this._prenom = value;
  }

  get race(): string {
    return this._race;
  }

  set race(value: string) {
    this._race = value;
  }

  get image_animal(): string {
    return this._image_animal;
  }

  set image_animal(value: string) {
    this._image_animal = value;
  }

  serialize() {
    return {
      id: this.id,
      prenom: this.prenom,
      race: this.race,
      image_animal: this.image_animal,
    }
  }
}
