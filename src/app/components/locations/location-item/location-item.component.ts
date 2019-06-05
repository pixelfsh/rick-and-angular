import { Component, Input } from '@angular/core';
import { Location } from '../../shared/models';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: "app-location-item",
	templateUrl: "./location-item.component.html",
	styleUrls: ["./location-item.component.css"]
})
export class LocationItemComponent {
	constructor(private router: Router, private route: ActivatedRoute, private service: RickAndMortyService) {}

	@Input() location: Location;

	displayCharactersByLocation() {
		this.router.navigate([this.location.id, "characters"], { relativeTo: this.route });
	}
}
