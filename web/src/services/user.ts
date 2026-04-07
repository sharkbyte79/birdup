import birdupFetch, { BirdupRequest, BirdupResponse } from "./apiClient";
import type { CreateUserRequest, User } from "../types/shared.types";


export async function createUser(user: CreateUserRequest): Promise<BirdupResponse<User>> {
    const endpoint: string = "/user/create";
    const res: BirdupResponse<User> = await birdupFetch<User>(endpoint, {
        method: "POST",
        body: JSON.stringify(user)
    });
    return res;
}
