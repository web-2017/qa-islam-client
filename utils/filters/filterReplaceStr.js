export const filterReplaceStr = str => {
    return str ? str && str.replace('Мухаммад', 'Мухаммад ﷺ').replace('коран', 'Коран') : null
}
