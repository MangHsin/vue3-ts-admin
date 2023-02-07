export interface RoleInterface {
    roleId: number,
    roleName: string,
    authority: number[]
}
export class RoleData {
    list: RoleInterface[] = []
}