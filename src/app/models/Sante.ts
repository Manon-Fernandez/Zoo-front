export class Sante {

  private _id : number;

  private _etat_animal : string;

  private _nourriture : string;

  private _grammage : number;

  private _date_passage : string;

  constructor(data : any) {
    this._id = data.id ? data.id : null;
    this._etat_animal  = data.etat_animal ? data.etat_animal : null;
    this._nourriture  = data.nourriture ? data.nourriture : null;
    this._grammage = data.grammage ? data.grammage : null;
    this._date_passage = data.date_passage ? data.date_passage : null;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get etat_animal(): string {
    return this._etat_animal;
  }

  set etat_animal(value: string) {
    this._etat_animal = value;
  }

  get nourriture(): string {
    return this._nourriture;
  }

  set nourriture(value: string) {
    this._nourriture = value;
  }

  get grammage(): number {
    return this._grammage;
  }

  set grammage(value: number) {
    this._grammage = value;
  }

  get date_passage(): string {
    return this._date_passage;
  }

  set date_passage(value: string) {
    this._date_passage = value;
  }

  serialize() {
    return {
      id: this.id,
      etat_animal: this.etat_animal,
      nourriture: this.nourriture,
      grammage: this.grammage,
      date_passage: this.date_passage,
    }
  }

}
