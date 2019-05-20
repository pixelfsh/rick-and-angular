import { Component, OnInit, OnDestroy } from "@angular/core";
import { RickAndMortyService } from "src/app/services/rick-and-morty.service";
import { ActivatedRoute } from "@angular/router";
import { Character, Location } from "../../shared/models";

@Component({
	selector: "app-character-list",
	templateUrl: "./character-list.component.html",
	styleUrls: ["./character-list.component.css"]
})
export class CharacterListComponent implements OnInit, OnDestroy {
	characters: Character[] = [];

	private characterSubscription;
	private locationSubscription;

	constructor(private service: RickAndMortyService, private route: ActivatedRoute) {}

	ngOnInit() {
		this.subscribeToLocations();
		this.subscribeToCharacters();

		this.initializeLocationData();
		this.initializeCharacterData();
	}

	private initializeLocationData() {
		const locations = this.service.getLocations();
		if (!locations.length) {
			this.service.fetchLocations();
		}
	}

	private initializeCharacterData() {
		const locationId = this.route.snapshot.paramMap.get('locationId');
		if (!!locationId) {
			const location = this.service.getLocation(+locationId);
			if (location) {
				const residentIds = this.extractResidents(location);
				this.service.fetchCharacters(residentIds);
			}
		}
	}

	private extractResidents(location: Location) {
		return location.residents.map(url => url.replace("https://rickandmortyapi.com/api/character/", ""));
	}

	private subscribeToLocations() {
		this.locationSubscription = this.service.locationSubject.subscribe(locations => {
			this.initializeCharacterData();
		});
	}

	private subscribeToCharacters() {
		this.characterSubscription = this.service.characterSubject.subscribe(characters => {
			this.characters = characters;
		});
	}

	ngOnDestroy() {
    this.characterSubscription.unsubscribe();
    this.locationSubscription.unsubscribe();
	}
}
