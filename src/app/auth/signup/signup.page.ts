import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { MenuController, Platform } from '@ionic/angular'
import { Subscription } from 'rxjs'
import { AuthService } from '../auth.service'

@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
	isLoading = false
	private exitSubcription: Subscription

	constructor(
		private authService: AuthService,
		private router: Router,
		private menuController: MenuController,
		private platform: Platform
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

	onSignup() {
		this.authService.login()
		this.isLoading = true
		setTimeout(() => {
			//simulate login
			this.isLoading = false
			this.router.navigateByUrl('/places/tabs/discover')
			this.menuController.enable(true)
		}, 2000)
	}
	onSubmit(form: NgForm) {}
}
