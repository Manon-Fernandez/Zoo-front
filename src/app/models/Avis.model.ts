export class Avis {

  private _id : number;

  private _commentaire : string;

  private _pseudo : string;

  private _status : Status

  constructor(data : any) {
    this._id = data.id ? data.id : null;
    this._commentaire = data.commentaire ? data.commentaire : null;
    this._pseudo = data.pseudo ? data.pseudo : null;
    this._status = data.status ? data.status : null;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get commentaire(): string {
    return this._commentaire;
  }

  set commentaire(value: string) {
    this._commentaire = value;
  }

  get pseudo(): string {
    return this._pseudo;
  }

  set pseudo(value: string) {
    this._pseudo = value;
  }

  get status(): Status {
    return this._status;
  }

  set status(value: Status) {
    this._status = value;
  }

  serialize() {
    return {
      id: this.id,
      commentaire: this.commentaire,
      pseudo: this.pseudo,
    }
  }
}

export enum Status {
  VALIDE,
  EN_ATTENTE,
  REJETE
}
