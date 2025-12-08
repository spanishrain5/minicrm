export interface AuthResponse{
    
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: number,
    localId: string
    
}