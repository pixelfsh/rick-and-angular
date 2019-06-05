import { Component, OnInit, OnDestroy } from "@angular/core";
import { RickAndMortyService } from "src/app/services/rick-and-morty.service";
import { Character } from "../../shared/models";

@Component({
	selector: "app-character-list",
	templateUrl: "./character-list.component.html",
	styleUrls: ["./character-list.component.css"]
})
export class CharacterListComponent implements OnInit, OnDestroy {
	constructor(private service: RickAndMortyService) {}
	
	characters: Character[] = [];

	private locationSubscription;
	private characterSubscription;

	ngOnInit() {
		this.subscribeToLocations();
		this.subscribeToCharacters();

		this.characters = this.service.getCharactersBySelectedLocation();
	}

	private subscribeToLocations() {
		this.locationSubscription = this.service.locationSubject.subscribe(() => {
			this.characters = this.service.getCharactersBySelectedLocation();
		});
	}

	private subscribeToCharacters() {
		this.characterSubscription = this.service.characterSubject.subscribe(characters => {
			this.characters = characters;
		});
	}

	ngOnDestroy() {
		this.locationSubscription.unsubscribe();
		this.characterSubscription.unsubscribe();
	}
}
