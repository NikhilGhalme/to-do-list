import { Component, ElementRef, EventEmitter, Injector, OnInit, Output, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd } from "@angular/router";
import * as Notiflix from "notiflix";
import { BaseComponent } from "../../../shared/base-component.component";
import { Workspace } from "../../../shared/models/workspace";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { GlobalSearchService } from "../../../shared/services/global-search.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"]
})
export class HeaderComponent extends BaseComponent implements OnInit {
	@ViewChild('myModal') myModal : ElementRef;

	user: any;
	searchTerm: string;
	items: Array<any> = [];

	constructor(private injector: Injector, private authService: AuthService, private globalSearchService: GlobalSearchService) {
		super(injector);
		if (this.token) {
			this.authService.user().subscribe(response => {
				this.user = response;
			});
		}
	}

	ngOnInit(): void {
	}

	focusGlobalSearchInput() {
		const div = document.getElementById("global-search");
		setTimeout(() => {
			div ? div.getElementsByTagName("input")[0].focus() : "";
		}, 1000);
	}

	search() {
		if(this.searchTerm?.length > 1) {
		this.globalSearchService.search({searchText: this.searchTerm}).subscribe((data: any) => {
			console.log(data);
			this.items.length = 0;
			this.items.push(data);
			console.log(this.items, "Global Search Results");
		});
		}
	}

	logOut() {
		Notiflix.Report.failure("Log Out!", "Are you sure you want to log out", "Log out", () => {
			localStorage.removeItem("token");
			window.location.reload();
			this.router.navigate(["auth/login"]);
		}, {backOverlayClickToClose: true});

	}

	selectByGlobalSearch(workspace: Workspace) {
		this.router.navigate(["task/details"]);
		// this.router.events.subscribe(event => {
		// 	if (event instanceof NavigationEnd && event.url === '/task/details') {
				setTimeout(() => {
				this.globalSearchService.setSelectedCard(workspace);
				},	1000);
		// 	}
		// });
		const modalElement = this.myModal.nativeElement;
		modalElement.classList.remove('show');
		modalElement.style.display = 'none';
		modalElement.setAttribute('aria-modal', 'false');
		modalElement.setAttribute('aria-hidden', 'true');
		const modalBackdropElement = document.querySelector('.modal-backdrop');
		if(modalBackdropElement){
			modalBackdropElement.classList.remove('show');
			modalBackdropElement.setAttribute('style', 'display: none');
		}
	}

	protected readonly onfocus = onfocus;
}
