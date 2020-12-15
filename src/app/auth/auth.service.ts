import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { NavController } from '@ionic/angular'
import firebase from 'firebase/app'

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _userId = 'abc'

	constructor(public auth: AngularFireAuth, private navController: NavController) {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        this._userId = user.uid

      } else {
      }
    });

  }
	async login(email: string, password: string) {
    try{
		let user = await this.auth
      .signInWithEmailAndPassword(email, password)
        this._userId = user.user.uid
    }catch(e){
      throw new Error()
    }
	}
	logout() {
    this.auth.signOut().then(()=>{
    })
	}
	async signup(email: string, password: string) {
    try{
      console.log('here')
		let user = await this.auth
      .createUserWithEmailAndPassword(email, password)
      this._userId = user.user.uid

    }catch(e){
      console.log(e)
      throw new Error()
    }

	}
	get userId() {
		return this._userId
	}
}
