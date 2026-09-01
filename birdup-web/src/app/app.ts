import { TuiRoot } from '@taiga-ui/core';
import { Component, signal } from '@angular/core';
import {Home} from './components/home/home';
import {Header} from "./components/header/header";

@Component({
  selector: 'app-root',
  imports: [Home, TuiRoot, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('birdup-web');
}
