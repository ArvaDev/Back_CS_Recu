export interface User{
    id?: string;
    name: string;
    password: string;
    mail: string;
    tel: string;
    rol: boolean;
    classes: string[];
    tuition: string;
    encryptPassword(pass: string): Promise<string>;
    validatePassword(pass: string): Promise<boolean>;
    generateTuition(): string;
}