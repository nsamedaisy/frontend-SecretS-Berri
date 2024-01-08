interface Iuser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    createdAt?: Date | string;
};

export type {
    Iuser,
}