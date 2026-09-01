import {Component} from '@angular/core';
import {ControlComponent, MapComponent, NavigationControlDirective} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'app-sighting-map',
  imports: [
    MapComponent,
    ControlComponent,
    NavigationControlDirective
  ],
  templateUrl: './sighting-map.html',
  styleUrl: './sighting-map.less',
})
export class SightingMap {

}
