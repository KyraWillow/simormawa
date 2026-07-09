export interface UserPersistenceModel {
    id: string,
    email: string,
    password: string,
    name: string,
    role: string,
    is_active: boolean,
    created_at: Date,
    updated_at: Date
}