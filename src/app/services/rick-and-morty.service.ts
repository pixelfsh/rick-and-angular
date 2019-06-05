import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Character, Location, Episode } from "../components/shared/models";

@Injectable()
export class RickAndMortyService {
	constructor(private http: HttpClient) {}

	locationSubject = new Subject<Location[]>();
	characterSubject = new Subject<Character[]>();
	episodeSubject = new Subject<Episode[] | Episode>();

	private shortenCharacterURLAmount = 42;
	private selectedLocationId: number;
	private locations: Location[] = [];
	private characters: Character[] = [];

	extractResidentIdsBySelectedLocation(): string[] {
		return this.getSelectedLocation().residents.map(resident => resident.substr(this.shortenCharacterURLAmount));
	}

	getSelectedLocation(): Location {
		return this.locations[this.selectedLocationId-1];
	}

	setSelectedLocationId(locationId: number) {
		this.selectedLocationId = locationId;
	}

	getLocations(): Location[] {
		return this.locations.slice();
	}

	getCharactersBySelectedLocation(): Character[] {
		if (!this.getSelectedLocation()) {
			return [];
		}

		const ids = this.extractResidentIdsBySelectedLocation();
		const uncachedIds = ids.map(id => (this.characters[id] ? null : id)).filter(id => !!id);

		if (uncachedIds.length === 0) {
			return this.sliceSelectedLocationCharacters();
		}

		this.fetchCharacters(uncachedIds);
	}

	sliceSelectedLocationCharacters(): Character[] {
		const ids = this.extractResidentIdsBySelectedLocation();
		return ids.map(id => this.characters[id]);
	}

	getCharacter(id: number): Character {
		return { ...this.characters[id] };
	}

	fetchCharacters(characterIds: string[]) {
		this.http
			.get(`https://rickandmortyapi.com/api/character/[${characterIds.join(",")}]`)
			.subscribe((characters: Character[]) => {
				characters.forEach(char => this.cacheCharacter(char));
				this.characterSubject.next(this.sliceSelectedLocationCharacters());
			});
	}

	cacheCharacter(char: Character) {
		if (!this.characters[char.id]) {
			this.characters[char.id] = char;
		}
	}

	fetchLocations() {
		this.http.get("https://rickandmortyapi.com/api/location/").subscribe(response => {
			if (response["results"]) {
				this.locations = response["results"];
				this.locationSubject.next(this.getLocations());
			}
		});
	}

	fetchEpisodes(episodeIds: string[]) {
		this.http
			.get(`https://rickandmortyapi.com/api/episode/${episodeIds.join(",")}`)
			.subscribe((episodes: Episode[] | Episode) => {
				this.episodeSubject.next(episodes);
			});
	}
}