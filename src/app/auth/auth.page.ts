import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MenuController, Platform } from '@ionic/angular'
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
		private platform: Platform
	) {}

	ngOnInit() {}
	//hardware back button exits app on phones
	ionViewDidEnter() {
		this.exitSubcription = this.platform.backButton.subscribe(() => {
			navigator['app'].exitApp()
		})
	}
	ionViewWillLeave() {
		this.exitSubcription.unsubscribe()
	}

	onLogin() {
		this.authService.login()
		this.isLoading = true
		setTimeout(() => {
			//simulate login
			this.isLoading = false
			this.router.navigateByUrl('/places/tabs/discover')
			this.menuController.enable(true)
		}, 2000)
	}
}
