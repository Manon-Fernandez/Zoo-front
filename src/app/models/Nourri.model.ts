export class Nourri {

  private _id : number;

  private _date_nourriture : string;

  private _grammage_nourriture : number;

  constructor(data : any) {
    this._id =data.id ? data.id : null;
    this._date_nourriture = data.date_nourriture ? data.date_nourriture : null;
    this._grammage_nourriture = data.grammage_nourriture ? data.grammage_nourriture : null;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get date_nourriture(): string {
    return this._date_nourriture;
  }

  set date_nourriture(value: string) {
    this._date_nourriture = value;
  }

  get grammage_nourriture(): number {
    return this._grammage_nourriture;
  }

  set grammage_nourriture(value: number) {
    this._grammage_nourriture = value;
  }

  serialize(){
    return {
      id : this._id,
      date_nourriture : this._date_nourriture,
      grammage_nourriture : this._grammage_nourriture
    }
  }
}
