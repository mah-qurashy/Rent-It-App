import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertController, MenuController, Platform } from '@ionic/angular'
import { Subscription } from 'rxjs'
import { AuthService } from '../auth.service'

@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
	isLoading = false
	errorMsg= ""
	private exitSubcription: Subscription

	constructor(
		private authService: AuthService,
		private router: Router,
		private menuController: MenuController,
		private alertController: AlertController
	) {}

	ngOnInit() {
		this.menuController.enable(false)
	}
	//hardware back button exits app on phones
	ionViewDidEnter() {

	}
	ionViewWillLeave() {
	}

	onSignup() {
	}
	onSubmit(form: NgForm) {
			if (!form.valid) {
				return this.errorMsg= "Password must be at least 8 characters long."
			}
			this.errorMsg= ""
			const email = form.value.email
			const password = form.value.password
			this.isLoading = true
			this.authService.signup(email, password).then(() => {
				this.isLoading = false
				this.router.navigateByUrl('/places/tabs/discover')
				this.menuController.enable(true)
			}).catch(()=>{
				this.alertController.create({message:"Already a user",buttons:[{text:'Ok', role: 'ok'}]}).then(alert=>alert.present())
				this.isLoading = false
	
			})
	
		
		
	}
}
