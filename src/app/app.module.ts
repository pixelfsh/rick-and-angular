import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./components/app.component";
import { CharacterListComponent } from "./components/characters/character-list/character-list.component";
import { LocationListComponent } from "./components/locations/location-list/location-list.component";
import { EpisodeListComponent } from "./components/episodes/episode-list/episode-list.component";
import { HeaderComponent } from "./components/shared/header/header.component";
import { RickAndMortyService } from "./services/rick-and-morty.service";
import { LocationItemComponent } from "./components/locations/location-item/location-item.component";

@NgModule({
	declarations: [
		AppComponent,
		CharacterListComponent,
		LocationListComponent,
		EpisodeListComponent,
		HeaderComponent,
		LocationItemComponent
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
	providers: [RickAndMortyService],
	bootstrap: [AppComponent]
})
export class AppModule {}
