export interface Menu {
  id: Number
  name: String
  icon: String
  path: String
  active?: Boolean
  color?: String
}

export interface CheckList {
  title: String,
  status: number,
}

export interface Todo {
  menuId: Number,
  type: String,
  title: String,
  noted: String,
  status: Number,
  createaAt: String,
  updateAt: String,
  when: String,
  deadline: String,
  tags: String[],
  checkList: CheckList[],
}
