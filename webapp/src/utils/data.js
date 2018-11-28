const groupBy = (arr, key) => {
  return arr.reduce((xs, x) => {
    if (x[key]) {
      (xs[x[key]] = xs[x[key]] || []).push(x)
    } else {
      (xs.nokey = xs.nokey || []).push(x)
    }
    return xs
  }, {})
}

const groupByArray = (xs, key) => {
  return xs.reduce((rv, x) => {
    const v = key instanceof Function ? key(x) : x[key]
    const el = rv.find(r => r && r.key === v)
    if (el) {
      el.values.push(x)
    } else {
      rv.push({ key: v, values: [ x ] })
    }
    return rv
  }, [])
}

export { groupBy, groupByArray }
