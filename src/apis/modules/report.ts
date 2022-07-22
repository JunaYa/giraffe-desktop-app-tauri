import ajax from '../ajax'

/**
 * 获取用户学习报告
 * @param query
 */
export function getUserUnitLearnReport(query: any): ResponseData<UserUnitLearningReport> {
  return ajax.post('https://api.hetao101.com/learning-business-gateway/common/v1/getUserUnitLearnReport', query)
}

/**
 * 获取用户作业
 * @param query
 */
export async function getUserHomework(query: any): Promise<string> {
  const result = await ajax.get(`https://api.hetao101.com/learning-business-gateway/homework/v1/listHomework?${query}`)
  if (result.errCode === 0)
    return Promise.resolve(result.data.homeworkItems[0].userAnswer)
  return Promise.resolve('')
}

/**
 * 获取单元数据
 * @param query
 */
export async function getUnitData<T>(query: any): Promise<T[]> {
  const reuslt: BaseResponse = await ajax.get(`https://api.hetao101.com/learning-business-gateway/course/v1/unitData?${query}`)
  if (reuslt.errCode === 0) {
    const unitData = JSON.parse(reuslt.data.unitData)
    return parseWriteHomeworkKnowledgeList(unitData.parts)
  }
  return Promise.resolve([])
}

/**
 * 解析写字知识点
 */
function parseWriteHomeworkKnowledgeList(parts: any[]): any[] {
  let arr: any[] = []
  parts.forEach((chapters: any) => {
    if (chapters && chapters.chapters && chapters.chapters.length) {
      chapters.chapters.forEach((chapter: any) => {
        if (chapter.itemType === 'WRITE_HOMEWORK' && chapter.item && chapter.item.writeCheckpointList) {
          chapter.item.writeCheckpointList.forEach((writeCheckpoint: any) => {
            if (writeCheckpoint && writeCheckpoint.writePointList && writeCheckpoint.writePointList.length) {
              if (writeCheckpoint.writePointList.find(i => !!i.writePoint))
                arr = [...arr, ...writeCheckpoint.writePointList]
            }
          })
        }
      })
    }
  })

  arr.map((item) => {
    const strs = item.writePoint.split('\n')
    item.writePointArr = strs.filter(i => !!i)
    return item
  })
  return arr
}
