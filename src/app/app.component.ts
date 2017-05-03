import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  	title = 'Module for mapping!';
    url = "app/geo";
    
    onLayerEvents(layer) {
        //do some stuff here...
        console.log(layer);
    }
}
