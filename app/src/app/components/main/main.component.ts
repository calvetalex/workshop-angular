import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnDestroy {
  private _subscriptions: Subscription[] = [];
  public pokemonList: any[] = [];
  
  constructor(private _pokeapi: PokeapiService) {
    this._subscriptions.push(this._pokeapi.getFirstGenerationList().subscribe({
      next: res => {
        this.pokemonList = [...res.results];
      },
      error: console.error,
      complete: console.log
    }));
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }
}
