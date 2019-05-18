import { observable } from 'mobx'

const shoppingStore = observable({
  data: [],
  getItem(item = {} as any) {
    if (!Object.keys(item).length) {
      return {}
    }

    const { id } = item
    const { data } = this

    const findIndex = data.findIndex(x => x.id === id)

    if (findIndex === -1) {
      return {}
    }
    return {...data[findIndex]}
  },
  saveItem(item = {} as any) {
    if (!Object.keys(item).length) {
      return {}
    }

    const { id, count } = item
    const { data } = this

    const findIndex = data.findIndex(x => x.id === id)

    // 若不存在,则添加进数组
    if (findIndex === -1) {
      this.data = [...data, item]
      return
    }
    // 若数组已存在，但count为0，则移除
    if (count === 0) {
      const result = data.filter(x => x.id !== id)
      this.data = [...result]
      return
    }
    // 若数组已存在，但count不为0，则替换
    const result = { ...data[findIndex], ...item }
    this.data[findIndex] = result
  }
})
export default shoppingStore
