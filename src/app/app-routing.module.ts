import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationListComponent } from './components/locations/location-list/location-list.component';
import { CharacterListComponent } from './components/characters/character-list/character-list.component';
import { CharacterInfoComponent } from './components/characters/character-info/character-info.component';

const routes: Routes = [
	{ path: "locations", component: LocationListComponent },
	{ path: "locations/:locationId/characters", component: CharacterListComponent },
	{ path: "locations/:locationId/characters/:characterId", component: CharacterInfoComponent },
	{ path: "**", pathMatch: "full", redirectTo: "/locations" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
