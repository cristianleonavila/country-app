import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "../../country/components/top-menu/top-menu.component";

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, TopMenuComponent],
  templateUrl: './app-layout.component.html'
})
export class AppLayoutComponent {

}
