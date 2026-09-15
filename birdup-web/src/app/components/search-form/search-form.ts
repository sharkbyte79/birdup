import { ChangeDetectionStrategy, Component, input, linkedSignal, model, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { disabled, form, FormField, FormRoot, required, submit } from '@angular/forms/signals';
import { TuiButton, TuiGroup, TuiIcon, TuiInput, TuiTextfield, } from '@taiga-ui/core';
import { TuiSearch } from '@taiga-ui/layout';
import { SearchOptions, SearchMode, searchOptionsToSearchFormModel, EMPTY_SEARCH_FORM_MODEL, searchFormModelToSearchOptions } from '../../models/search-options';
import {
  TuiAccordion,
  TuiButtonSelect,
  TuiChevron,
  TuiDataListWrapper,
  TuiInputSlider,
  TuiSelect,
  TuiSwitch,
  TuiTooltip
} from '@taiga-ui/kit';
import { SightingMap } from '../sighting-map/sighting-map';
import Sighting from '../../services/sighting.models';
import { SearchFormModel } from "../../models/search-options";

@Component({
  selector: 'app-search-box',
  imports: [
    TuiSearch,
    TuiInput,
    TuiTextfield,
    FormsModule,
    FormField,
    TuiIcon,
    TuiTooltip,
    TuiInputSlider,
    TuiSwitch,
    TuiGroup,
    TuiSelect,
    TuiDataListWrapper,
    TuiChevron,
    TuiButtonSelect,
    TuiButton,
    ReactiveFormsModule,
    SightingMap,
    TuiAccordion,
    FormRoot,
  ],
  templateUrl: './search-form.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-form.less',
})
export class SearchForm {
  // Initialize form with domain model
  readonly domainModel = model.required<SearchOptions>();
  readonly sightings = input<Sighting[] | null>(null);
  protected searchModeOptions = ["Region", "Coordinate"];

  // protected sliderIncrements: number[] = [10, 20, 30, 40, 50];
  protected readonly searchSubmit = output<void>();

  readonly formModel = linkedSignal<SearchOptions, SearchFormModel>({
    source: this.domainModel,
    computation: (domainModel) => domainModel
      ? searchOptionsToSearchFormModel(domainModel)
      : EMPTY_SEARCH_FORM_MODEL
  })

  protected readonly form = form<SearchFormModel>(this.formModel,
    (schemaPath) => {
      // required(schemaPath.searchTerm, { message: 'Please enter a region code' });
      // required(schema.radius, { message: "Please enter a radius" })

      disabled(schemaPath.radius, {
        when: ({ valueOf }) => valueOf(schemaPath.type) == "Region"
      })
    },
    {
      submission: {
        action: async () => {
          this.domainModel.set(searchFormModelToSearchOptions(this.form().value()));
          this.searchSubmit.emit();
        }
      }
    }
  );

  setRadius(n: number) {
    this.formModel.update(m => ({ ...m, radius: n }));
  }

  setSearchMode(s: "Region" | "Coordinate") {
    this.formModel.update(m => ({ ...m, type: s }));
  }
}
