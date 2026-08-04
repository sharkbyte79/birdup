import { TuiRoot } from '@taiga-ui/core';
import { Component, signal } from '@angular/core';
import { Home } from './home/home';
import { Header } from "./header/header";

@Component({
  selector: 'app-root',
  imports: [Home, TuiRoot, TuiRoot, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('birdup-web');
}
