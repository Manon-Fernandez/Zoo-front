export class Utilisateur {

  id : number;

  email : string;

  role : Array<string>;

  accessToken : string;

  constructor(data : any) {
    this.id = data.id ? data.id : null;
    this.email = data.email ? data.email : null;
    this.role = data.role ? data.role : null;
    this.accessToken = data.accessToken ? data.accessToken : null;
  }

  isVeterinaire() : boolean{
    return this.email.includes("VETENAIRE"); // 1 ou -1
  }

  public serialize() {
    return {
      id: this.id,
      email: this.email,
      role: this.role,
      accessToken: this.accessToken,
    };
  }
}

export class UtilisateurAuthenticate {

  email : string;

  password : string;

  constructor(data : any) {
    this.email = data.email ? data.email : null;
    this.password  = data.password ? data.password : null;
  }

  public serialize() {
    return {
      email : this.email,
      password : this.password,
    };
  }
}

export class UtilisateurCreate {

  email : string;
  password : string;
  role : Array<string>;

  constructor(data : any) {
    this.email = data.email ? data.email : null;
    this.password  = data.password ? data.password : null;
    this.role = data.role ? data.role : null;
  }

  public serialize() {
    return {
      email : this.email,
      password : this.password,
      role : this.role,
    };
  }
}

export class UtilisateurDTO {

  id : number;

  email : string;

  constructor(data : any) {
    this.id = data.id ? data.id : null;
    this.email = data.email ? data.email : null;
  }

  public serialize() {
    return {
      id : this.id,
      email : this.email,
    };
  }
}
