import { Component, OnInit, OnDestroy } from "@angular/core";
import { RickAndMortyService } from "../services/rick-and-morty.service";
import { Router, ActivationEnd } from "@angular/router";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
	constructor(private service: RickAndMortyService, private router: Router) {}

	private routerSubscription;

	ngOnInit() {
		this.service.fetchLocations();

		this.routerSubscription = this.router.events.subscribe(event => {
			if (event instanceof ActivationEnd) {
				const locationId = event.snapshot.paramMap.get("locationId");
				if (locationId) {
					this.service.setSelectedLocationId(+locationId);
				}
			}
		});
	}

	

	ngOnDestroy() {
		this.routerSubscription.unsubscribe();
	}
}
