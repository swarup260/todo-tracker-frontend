
import { getData, storeData } from '../../utils/localStorage'

class ProjectDict {

    get colDict() {
        return getData('COLS_DICT')
    }

    set colDict(cols) {
        console.log("ADD", cols);
        const colMap = {}
        for (let i = 0; i < cols.length; i++) {
            const notes = cols[i].notes
            colMap[cols[i]._id] = {
                index: i,
                noteIndexes: {}
            }

            const noteMap = {}

            for (let j = 0; j < notes.length; j++) {
                noteMap[notes[j]._id] = { index : j }
            }
            colMap[cols[i]._id].noteIndexes = noteMap
        }
        console.log("ADD", colMap);

        storeData('COLS_DICT', colMap)
    }
}

export default new ProjectDict