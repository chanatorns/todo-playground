const STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed'
}

const attributes = (DataTypes) => {
  return {
    status: {
      type: DataTypes.STRING,
      isIn: [[STATUS.PENDING, STATUS.COMPLETED]],
      defaultValue: STATUS.PENDING
    }
  }
}

module.exports = {
  attributes
}