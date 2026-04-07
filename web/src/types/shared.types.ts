export type birdObservation = {
    speciesCode: string,
    comName: string,
    sciName: string,
    locID: string,
    locName: string,
    obsDt: string,
    howMany: number,
    lat: number,
    lng: number,
    obsValid: boolean,
    obsReviewed: boolean,
    locPrivate: boolean,
    subID: boolean
}

// Represents a single registered account.
export type User = {
    firebaseID: string, // unique identifier for this user assigned by Firebase
    email: string, // email associated with this user's account at signup
    createdAt: Date // timestamp for moment this user was inserted
}

export type CreateUserRequest = Omit<User, "createdAt">;
