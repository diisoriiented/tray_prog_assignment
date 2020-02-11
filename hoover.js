/*

Project: Tray.io Programming Assignment
Author: John King
Date: 2/6/2020

Summary: 

Program which takes a file as input containing the size of a grid, positions of "dirt", and coordinates.
The program will take the coordinates and move the "hoover" based on direction and count the number of dirt
piles cleaned. It will also output the finishing position of the hoover.

*/

// Imported Libraries

const fs = require("fs") // Library for reading files from the CLI

// Global Variable Declarations

let grid = [];
let grid_width = 0
let grid_height = 0
let dirt_count = 0
let hoovie_pos = [0,0]
let curr_pos = [0,0]


// Debugging function to visualize Hoovie moving around the grid

function print_grid(){
	console.log("*************")
	for (i = 0; i<grid.length; i++){
		process.stdout.write("[ ")
		for(j = 0; j<grid[i].length; j++){
			process.stdout.write(grid[i][j]+" ")
		}
		process.stdout.write("]\n")
	}
}

// Creates the grid as a 2D array. Uses "0"s to signify an empty space

function make_grid(grid_size){
	grid_size = grid_size.split(' ')
	//console.log(grid)
	grid = new Array(grid_size[0])
	grid_width = grid_size[0]
	grid_height = grid_size[1]
	for (var i = 0; i<grid_size[0]; i++){
		grid[i] = []
		for (var j =0; j<grid_size[1]; j++){
			grid[i].push("0");
		}
	}
	//print_grid()
}

// Places Hoovie in the grid based on the coordinates in the input file. Accounts for the case where
// coordinates are out of bounds of the grid. If they are out of bounds the program will exit.

function place_hoovie(pos){
	var coords = pos.split(' ')
	hoovie_pos = [parseInt(coords[0]),parseInt(coords[1])]
	if (hoovie_pos[0] >= grid_width || hoovie_pos[0] < 0 || hoovie_pos[1] >= grid_height || hoovie_pos[1] < 0){
		console.log("It looks like Hoovie was placed in a different room! Exiting...")
		process.exit()
	}
	grid[coords[0]][coords[1]] = 'H'
	//print_grid()
}

// Takes the coordinates of the dirt and places them in the grid similar to placing hoovie. If coordinates
// are negative in this instance, the program ignores them instead of exiting.

function place_dirt(pos){
	var coords = pos.split(' ')
	if((coords[0] || coords[1]) < 0){
		console.log("Hoovie: Hey! It looks like these coordinates are negative! Please provide positive numbers")
		return
	}
	if (coords[0] >= grid_width || coords[0] < 0 || coords[1] >= grid_height || coords[1] < 0){
		console.log("Hoovie: Dirt detected in different room... must... ignore....")
		return
	}
	grid[coords[0]][coords[1]] = 'D'
	//print_grid()
}

// Movies Hoovie based on the direction given in the coordinate string.
// Accounts for the following edge cases:
// 1. If the coordinate will take Hoovie out of bounds of the grid. In this case, the grid acts like a "wall"
//    and Hoovie will remain in place.
// 2. The coordinate string contains a character that is not 'N' 'S' 'E' or 'W'. In this instance the character
//	  will be ignored

function move_hoovie(coord_str){
	for (var i = 0; i<coord_str.length; i++){
		direction = coord_str[i]
		var x = hoovie_pos[0]
		var y = hoovie_pos[1]
		// print_grid()
		switch(direction.toUpperCase()){
			// Case to check one position up in the grid (y+1) is one position up
			case 'N':
				console.log("Hoovie: Moving up!")
				// Checks out of bounds case
				if ( y+1 > grid_height){
					console.log("Hoovie: Ouch! I hit a wall!")
					break;
				}else{
					//Check to see if dirt is in the square Hoovie is moving to
					if (grid[x][y+1] == "D"){
						dirt_count++;
						console.log("Hoovie: Slurpppppp! Dirt cleaned!");
					}
					// Moves hoovie in the grid
					grid[x][y] = "0"
					grid[x][y+1] = "H"
					hoovie_pos = [x,y+1]
				}
				break;
			// Case to check one position down in the grid (y-1) is one position down
			case 'S':
				console.log("Hoovie: Moving down!")
				// Checks out of bounds case
				if ( y-1 < 0){
					console.log("Hoovie: Ouch! I hit a wall!")
					break;
				}else{
					//Check to see if dirt is in the square Hoovie is moving to
					if (grid[x][y-1] == "D"){
						dirt_count++;
						console.log("Hoovie: Slurpppppp! Dirt cleaned!");
					}
					// Moves hoovie in the grid
					grid[x][y] = "0"
					grid[x][y-1] = "H"
					hoovie_pos = [x,y-1]
				}
				break;
			// Case to check one position right in the grid (x+1) is one position right
			case 'E':
				console.log("Hoovie: Moving right!")
				// Checks out of bounds case
				if ( x+1 > grid_width){
					console.log("Hoovie: Ouch! I hit a wall!")
					break;
				}else{
					//Check to see if dirt is in the square Hoovie is moving to
					if (grid[x+1][y] == "D"){
						dirt_count++;
						console.log("Hoovie: Slurpppppp! Dirt cleaned!");
					}
					// Moves hoovie in the grid
					grid[x][y] = "0"
					grid[x+1][y] = "H"
					hoovie_pos = [x+1,y]
				}
				break;
			// Case to check one position left in the grid (x-1) is one position left
			case 'W':
				console.log("Hoovie: Moving left!")
				// Checks out of bounds case
				if ( x-1 < 0){
					console.log("Hoovie: Ouch! I hit a wall!")
					break;
				}else{
					//Check to see if dirt is in the square Hoovie is moving to
					if (grid[x-1][y] == "D"){
						dirt_count++;
						console.log("Hoovie: Slurpppppp! Dirt cleaned!");
					}
					// Moves hoovie in the grid
					grid[x][y] = "0"
					grid[x-1][y] = "H"
					hoovie_pos = [x-1,y]
				}
				break;
			default:
				// Case to account for non cardinal directions
				console.log("Sorry, '" + direction + "' is not a valid direction. Acceptable directions: N, S, E , or W");
		}
	}
}

// Main function: Takes the file contents as input and parses the file line by line. 
// Given the structure of the file, calls a different function depending on the line's data.
// Once all functions have been called, it prints the final location of Hoovie and the number of 
// dirt piles cleaned up.

function main(file){
	file = file.split("\n")
	if (file[file.length-1] == '' ) file.pop(); // Weird case where a new line was being included after the coordinate string
	for (var i = 0; i<file.length; i+=1) {
		if(i == 0){
			make_grid(file[i])
		} else if (i == 1){
			place_hoovie(file[i]);
		} else if (i < file.length-1){
			place_dirt(file[i])
		} else {
			move_hoovie(file[i])
		}
	}

	console.log("Hoovie Position: " + hoovie_pos)
	console.log("Dirt cleaned: " + dirt_count)
	//print_grid()
}

if (process.argv.length < 3){
	console.log("Usage: \"node hoover.js [input file]\"")
	process.exit()
}

// Get the name of the input file
filename = process.argv.slice(2)[0] 

//Takes the file and calls the main function.

fs.readFile(filename, 'utf-8', function (err, contents){
	if (err){
		console.log("Oops!!! There was an error! Are you sure your file exists?")
		process.exit()
	}
	main(contents)
})
