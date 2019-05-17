import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { Character, Location } from '../components/shared/models';

@Injectable()
export class RickAndMortyService {

	constructor(private http: HttpClient) {}

	locationSubject = new Subject<Location[]>();
	charactersSubject = new Subject();

	private locations: Location[] = [];
	private characters: Character[] = [];
	private episodes = [];

	getLocations() {
		return this.locations.slice();
	}

	fetchCharacters(characterIds: string[] ) {
		this.http.get(`https://rickandmortyapi.com/api/character/[${characterIds.join(',')}]`)
			.subscribe((response: Character[]) => {
				console.log('characters fetched:', response);
				this.characters = response;

			});
	}

	fetchLocations() {		
		this.http.get("https://rickandmortyapi.com/api/location/")
			.subscribe(response => {
				if (response['results']) {
					this.locations = response['results'];
					this.locationSubject.next(this.locations);
					console.log('locations fetched: ', this.locations)
				}
			});
	}
}