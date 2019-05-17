import { Component, Input } from '@angular/core';
import { Location } from '../../shared/models';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.css']
})
export class LocationItemComponent {

  constructor(private service: RickAndMortyService) { }

  @Input() location: Location;

  displayCharacters() {
    console.log('selectingLocation', this.location);
    const residentIds = this.location.residents.map(url =>
		url.replace("https://rickandmortyapi.com/api/character/", ""));
    this.service.fetchCharacters(residentIds);
  }
}
