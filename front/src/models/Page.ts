export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export class Page {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public city: string,
    public gender: Gender,
    public age: number,
    public areasOfInterest: string[]
  ) {}
}
