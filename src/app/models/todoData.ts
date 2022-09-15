
  export interface IGeo {
      lat: string;
      lng: string;
  }

  export interface IAddress {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: IGeo;
  }

  export interface ICompany {
      name: string;
      catchPhrase: string;
      bs: string;
  }

  export interface ITodo {
      id: number | string;
      title: string;
      userId?: number | string;
      completed: boolean
  }

  export interface ITodoData {
    data: any[]
  }

