export interface JwtDTO {
    token: string;
    type: string;
    user: string;
    authorities: string[];
}
