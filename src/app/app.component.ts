import { Component } from '@angular/core';
import { ThemeService } from './helper-modules/themes/theme.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activeThem = 'oceanBlueThemProps';

  constructor(private themService: ThemeService) {}

    toggleThem() {
      if (this.activeThem !== 'deepPurpleThemProps') {
      this.themService.setActiveThem('deepPurpleThemProps');
      this.activeThem = 'deepPurpleThemProps';
    } else {
      this.themService.setActiveThem('oceanBlueThemProps');
      this.activeThem = 'oceanBlueThemProps';
    }
  }
}
