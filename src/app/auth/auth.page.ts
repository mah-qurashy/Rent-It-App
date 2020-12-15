import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertController, MenuController, Platform } from '@ionic/angular'
import { ok } from 'assert'
import { Subscription } from 'rxjs'
import { AuthService } from './auth.service'

@Component({
	selector: 'app-auth',
	templateUrl: './auth.page.html',
	styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
	isLoading = false
	private exitSubcription: Subscription

	constructor(
		private authService: AuthService,
		private router: Router,
		private menuController: MenuController,
		private platform: Platform,
		private alertController: AlertController
	) {}

	ngOnInit() {
		this.menuController.enable(false)
	}
	//hardware back button exits app on phones
	ionViewDidEnter() {
		this.exitSubcription = this.platform.backButton.subscribe(() => {
			navigator['app'].exitApp()
		})
	}
	ionViewWillLeave() {
		this.exitSubcription.unsubscribe()
	}

	onLogin() {}
	onSubmit(form: NgForm) {
		if (!form.valid) {
			return
		}
		const email = form.value.email
		const password = form.value.password
		this.isLoading = true
		this.authService.login(email, password).then(() => {
			this.isLoading = false
			this.router.navigateByUrl('/places/tabs/discover')
			this.menuController.enable(true)
		}).catch(()=>{
			this.alertController.create({message:"Invalid E-mail or password",buttons:[{text:'Ok', role: 'ok'}]}).then(alert=>alert.present())
			this.isLoading = false

		})

	}
}
