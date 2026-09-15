import { finalizeConsumerAfterComputation } from "@angular/core/primitives/signals";

export type SearchMode = "Region Code" | "Coordinates"

/*export interface SearchInfo {
  searchMode: SearchMode;
  searchTerm: string | number[];
  // coordinates: number[]
  radius: number;
  notable: boolean;
}*/

export type SearchOptions = {
  notable: boolean;
  back?: number;
  limit?: number;
} & ({
  type: "Region";
  searchTerm: string;
} | {
  type: "Coordinate";
  coordinates: number[],
  radius: number,
});

export interface SearchFormModel {
  type: "Region" | "Coordinate";
  notable: boolean;

  searchTerm: string | null;

  coordinates: number[] | null;
  radius: number | null;
}

export const EMPTY_SEARCH_FORM_MODEL: SearchFormModel = {
  type: "Region",
  notable: false,
  searchTerm: "",
  coordinates: null,
  radius: null,
};

export function searchOptionsToSearchFormModel(options: SearchOptions): SearchFormModel {
  return options.type == "Region" ?
    {
      type: "Region",
      searchTerm: options.searchTerm,
      notable: false,
      coordinates: null,
      radius: null,
    }
    : {
      type: "Coordinate",
      searchTerm: "",
      notable: false,
      coordinates: options.coordinates,
      radius: options.radius,
    };
}

export function searchFormModelToSearchOptions(model: SearchFormModel): SearchOptions {
  return model.type == "Region" ?
    {
      type: "Region",
      searchTerm: model.searchTerm,
      notable: model.notable,
    }
    : {
      type: "Coordinate",
      coordinates: model.coordinates,
      radius: model.radius,
      notable: model.notable
    };
}

export function assertCannotReach(x: never) {
  throw new Error("cannot reach this case for type of SearchOptions");
}



