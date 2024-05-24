export class Contact {

  title: string;

  mail: string;

  description: string;

  constructor(data: any) {
    this.title = data.title;
    this.mail = data.mail;
    this.description = data.description;
  }

}
