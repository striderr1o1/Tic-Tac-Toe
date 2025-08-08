

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let gameboard =(function Grid(){
    let rows = 3;
    let columns = 3;
    let grid = [];
    let blocksTaken = [];
    for(let i = 0; i < rows; i++){
        grid[i] = [];
        for(let j = 0; j < columns;j++)
        {
            grid[i][j]="_";
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
  const occupyBlock = (row, col)=>{
        blocksTaken.push([row, col]);
    }

    const checkBlockAvailability = (row, col)=>{
        let available = true;
        
        for(let i = 0; i < blocksTaken.length;i++){
        
                if(row === blocksTaken[i][0] && col === blocksTaken[i][1]){
                    console.log("Not available");
                    available = false;
                    break;
                }
            
        }
        return available;
    }
    const selectCell =async (player) => {
        let row; let col;
        do{
            const prompt = require('prompt-sync')({sigint: true});
         row = parseInt(prompt('Enter row: '));
        const prompt2 = require('prompt-sync')({sigint: true});
         col = parseInt(prompt2("Enter col: "));
         if(row < 0 || row > 3 || col < 0 || col > 3){
            console.log("Enter appropriate number\n");
         }
        }while(row < 0 || row > 3 || col < 0 || col > 3);
        let avbl = checkBlockAvailability(row, col);
        if(avbl === true){
        occupyBlock(row,col);
        grid[row-1][col-1]=player.getPlayerValue();
        
        }
        else{
            console.log(player.getPlayerName()+"'s turn");
            selectCell(player);
        }
        
        
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
        let value = player.getPlayerValue();
        
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
        let count = 100;
        let Checkwin = false;
        do{
        let active = getActivePlayer(player1, player2);
        turn(active);
        Checkwin= checkWinStatus(active);
        if(Checkwin === true){
            console.log(gameboard.getGrid());
            console.log(active.getPlayerName()+" has won!");
            break;
        }
        // if (Checkwin!=true){count++;}
        }while(Checkwin!=true);
         
        
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
    
//rounds
})();


//need to fix the infinite loop


