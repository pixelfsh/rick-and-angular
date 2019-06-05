import { Component, Input } from '@angular/core';
import { Character } from '../../shared/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-portrait',
  templateUrl: './character-portrait.component.html',
  styleUrls: ['./character-portrait.component.css']
})
export class CharacterPortraitComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }
  
  @Input() character: Character;
  
  onSelectCharacter() {
    this.router.navigate([this.character.id], {relativeTo: this.route});
  }
}
