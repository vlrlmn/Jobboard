
function makeController() {
    let modalWindowIndex = 10000;

    return {
        get: () => modalWindowIndex,
        increment: () => modalWindowIndex++,
        decrement: () => modalWindowIndex--,
    }
}

const modalWindowIndexController = makeController()

export default modalWindowIndexController;