import { Component, input } from '@angular/core';
import { TuiAppearance, TuiIcon, TuiTitle } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';
import {TuiCardMedium, TuiCardRow} from "@taiga-ui/layout";
import Sighting from '../sighting.models';

@Component({
  selector: 'app-sighting-card',
  imports: [
    TuiAppearance,
    TuiBadge,
    TuiCardMedium,
    TuiIcon,
    TuiTitle,
    TuiCardRow
  ],
  templateUrl: './sighting-card.html',
  styleUrl: './sighting-card.less',
})
export class SightingCard {
  readonly sighting = input.required<Sighting>();
}
