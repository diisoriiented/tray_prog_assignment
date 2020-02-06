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
let  hoovie_pos = [0,0]
let curr_pos = [0,0]

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

function place_hoovie(pos){
	var coords = pos.split(' ')
	// console.log("TTTT"+coords)
	hoovie_pos = [parseInt(coords[0]),parseInt(coords[1])]
	if (hoovie_pos[0] >= grid_width || hoovie_pos[0] < 0 || hoovie_pos[1] >= grid_height || hoovie_pos[1] < 0){
		console.log("It looks like Hoovie was placed in a different room! Exiting...")
		process.exit()
	}
	grid[coords[0]][coords[1]] = 'H'
	//print_grid()
}

function place_dirt(pos){
	var coords = pos.split(' ')
	if((coords[0] || coords[1]) < 0){console.log("Hoovie: Hey! It looks like these coordinates are negative! Please provide positive numbers")}
	if (coords[0] >= grid_width || coords[0] < 0 || coords[1] >= grid_height || coords[1] < 0){
		console.log("Hoovie: Dirt detected in different room... must... ignore....")
		return
	}
	grid[coords[0]][coords[1]] = 'D'
	//print_grid()
}

function move_hoovie(coord_str){
	for (var i = 0; i<coord_str.length; i++){
		direction = coord_str[i]
		var x = hoovie_pos[0]
		var y = hoovie_pos[1]
		// print_grid()
		switch(direction.toUpperCase()){
			case 'N':
				console.log("Hoovie: Moving up!")
				if ( y+1 > grid_height){
					console.log("Hoovie: Ouch! I hit a wall!")
					break;
				}else{
					if (grid[x][y+1] == "D"){
						dirt_count++;
						console.log("Hoovie: Slurpppppp! Dirt cleaned!");
					}
					grid[x][y] = "0"
					grid[x][y+1] = "H"
					hoovie_pos = [x,y+1]
				}
				break;
			case 'S':
				console.log("Hoovie: Moving down!")
				if ( y-1 < 0){
					console.log("Hoovie: Ouch! I hit a wall!")
					break;
				}else{
					if (grid[x][y-1] == "D"){
						dirt_count++;
						console.log("Hoovie: Slurpppppp! Dirt cleaned!");
					}
					grid[x][y] = "0"
					grid[x][y-1] = "H"
					hoovie_pos = [x,y-1]
				}
				break;
			case 'E':
				console.log("Hoovie: Moving right!")
				if ( x+1 > grid_width){
					console.log("Hoovie: Ouch! I hit a wall!")
					break;
				}else{
					if (grid[x+1][y] == "D"){
						dirt_count++;
						console.log("Hoovie: Slurpppppp! Dirt cleaned!");
					}
					grid[x][y] = "0"
					grid[x+1][y] = "H"
					hoovie_pos = [x+1,y]
				}
				break;
			case 'W':
				console.log("Hoovie: Moving left!")
				if ( x-1 < 0){
					console.log("Hoovie: Ouch! I hit a wall!")
					break;
				}else{
					if (grid[x-1][y] == "D"){
						dirt_count++;
						console.log("Hoovie: Slurpppppp! Dirt cleaned!");
					}
					grid[x][y] = "0"
					grid[x-1][y] = "H"
					hoovie_pos = [x-1,y]
				}
				break;
			default:
				console.log("Sorry, '" + direction + "' is not a valid direction. Acceptable directions: N, S, E , or W");
		}
	}
}

function main(file){
	file = file.split("\n")
	if (file[file.length-1] == '' ) file.pop(); // Weird case where a new line was being included after coords
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

filename = process.argv.slice(2)[0] // Get the name of the input file

//Reads the file
fs.readFile(filename, 'utf-8', function (err, contents){
	main(contents)
})
