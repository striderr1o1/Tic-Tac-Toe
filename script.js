const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let gameboard =(function Grid(){
    let rows = 3;
    let columns = 3;
    let grid = [];

    for(let i = 0; i < rows; i++){
        grid[i] = [];
        for(let j = 0; j < columns;j++)
        {
            grid[i][j]="-";
        }
    }
    const getRows = ()=>rows;
    const getCol = ()=>columns;
    const getGrid = ()=>grid;
    const printGrid = ()=>{
        for(let i = 0; i < rows; i++){
            console.log(grid[i]);
        }
    }
    const selectCell = (player)=>{
        let row = 0;
        let col = 0;
        // rl.question("Enter rows: ", function(rows){
        //      row = rows;
        //     rl.close();
        // });
        // rl.question("Enter columns: ", function(cols){
        //     col = cols;
        //     rl.close();
        // })
    
        

        grid[row][col] = player.value;
    }
    return {getGrid, printGrid, selectCell, getCol, getRows};
})();

function playerFactory(){
    let name;
    let value = 0;
    let win = false;

    const setPlayerName = (name)=>{
        name = name;
    }
    const getPlayerName = ()=>{
        return name;
    }

    const setPlayerValue = (val)=>{
        value = val;
    }
    const getPlayerValue = ()=>{
        return value;
    }

    const setPlayerStatus = (w)=>{
        win = w;
    }
    const getPlayerStatus = ()=>{
        return win;
    }
    
    
    
    return {getPlayerName, setPlayerName, getPlayerStatus, setPlayerStatus, setPlayerValue, getPlayerValue};
    

}



function roundsFactory(player1, player2){
    let round_no = 0;
    let winner = null;
    P1 = player1;
    P2 = player2;
    let count = 0;
    let grid = gameboard.getGrid();

    const turnP1 = ()=>{
        gameboard.printGrid();
        gameboard.selectCell(P1);
    
    }
    const turnP2 = ()=>{
        gameboard.printGrid();
        gameboard.selectCell(P2);
    
    }
    const checkWinStatus = (player)=>{
        let value = player.value;
        let rows = gameboard.getRows();
        let columns = gameboard.getCol();
        //win logic
        
        //check rows
        let counter = 0;
        let win = false;
        for(let i = 0;i<3;i++){
            counter = 0;
            console.log("Row " + i)

            for(let j = 0; j < 3;j++){
                console.log("col "+j);
                if(grid[i][j]===value){
                    counter++;
                    if (counter === 3){
                        console.log("win: row");
                        win = true;
                        break;
                    }
                }
               if(win === true){break;}
            }
            if(win === true){break;}
        }
        //check columns
        for(let i = 0; i < rows; i++){
            if(win === true){break;}
            counter = 0;
            console.log("Column "+i);
            for(let j = 0; j < columns; j++){
                if(grid[j][i] === value){
                    counter++;
                    if (counter === 3){
                        console.log("win: col");
                        win = true;
                        break;
                    }
                }
            }
        }
        if(win != true){
            if(grid[0][0] === value && grid[1][1] === value && grid[2][2] === value){
                win = true;
            }
        }
        if(win != true){
            if(grid[0][2] === value && grid[1][1] === value && grid[2][0] === value){
                win = true;
            }
        }
        return win;
    }
    const roundFunctionality = ()=>{
        do{
            turnP1();
            turnP2();                        
        }while(checkWinStatus(P1)!=true || checkWinStatus(P2)!= true)
    }
    return {roundFunctionality};
    


}

(function Game(){
    let P1 = playerFactory();
    P1.setPlayerName("Mustafa");
    P1.setPlayerValue("X");

    let P2 = playerFactory();
    P2.setPlayerName("Ali");
    P2.setPlayerValue("O");

    let round1 = roundsFactory(P1, P2);
    round1.roundFunctionality();
//rounds
})();




