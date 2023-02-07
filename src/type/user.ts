export interface UserInterface {
    id: number,
    nickName: string,
    role: roleInterface[],
    userName: string
}
export interface roleInterface {
    role: number,
    roleName: string
}
export interface roleListInterface {
    roleId: number,
    roleName: string,
    authority: number[],
}
export interface SelectDataInterface {
    role: number,
    nickName: string
}
export interface ActiveInterface {
    id: number,
    nickName: string,
    userName: string,
    role: number[],
}
export class UserData {
    // 展示的内容数据
    userList: UserInterface[] = []

    selectData: SelectDataInterface = {
        role: 0,
        nickName: ''
    }
    roleList: roleListInterface[] = []
    isShow = false
    active: ActiveInterface = {
        id: 0,
        nickName: '',
        userName: '',
        role: [],
    }
}