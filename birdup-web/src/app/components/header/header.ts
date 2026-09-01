import {Component, inject} from '@angular/core';
import {TuiNavigation} from '@taiga-ui/layout';
import {TuiButton, TuiIcon} from "@taiga-ui/core";
import {RouterLink} from "@angular/router";
import Keycloak from "keycloak-js";

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
export class Header {
  private readonly keycloak = inject(Keycloak);
  protected readonly isAuthenticated = this.keycloak.authenticated;

  async logout() {
    await this.keycloak.logout();
  }

  async login() {
    await this.keycloak.login();
  }

  async register() {
    await this.keycloak.register();
  }
}
