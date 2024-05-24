export class Horaire {

  private _id: number;

  private _jour: string;

  private _heure_ouverture: string;

  private _heure_fermeture: string;

  constructor(data: any) {
    this._id = data.id ? data.id : null;
    this._jour = data.jour ? data.jour : null;
    this._heure_ouverture = data.heure_ouverture ? data.heure_ouverture : null;
    this._heure_fermeture = data.heure_fermeture ? data.heure_fermeture : null;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get jour(): string {
    return this._jour;
  }

  set jour(value: string) {
    this._jour = value;
  }

  get heure_ouverture(): string {
    return this._heure_ouverture;
  }

  set heure_ouverture(value: string) {
    this._heure_ouverture = value;
  }

  get heure_fermeture(): string {
    return this._heure_fermeture;
  }

  set heure_fermeture(value: string) {
    this._heure_fermeture = value;
  }

  serialize(){
    return {
      id : this._id,
      jour: this._jour,
      heure_ouverture: this._heure_ouverture,
      heure_fermeture: this._heure_fermeture
    }
  }

}

export enum Jour{
  LUNDI= 'Lundi',
  MARDI = 'Mardi',
  MERCREDI = 'Mercredi',
  JEUDI = 'Jeudi',
  VENDREDI = 'Vendredi',
  SAMEDI = 'Samedi',
  DIMANCHE = 'Dimanche',
  FERIE = 'Ferie'
}
