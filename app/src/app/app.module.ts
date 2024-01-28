import { NgModule } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { PokeapiService } from './services/pokeapi.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [RouterModule, BrowserModule, HttpClientModule],
  providers: [provideRouter(routes), PokeapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
