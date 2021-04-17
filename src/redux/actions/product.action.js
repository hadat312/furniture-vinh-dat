export const addTaskAction = (params) => {
  return {
    type: 'ADD_TASK',
    payload: params,
  }
}

export const editTaskAction = (params) => {
  return {
    type: 'EDIT_TASK',
    payload: params,
  }
}

export const deleteTaskAction = (params) => {
  return {
    type: 'DELETE_TASK',
    payload: params,
  }
}

export const getTaskDetailAction = (params) => {
  return {
    type: 'GET_TASK_DETAIL',
    payload: params,
  }
}
