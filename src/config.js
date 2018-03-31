const origin = (process.env.NODE_ENV === 'development' ? 'http://localhost:3003' : 'http://forumapi.jingia.com')
// const origin = 'http://forumapi.jingia.com'

const query = {
  page: 1,
  limit: 10
}

export {
  origin,
  query
}
