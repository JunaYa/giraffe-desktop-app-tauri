export interface Menu {
  id: string
  name: string
  icon: string
  path?: string
  type: string,
  active?: boolean
  color?: string
}

export interface CheckList {
  title: string,
  status: number,
}

export interface Todo {
  pid: string,
  id: string,
  type: string,
  title: string,
  notes: string,
  status: number,
  isEditing: boolean,
  createaAt: string,
  updateAt: string,
  when: string,
  deadline: string,
  tags: string[],
  checkList: CheckList[],
}
