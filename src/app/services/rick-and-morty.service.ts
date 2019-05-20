import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { Character, Location, Episode } from '../components/shared/models';

@Injectable()
export class RickAndMortyService {

	constructor(private http: HttpClient) {}
	
	locationSubject = new Subject<Location[]>();
	characterSubject = new Subject<Character[]>();
	episodeSubject = new Subject<Episode[] | Episode>();
	
	private locations: Location[] = [];
	private characters: Character[] = [];

	getLocations(): Location[] {
		return this.locations.slice();
	}

	getLocation(id: number): Location {
		return this.locations.filter(location => location.id === id)[0];
	}

	getCharacters(): Character[] {
		return this.characters.slice();
	}

	getCharacter(id: number): Character {
		return this.characters.filter(character => character.id === id)[0];
	}

	fetchCharacters(characterIds: string[] ) {
		if (!characterIds.length) {
			this.characterSubject.next([]);
			return;
		}
		this.http.get(`https://rickandmortyapi.com/api/character/[${characterIds.join(',')}]`)
			.subscribe((characters: Character[]) => {
				this.characters = characters;
				this.characterSubject.next(this.getCharacters());
			});
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
		this.http.get(`https://rickandmortyapi.com/api/episode/${episodeIds.join(',')}`).subscribe((episodes: Episode[] | Episode) => {
			this.episodeSubject.next(episodes);
		})
	}
}