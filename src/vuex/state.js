import { query } from '@/config.js'

const state = {
  page: query.page,
  limit: query.limit,
  userInfo: null,
  userList: null,
  userCount: null,
  categoryCount: null,
  categoryList: null
}

export default state
