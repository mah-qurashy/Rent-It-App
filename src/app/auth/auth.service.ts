import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { NavController } from '@ionic/angular'
import firebase from 'firebase/app'

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	constructor(public auth: AngularFireAuth, private navController: NavController) {


  }
	async login(email: string, password: string) {
    try{
		let user = await this.auth
      .signInWithEmailAndPassword(email, password)
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

    }catch(e){
      console.log(e)
      throw new Error()
    }

  }
  async getUserId(){
    return (await this.auth.currentUser).uid
}
}
