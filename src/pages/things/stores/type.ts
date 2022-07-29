export interface Menu {
  id: string
  name: string
  icon: string
  path?: string
  type: string
  todoList: Todo[]
  active?: boolean
  color?: string
}

export interface CheckList {
  value: string
  checked: boolean
}

export interface Todo {
  pid: string
  id: string
  type: string
  title: string
  notes: string
  status: number
  checked: boolean
  isEditing: boolean
  selected: boolean
  createaAt: string
  updateAt: string
  when: string
  deadline: string
  tags: string[]
  checkList: CheckList[]
}
