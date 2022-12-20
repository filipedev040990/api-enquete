export const map = (data: any): any => {
  const { _id, ...dataWithoutId } = data
  return Object.assign({}, dataWithoutId, { id: _id })
}

export const mapCollection = (collection: any []): any [] => {
  return collection.map(c => map(c))
}
