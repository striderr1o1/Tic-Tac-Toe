

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
  
    const selectCell =async (player) => {
        process.stdout.write('Enter row: \n');
        process.stdin.on('r', (r) => {
          const enteredRow = r.toString().trim();
          const row = parseInt(enteredRow);
          process.exit();
           // Exit the process after receiving input
        });
        
        process.stdout.write('Enter col: \n');
        process.stdin.on('c', (c) => {
          const enteredCol = c.toString().trim();
          const col = parseInt(enteredCol);
          process.exit(); // Exit the process after receiving input
        });

        grid[row][col]=player.value;
        
    }
    
    


    return {getGrid, printGrid, selectCell, getCol, getRows};
})();
//###############################################################################################################################
function playerFactory(){
    let name;
    let value = 0;
    let win = false;
    let activness = false;

    const setPlayerName = (namee)=>{
        name = namee;
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
    const getActivity = ()=>activness;
    const setActivity = (x)=>{activness =x};
  
    return {getPlayerName, setPlayerName, getPlayerStatus, setPlayerStatus, setPlayerValue, getPlayerValue, getActivity, setActivity};

}

//###############################################################################################################################

function roundsFactory(player1, player2){
    let round_no = 0;
    let winner = null;
    // P1 = player1;
    // P2 = player2;
    let count = 0;
    
    let grid = gameboard.getGrid();
    

    const turn = (player)=>{
        
        gameboard.printGrid();
        
        console.log(player.getPlayerName()+"'s turn")
        console.log("\n");
        gameboard.selectCell(player);
        
    }
    const getActivePlayer = (player1, player2) =>{
       let active;
        if(player1.getActivity() === true){
            active = player2;
            player2.setActivity(true);
            player1.setActivity(false);
        }
        else{
            active = player1;
            player1.setActivity(true);
            player2.setActivity(false);

        }
        return active; 
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
            

            for(let j = 0; j < 3;j++){
                
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
        if(win === true){return win;}
        else{return false;}
        
    }

    
    const roundFunctionality = async ()=>{
        let count = 4;
        let Checkwin = false;
        for(let i = 0; i < count; i++){
        let active = getActivePlayer(player1, player2);
        turn(active);
        Checkwin= checkWinStatus(active);
        // if (Checkwin!=true){count++;}
        }
         
        
    }
    return {roundFunctionality};

}
//###############################################################################################################################
(function Game(){
    let P1 = playerFactory();
    P1.setPlayerName("Mustafa");
    P1.setPlayerValue("X");

    let P2 = playerFactory();
    P2.setPlayerName("Ali");
    P2.setPlayerValue("O");
    

    let round1 = roundsFactory(P1, P2);
    round1.roundFunctionality();
    console.log("WOW")
//rounds
})();

//having issues with the do while loop, it keeps running, plus im not being able to take rows and columns as input, i mean,
//I can, but its causing problems


