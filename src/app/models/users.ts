export interface IUser {
    company?: ICompany,
    address?: IAddress,
    email?: string,
    id: number | string,
    name: string
    phone?: string
    userName?: string
    website?: string
}

export interface ICompany {
    bs: string
    catchPhrase: string
    name: string
}

export interface IAddress {
    city: string
    geo: IGeo
    street: string
    suite: string
    zipcode: string
}

export interface IGeo {
    lat: number,
    lng: number
}
