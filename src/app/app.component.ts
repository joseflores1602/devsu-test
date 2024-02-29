import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogComponent } from "./dialog/dialog.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, DialogComponent]
})
export class AppComponent {
  title = 'devsu-test';
}
