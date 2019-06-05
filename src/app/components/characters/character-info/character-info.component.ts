import { Component, OnInit, OnDestroy } from "@angular/core";
import { Character, Episode } from "../../shared/models";
import { ActivatedRoute } from "@angular/router";
import { RickAndMortyService } from "src/app/services/rick-and-morty.service";

@Component({
	selector: "app-character-info",
	templateUrl: "./character-info.component.html",
	styleUrls: ["./character-info.component.css"]
})
export class CharacterInfoComponent implements OnInit, OnDestroy {
	constructor(private route: ActivatedRoute, private service: RickAndMortyService) {}

	character: Character;
	episodes: Episode[];

	private locationSubscription;
	private characterSubscription;
	private episodeSubscription;

	ngOnInit() {
    this.subscribeToCharacters();
    this.subscribeToEpisodes();
		this.subscribeToLocations();
	}

	private subscribeToLocations() {
		this.locationSubscription = this.service.locationSubject.subscribe(() => {
			this.service.getCharactersBySelectedLocation();
		});
	}

	private subscribeToCharacters() {
		this.characterSubscription = this.service.characterSubject.subscribe(characters => {
			const characterId = this.route.snapshot.paramMap.get("characterId");
			this.character = characters.find(character => character.id === +characterId);
			this.service.fetchEpisodes(this.extractEpisodeIds());
		});
	}

	private subscribeToEpisodes() {
		this.episodeSubscription = this.service.episodeSubject.subscribe((episodes: Episode[] | Episode) => {
			if (episodes["id"]) {
				this.episodes = [<Episode>episodes];
				return;
			}
			this.episodes = <Episode[]>episodes;
		});
	}

	private extractEpisodeIds() {
		return this.character.episode.map(url => url.replace("https://rickandmortyapi.com/api/episode/", ""));
	}

	ngOnDestroy() {
		this.locationSubscription.unsubscribe();
		this.characterSubscription.unsubscribe();
		this.episodeSubscription.unsubscribe();
	}
}
