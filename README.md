# Angular Workshop

Summary

1. Install angular
2. Start a new Application
3. SPA - Single Page Application
    - create a component
    - routing
4. Dynamic data
5. Use an API

---

## Introduction

Welcome in this angular course. In the `./app` directory you will find an Angular application with all the basics setted up so you can already start to create your own application. 
Angular is using TypeScript to wrote your code. You can place all your logic in those files. The architecture will be in html and style will be wrote using SCSS.

You can find the documentation [here](https://angular.io/) and use some style library like [Primeng](https://primeng.org/) or [Angular Material](https://material.angular.io/).

---

## Intall Angular

### needs
First you need to intall :
- nodejs
- npm

### install

To install angular you can run the command `npm install -g @angular/cli`. 
You will now have access to the `ng` command, which is the angular CLI. You will be able to generate angular applications, angular components, angular services, start your application...

---

## Start a new application

To start a new application you will use the command `ng new application-name`. It will generate a new angular project with a fit repository.
To start your project you will need to go on the newly created repository and use `ng serve` (you can alse use `npm start`). The default port used by angular is 4200 but you can change that using _--port_ option with ng serve : `ng serve --port 4300`. You can also directly open your application with _--open_.

To update the application you will need to modify the files in _src/app_. 

---

## SPA - Single Page Application

A single page application is a web application that will load all your features on a single HTML page. This means that the browser will reload only the sections that has changed due to users actions instead of loading a new page every time.

### create a component
First, we need to create our component. To do that we will use `ng generate component main`. I suggest you to place all your components in the same folder, for example `ng generate component components/main`.
The folder generated looks like:

```
main/
|-> main.component.ts: contains your component, the logic
|-> main.component.scss: style that will be applied to your component
|-> main.component.html: html code, what the user will see
```

The .ts file contains a class that is decorated by Component decorator from Angular. It allows angular to know what type of element your are writing and how to use it. 

```ts
@Component({ // decorator
  selector: 'app-main', // name of your component to use in your application
  standalone: true, // allows your component to be independant from other angular modules
  imports: [], // modules that will be used by the component
  templateUrl: './main.component.html', // the .html file used to display your component
  styleUrl: './main.component.scss' // the .scss file used to style your component
})
export class MainComponent {}
```
You can also declare your component without the standalone method and include it inside your application module. In that case it will looks like:

```ts
// main.component.ts

@Component({ // decorator
  selector: 'app-main', // name of your component to use in your application
  templateUrl: './main.component.html', // the .html file used to display your component
  styleUrl: './main.component.scss' // the .scss file used to style your component
})
export class MainComponent {}

// app.module.ts

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';

@NgModule({ // declare an angular module
  declarations: [ // declare all your components here
    AppComponent,
    MainComponent
  ],
  imports: [], // all the library used by your application
  providers: [], // services that will be share inside your application
  bootstrap: [AppComponent]
})
export class AppModule { }
```
The benefit to use a standalone component is that you can reuse it in your application and include specific library for it without loading it in all your application.
You should still not use it if your components use the same libraries, because you will not need to import it everytime but a single time at the start of the application.

### routing
To create your SPA, we will change a bit the architecture of the app. You may have an `app.config.ts`, in that case you can replace it by `app.module.ts` and change the `main.ts` file in _src/app/main.ts_ by 

```ts 
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

and update your _src/app/app.module.ts_ by 
```ts
import { NgModule } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [RouterModule, BrowserModule],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

You can start your application to check that it's still loading.

In the case you have an app.module.ts just add the line `providers: [provideRouter(routes)],` in your file.

Now we can define our routes in the `app.routes.ts`. A route will be defined by a _path_, which is the location in your application (for example _localhost:4200/main_ is a route defined as _main_) and a _component_, which is the component to display when loading the route. You can also use _redirect_ to select an route and redirect it to another one.

```ts
// app.routes.ts
export const routes: Routes = [
    { path: 'main', component: MainComponent },
    // here we redirect all the routes to main, you can use this syntax to create a page not found
    { path: '**', redirectTo: 'main', pathMatch: 'full'}, 

];
```

You can remove all the code from `app.component.html` and replace it by `<router-outlet />` only. So all your displayed elements came from the components directly. But you can also keep some code in it to add a global overlay like a header, a sidebar...

---

## Dynamic data

To display data in Angular from your component you will use the syntaxe  `{{ }}`, for example:

```ts
// in .ts file
class myComponent {
    title = 'Hello World';
}

// in .html file
<h1>{{ title }}</h1>
```

Angular help you with a bunch of tools directly in the html file. For example you can decide to display or not an element using data from our ts file:
```html
<div *ngIf="myCondition"></div>
```

If you need to display a lot of elements that looks the same you can use a for loop in the html:
```html
<ul>
    <li *ngFor="let elem in elemArray">
        {{ elem }}
    </li>
</ul>
```

Angular allows you to use _pipes_ too. Those tools are used to format data directly in html. There are a lot of them but you will always write the same syntaxe : `yourData | pipe`. For example if we want to place a text in uppercase whatever we receive we can write:
```html
<p>{{ myStr | uppercase }}</p>
```

You can find them in the documentation [here](https://angular.io/guide/pipes)

### Advanced
Angular allows you to add elements without impacting the DOM, to do so you will need to use `ng-container` and `ng-template`.

`ng-container` will create a box that is not in the DOM, allowing you to load data at some places if you need it without having an empty div or span.

`ng-template` allows you to define a template that you will be able to reuse whenever you need it inside your html file.

```html
<!-- will display the title given by the ts file or the default title we defined in the html file -->
<ng-container *ngIf="title; else defaultTitle"> 
    {{ title }}
<ng-container>

<ng-template #defaultTitle>
    Hello World
</ng-template>
```

---

## Use an API

The final step to begin with Angular is to take a look at services. A service is a class that will have a decorator `Injectable`. This decorator allows you to use data from the class in another class. Using this you will be able to share data between your components, like for example to access data related to a user whenever you are in the application.

In this example we are going to call an API to retreive pokemon informations. As for components, you should group all your services inside the same folder, for example services. `ng generate service services/pokeapi`. The code will look like :

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  constructor() { }
}
```
The next step is to add our new service to the _app.module.ts_ file in providers so we can use it after:
```ts
  providers: [provideRouter(routes), PokeapiService],
```

Now we will add our data inside PokeapiService. All the variables inside a class are by default _public_ variable, so you can access them. If you need to use a variable only in this component, you can use the keyword _private_ so only your class methods will have access to it.

Angular added a way to make API calls, it's called [`HttpClient`](https://angular.io/api/common/http/HttpClient). To use it you will need to add it to your class.

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  constructor(private _http: HttpClient) { }
}
```
_HttpClient_ allows you to make API calls and type the data you will receive from it. The particularity is that instead of using asynchrone processes like NodeJS, you will use [_Observables_](https://angular.io/guide/observables-in-angular#http). An Observable is a type of data you can subscribe too to get an update when the data has changed.

```
// example of Observable behavior
Observable<T> => init, T is null
Api call => T is updated with the response
Observable<T> => trigger an update, sending the new value of T to all subscribed elements
```
If we want to get a list of pokemon, we will add an API call to our _PokeapiService_:

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  constructor(private _http: HttpClient) { }

  getFirstGenerationList(): Observable<any> {
    return this._http.get('https://pokeapi.co/api/v2/pokemon?limit=151');
  }
}
```

And then we can retreive it in our component:

```ts
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPokemonList } from 'src/app/models/pokemon-list.interface';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy {
  private _subscriptions: Subscription[] = []; // we create a private variable to store the subscription
  public pokemonList: IPokemonList = []; // we declare a list of pokemon
  
  constructor(private _pokeapi: PokeapiService) { // we declare our pokeapi service
    this._subscriptions.push(this._pokeapi.getFirstGenerationList().subscribe({ // we subscribe to our api call
      next: res => {
        this.pokemonList = [...res.results];
      }, // if it succeed, we add our response to our list
      error: console.error, // in case of error we print it in the console
      complete: console.log // we console the fact that the subscription has been done
    }));
  }

  ngOnDestroy() { // when the browser destroy the component
    this._subscriptions.forEach(sub => sub.unsubscribe()); // we clear our subscriptions to free memory 
  }
}
```
You can now update your .html file to display your list.

The most important fact is to free your subscription when you are done with it, so the browser does not load all of them and you do not impact the UX by slowing down your application. 