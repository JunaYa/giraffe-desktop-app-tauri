interface UserUnitLearningReport {
  abilityList?: any
  checkPoint?: any
  classId: number
  levelSequence: number
  mindMap?: any
  reportContentJson: string
  reportVersion: string
  subjectId: number
  tenantId: number
  unitClerks?: any
  unitId: number
  unitKnowledges: Knowledge[]
  unitName: string
  unitSequence: number
  userAvatar: string
  userGender: Gender
  userId: number
  userName: string
}

interface Knowledge {
  knowledge: string[]
  objectName: string
  calculusKey: string
}

interface Gender {
  1: 'F'
  2: 'M'
  3: 'Unknow'
}

export interface WritingKnowledge {
  writePointArr: string[]
  webThumbnailUrl: string
}
