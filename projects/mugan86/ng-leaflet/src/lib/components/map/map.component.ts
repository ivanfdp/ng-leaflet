import { AfterViewInit, Component, Input } from '@angular/core';
import { IConfigMap } from '../../models/config-map';
import { Controls } from '../../services/controls';
import { Markers } from '../../services/markers';
import { LeafletMap as Map } from '../../services/ng-leaflet-map.service';

@Component({
  selector: 'alm-map',
  templateUrl: './map.component.html',
  styles: [
  ]
})
export class MapComponent implements AfterViewInit {
  @Input() markers: Array<{ lng: number, lat: number }> = [  ];
  @Input() size: { width: string, height: string } = { width: '600px', height: '600px' }
  @Input() config?: IConfigMap;
  private map!: Map;

  ngAfterViewInit(): void {
    this.map = new Map(this.config || undefined);
    this.markers.length && Markers.add(this.markers, this.map.get())
    this.markers.length && this.map.fitBounds(this.markers);
    this.config!! && this.setControls();
  }

  setControls() {
    this.config!!.scale && Controls.addScale(this.map.get());
    this.config!!.layers && Controls.addBaseOverLayers(this.map.get(), this.config!!.layers);
    this.config!!.zoom && Controls.changeZoomConfig(this.map.get(), this.config?.zoom);
    this.config!!.fullscreen && Controls.FullScreen(this.map.get());
  }

}
