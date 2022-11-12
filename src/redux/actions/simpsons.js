import ActionTypes from "../actionTypes";


const getSimpsons = (payload) => {  
    return {
        type : ActionTypes.simpsons.GET_SIMPSONS,
        payload
    }
}

const removeSimpson = (payload) => {  
    return {
        type : ActionTypes.simpsons.REMOVE_SIMPSON,
        payload
    }
}

const moveUpSimpson = (payload) => {  
    return {
        type : ActionTypes.simpsons.MOVE_UP_SIMPSON,
        payload
    }
}

const moveDownSimpson = (payload) => {  
    return {
        type : ActionTypes.simpsons.MOVE_DOWN_SIMPSON,
        payload
    }
}


const addSimpson = (payload) => {  
    return {
        type : ActionTypes.simpsons.ADD_SIMPSON,
        payload
    }
}


const simpsonAction = {
    getSimpsons,
    removeSimpson,
    moveUpSimpson,
    moveDownSimpson,
    addSimpson
};

export default simpsonAction;