import { Component, OnInit, OnDestroy } from "@angular/core";
import { RickAndMortyService } from "src/app/services/rick-and-morty.service";
import { Location } from "../../shared/models";

@Component({
	selector: "app-location-list",
	templateUrl: "./location-list.component.html",
	styleUrls: ["./location-list.component.css"]
})
export class LocationListComponent implements OnInit, OnDestroy {
	constructor(private service: RickAndMortyService) {}

	locations: Location[] = [];

	private locationsSubscription;

	ngOnInit() {
    this.initializeLocationData();
    this.subscribeToLocations();
	}

	private initializeLocationData() {
		const locations = this.service.getLocations();
		if (locations.length) {
			this.locations = locations;
		} else {
			this.service.fetchLocations();
		}
	}

	private subscribeToLocations() {
		this.locationsSubscription = this.service.locationSubject.subscribe((locations: Location[]) => {
			this.locations = locations;
		});
	}

	ngOnDestroy() {
		this.locationsSubscription.unsubscribe();
	}
}
