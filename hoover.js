/*

Project: Tray.io Programming Assignment
Author: John King
Date: 2/6/2020

Summary: 

Program which takes a file as input containing the size of a grid, positions of "dirt", and coordinates.
The program will take the coordinates and move the "hoover" based on direction and count the number of dirt
piles cleaned. It will also output the finishing position of the hoover

*/

// Imported Libraries

const fs = require("fs") // Library for reading files from the CLI

// Global Variable Declarations

let grid = [];
let coords = ""
let dirt_count = 0
let hoovie_pos = [0,0]

// Creates the grid as a 2D array. Uses "0"s to signify an empty space


function make_grid(grid_size){
	grid_size = grid_size.split(' ')
	//console.log(grid)
	grid = new Array(grid_size[0])
	for (i = 0; i<grid_size[0]; i++){
		grid[i] = []
		for (j =0; j<grid_size[1]; j++){
			grid[i].push("0");
		}
		console.log(grid[i]);
	}
}

/*
	Function that parses the file given as input. Calls several other functions:
	1. make_grid()
	2. place_dirt()
	3. read_coords()
	3.  
*/

function parse_input(file){
	file = file.split("\n")
	if (file[file.length-1] == '' ) file.pop(); // Weird case where a new line was being included after coords
	// console.log(file)
	for (i = 0; i<file.length; i++) {
		if(i == 0){
			make_grid(file[i])
		}
	}
}

filename = process.argv.slice(2)[0] // Get the name of the input file

//Reads the file
fs.readFile(filename, 'utf-8', function (err, contents){
	parse_input(contents)
})

