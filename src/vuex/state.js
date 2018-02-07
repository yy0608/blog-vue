import { query } from '@/config.js'

const state = {
  page: query.page,
  limit: query.limit,
  userInfo: null,
  userList: null,
  userCount: null,
  categoryCount: null,
  categoryList: null,
  topicCount: null,
  topicList: null,
  homeTopicList: null,
  homeTopicCount: null
}

export default state
