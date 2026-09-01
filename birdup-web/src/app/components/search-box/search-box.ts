import { Component, inject, output, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, required, submit, FormField, apply, validate } from '@angular/forms/signals';
import {TuiAppearance, TuiButton, TuiIcon, TuiInput, TuiInputDirective, TuiTextfieldComponent} from "@taiga-ui/core";
import { TuiSearch } from '@taiga-ui/layout';
import SightingService from '../../services/sighting';
import {SearchInfo} from '../../models/search-info';
import {TuiTooltip} from '@taiga-ui/kit';

@Component({
  selector: 'app-search-box',
  imports: [
    TuiSearch,
    TuiInput,
    TuiInputDirective,
    TuiTextfieldComponent,
    FormsModule,
    FormField,
    TuiIcon,
    TuiTooltip,
    TuiAppearance
  ],
  templateUrl: './search-box.html',
  styleUrl: './search-box.less',
})
export class SearchBox {
  readonly model = model.required<SearchInfo>();
  protected readonly searchSubmit = output<void>();

  protected readonly form = form(this.model, schema => {
    required(schema.regionCode, { message: "Please enter a region code" })
    apply(schema.regionCode, (f) => {
      validate(f, ({ value }) => {
        const searchTerm: string = value();

        // check that the search term has the shape of an ebird region code
        const regionCodePattern = new RegExp("^[A-Za-z]{2}(-[A-Za-z0-9]{1,4}){0,2}$");
        return regionCodePattern.test(searchTerm) ? null : {
          kind: 'region-code',
          message: "Please enter a valid region code"
        };
      });
    });
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();

    submit(this.form, async _ => {
      this.searchSubmit.emit();
    });
  }
}
