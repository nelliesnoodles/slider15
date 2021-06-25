// JavaScript source code

// drag and drop will not restrict movement within the grid, or tell us if it's a valid vertical, horizontal move to an empty cell.


// hard coded.  To see the way to make this dynamically populate, check out MineSweeper, or Snake, or the Matrix demo. Github: nelliesnoodles
let MATRIX = [
    [[], [], [], []],
    [[], [], [], []],
    [[], [], [], []],
    [[], [], [], []]
];

let EMPTY = [0, 0];

let START = false;
let TIMER;
let SECOND = 0;
let MINUTE = 0;
let HOUR = 0;

// empty tile: MATRIX[1][1]  [a][b]
// neighbors: MATRIX[a + 1][b] MATRIX[a][b + 1] & [b - 1], [a - 1][b] WHERE the indexes do not exit the Matrix bounds
// Original game was a 3 by 3 grid.
/*   MATRIX =
 *   [[ invalid  ][ neighbor ][ invalid  ]],
 *   [[ neighbor ][empty cell][ neighbor ]],
 *   [[ invalid  ][ neighbor ][ invalid  ]]
 */


function populate() {
    
    for (let row_index = 0; row_index < MATRIX.length; row_index++) {
        row = MATRIX[row_index]
        for (let column_index = 0; column_index < row.length; column_index++) {
            let name = row_index + ":" + column_index
            if (name != "0:0") {
                
                let newOBJ = {
                    'empty': false,
                    'valid': null,
                    'name' : name
                }
                MATRIX[row_index][column_index].push(newOBJ)
            }
            else {
                
                let newOBJ = {
                    'empty': true,
                    'valid': [],
                    'name': name,
                }
                MATRIX[row_index][column_index].push(newOBJ)
            }
            let element = document.getElementById(name)
            element.addEventListener('click', move)
        };

    };

    get_valid()

}

function get_valid() {
    let a = EMPTY[0]
    let b = EMPTY[1]
   
    let cell = MATRIX[a][b]
  

    let obj = cell[0]
    let min = 0
    let max = 3
    let new_valids = []
    if (EMPTY[0] + 1 <= max) {
        var x = EMPTY[0] + 1 
        var y = EMPTY[1]
        var valid = x + ":" + y
        new_valids.push(valid)
    }
    if (EMPTY[0] - 1 >= min) {
        var x = EMPTY[0] - 1
        var y = EMPTY[1]
        var valid = x + ":" + y
        new_valids.push(valid)
    }
    if (EMPTY[1] - 1 >= min) {
        var y = EMPTY[1] - 1 
        var x = EMPTY[0]
        var valid = x + ":" + y
        new_valids.push(valid)
    }
    if (EMPTY[1] + 1 <= max) {
        var y = EMPTY[1] + 1
        var x = EMPTY[0] 
        var valid = x + ":" + y
        new_valids.push(valid)
    }
    obj.valid = new_valids
    
    
}
function endGame() {
    window.clearInterval(TIMER)

}

function startTimer() {
    let hour = document.getElementById("hour");
    let minute = document.getElementById("minute");
    let second = document.getElementById("second");
    runTime(hour, minute, second)
}


function reset() {
    location.reload()
}

function runTime(hour, minute, second) {
    SECOND++
    if (SECOND == 60) {
        SECOND = 0;
        MINUTE++;
    }
    if (MINUTE == 60) {
        MINUTE = 0;
        HOUR++;
    }
    if (SECOND < 10) {
        second.innerHTML = '0' + SECOND;
    }
    else {
        second.innerHTML = SECOND;
    }
    if (MINUTE < 10) {
        minute.innerHTML = '0' + MINUTE;
    }
    else {
        minute.innerHTML = MINUTE;
    }
    hour.innerHTML = HOUR


}

function move() {
    // Check that cell is neighboring empty cell and is not the empty cell
    if (START == false) {
        START = true
        TIMER = window.setInterval(startTimer, 1000)
    }
    let coords = this.id.split(":")
    
    let row = parseInt(coords[0])
    let column = parseInt(coords[1])
    let cell = MATRIX[row][column]
    let obj = cell[0]
    let min = 0
    let max = 3
    let empty_cell = MATRIX[EMPTY[0]][EMPTY[1]]
    let emptyOBJ = empty_cell[0]
    
    let valid_moves = emptyOBJ.valid
   
    if (obj.empty == false) {
        if (valid_moves.includes(this.id)) {
            // valid swap
            swap(this)
           

        }
        
    }

}

function swap(element) {
    // get temps for all values to be swapped
    let currentVALUE = element.innerHTML
    let emptyX = EMPTY[0]
    let emptyY = EMPTY[1]
    let emptyID = emptyX + ':' + emptyY
    let swap1 = MATRIX[emptyX][emptyY]
    let swap1OBJ = swap1[0]
    let validCOORDS = element.id.split(":")
    let validX = parseInt(validCOORDS[0])
    let validY = parseInt(validCOORDS[1])
    let swap2 = MATRIX[validX][validY]
    let swap2OBJ = swap2[0]
    // swap objects in matrix 
    swap2[0] = swap1OBJ 
    swap1[0] = swap2OBJ
    EMPTY = [validX, validY]
    swap1OBJ.valid = null
    // swap values in DOM
    element.classList.add('empty')
    element.innerHTML = ''
    let newplacement = document.getElementById(emptyID)
    newplacement.classList.remove('empty')
    newplacement.innerHTML = currentVALUE
    get_valid()





}





document.addEventListener('DOMContentLoaded', (event) => {
    populate()





});
