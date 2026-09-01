import { Component, input } from '@angular/core';
import {TuiIcon, TuiTitle} from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';
import {TuiCardLarge, TuiCardRow, TuiHeader} from "@taiga-ui/layout";
import Sighting from '../../services/sighting.models';

@Component({
  selector: 'app-sighting-card',
  imports: [
    TuiBadge,
    TuiIcon,
    TuiTitle,
    TuiCardRow,
    TuiCardLarge,
    TuiHeader,
  ],
  templateUrl: './sighting-card.html',
  styleUrl: './sighting-card.less',
})
export class SightingCard {
  readonly sighting = input.required<Sighting>();
}
