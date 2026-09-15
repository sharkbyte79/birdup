import {ChangeDetectionStrategy, Component, computed, input, model, signal} from '@angular/core';
import {
  ControlComponent,
  GeoJSONSourceComponent,
  LayerComponent,
  MapComponent,
  MarkerComponent,
  NavigationControlDirective, PopupComponent
} from '@maplibre/ngx-maplibre-gl';
import {LngLat, MapLayerMouseEvent, Marker} from 'maplibre-gl';
import {TuiGroup, TuiIcon, TuiTextfield} from '@taiga-ui/core';
import {FormsModule} from '@angular/forms';
import Sighting from '../../services/sighting.models';
import {FeatureCollection, GeoJsonProperties, Point} from 'geojson';
import {FieldTree} from '@angular/forms/signals';

@Component({
  selector: 'app-sighting-map',
  imports: [
    MapComponent,
    MarkerComponent,
    ControlComponent,
    NavigationControlDirective,
    TuiGroup,
    TuiTextfield,
    TuiIcon,
    FormsModule,
    GeoJSONSourceComponent,
    LayerComponent,
    PopupComponent
  ],
  templateUrl: './sighting-map.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './sighting-map.less',
})
export class SightingMap {
  protected readonly mapTilesUrl: string = "https://tiles.openfreemap.org/styles/fiord";

  protected readonly mapCenter: number[] = [-74.5, 40];

  readonly sightings = input<Sighting[]>([]);
  readonly coordinates = model.required<FieldTree<string>>();

  readonly selectedElement = signal<GeoJsonProperties | null>(null);
  readonly selectedLngLat = signal<LngLat | undefined>(undefined);

  // Compute a new geojson set every time the sightings update
  protected readonly sightingsCollection = computed<FeatureCollection<Point>>(() => ({
    type: "FeatureCollection",
    features: this.sightings().map((sighting) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [sighting.lng, sighting.lat]
      },
      properties: {
        ...sighting
      }
    }))
  }));

  onDragEnd(marker: Marker) {
    // this is ugly but oh well
    this.coordinates()().value.set(marker.getLngLat().toArray().toString());
  }

  onMouseOver(event: MapLayerMouseEvent): void {
    this.selectedLngLat.set(event.lngLat);
    this.selectedElement.set(event.features[0].properties);
    console.log(this.selectedElement());
  }

  onMouseLeave(): void {
    this.selectedLngLat.set(undefined);
    this.selectedElement.set(null);
  }
}

