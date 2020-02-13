import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  arr: Array<any> = [] as Array<JSON>;
  blnValidation: boolean;
  vista: boolean;
  strError: string;
  // tslint:disable-next-line: max-line-length
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  constructor(public alertController: AlertController) {}

  async presentAlert(user: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: `Se añadio el contacto ${user}`,
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: this.strError,
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertConfirmation(user: string, posicion: number) {
    // console.log(user);
    const alert = await this.alertController.create({
      header: 'Eliminar usuario',
      inputs: [
        {
          name: 'usuario',
          type: 'text',
          value: user
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.removeUser(posicion);
          }
        }
      ]
    });

    await alert.present();
  }

  addUser(name: string, phone: string, email: string, notes: string) {

    // Validaciones
    this.strError = '';
    this.blnValidation = false;
    (name) ? this.error() : this.error('Error: Nombre vacio favor de llenar el campo.');
    // tslint:disable-next-line: max-line-length
    (phone) ? (phone.length === 10) ? this.error() : this.error('Error: El telefono debe contener 10 caracteres') : this.error('Error: Telefono vacio favor de llenar el campo.');
    // tslint:disable-next-line: max-line-length
    (email) ? (this.regexp.test(email)) ? this.error() : this.error('Error: Correo Invalido.') : this.error('Error: Correo vacio favor de llenar el campo.');
    (notes) ? this.error() : this.error('Error: Notas vacias favor de llenar el campo.');

    // Fin de las validaciones

    if (!this.blnValidation) {
      const json: any = {
        name,
        phone,
        email,
        notes
      };
      this.presentAlert(name);
      this.arr.push(json);
      // console.log(this.arr);
    } else {
      this.alertError();
    }
  }

  removeUser(posicion: number) {
    if (posicion !== 0) {
      this.arr.splice(posicion, posicion);
    } else {
      this.arr.splice(0, 1);
    }
  }

  error(msg?: string) {
    if (msg) {
      // console.log(msg);
      this.strError += msg + '<br>' + '<br>' ;
      this.blnValidation = true;
    } else if (this.blnValidation) {
      this.blnValidation = true;
    } else {
      this.blnValidation = false;
    }
  }
}
