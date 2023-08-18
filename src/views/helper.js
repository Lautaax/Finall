export const compare = (value1, operator, value2, options) => {
    const operators = {
      '==': function (a, b) {
        return a == b
      },
      '===': function (a, b) {
        return a === b
      },
      '!=': function (a, b) {
        return a != b
      },
      '!==': function (a, b) {
        return a !== b
      },
      '<': function (a, b) {
        return a < b
      },
      '>': function (a, b) {
        return a > b
      },
      '<=': function (a, b) {
        return a <= b
      },
      '>=': function (a, b) {
        return a >= b
      },
      typeof: function (a, b) {
        return typeof a === b
      }
    }
}