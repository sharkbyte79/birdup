import { Component } from '@angular/core';
import { TuiNavigation } from '@taiga-ui/layout';
import { TuiButton, TuiIcon } from "@taiga-ui/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [
    TuiNavigation,
    TuiButton,
    TuiIcon,
    RouterLink,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header { }
