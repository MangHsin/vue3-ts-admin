export interface AuthInterface {
    name: string,
    roleId: number,
    roleList?: AuthInterface[],
    viewRole?: string
}
export class InitData {
    id: number;
    authority: number[];
    constructor(id: number, authority: number[]) {
        this.id = id;
        this.authority = authority
    }
    list:AuthInterface[]=[]
}