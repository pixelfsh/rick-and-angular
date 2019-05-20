import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./components/app.component";
import { CharacterListComponent } from "./components/characters/character-list/character-list.component";
import { LocationListComponent } from "./components/locations/location-list/location-list.component";
import { HeaderComponent } from "./components/shared/header/header.component";
import { RickAndMortyService } from "./services/rick-and-morty.service";
import { LocationItemComponent } from "./components/locations/location-item/location-item.component";
import { CharacterInfoComponent } from "./components/characters/character-info/character-info.component";
import { CharacterPortraitComponent } from "./components/characters/character-portrait/character-portrait.component";

@NgModule({
	declarations: [
		AppComponent,
		CharacterListComponent,
		LocationListComponent,
		HeaderComponent,
		LocationItemComponent,
		CharacterInfoComponent,
		CharacterPortraitComponent
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule],
	providers: [RickAndMortyService],
	bootstrap: [AppComponent]
})
export class AppModule {}
