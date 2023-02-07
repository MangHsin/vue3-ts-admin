export interface ListInterface {
    userId: number,
    id: number,
    title: string,
    introduce: string
}
export interface SelectDataInterface {
    title: string,
    introduce: string,
    page: number,
    count: number,
    pageSize: number
}
export class GoodsData {
    // 展示的内容数据
    list: ListInterface[] = []

    selectData: SelectDataInterface = {
        title: '',
        introduce: '',
        page: 1,
        count: 0,
        pageSize: 10
    }
}