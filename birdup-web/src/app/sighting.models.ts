/**
 * Represents a single reported bird observation.
 */
export default interface Sighting {
    /** The eBird species code. */
    speciesCode: string;
    /** The common name for the observed species. */
    comName: string;
    /** The scientific name for the observed species. */
    sciName: string;
    /** The unique ID for the sighting location. */
    locId: string;
    /** The readable name for the sighting location. */
    locName: string;
    /** The timestamp for this sighting. */
    obsDt: Date;
    /** The quantity of birds observed. */
    howMany?: number;
    /** Latitudinal coordinate of the sighting. */
    lat: number;
    /** Longitudinal coordinate of the sighting. */
    lng: number;

    obsValid: boolean;
    obsReviewed: boolean;
    locationPrivate: boolean;
    subId: string;
}
