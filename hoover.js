/*

Project: Tray.io Programming Assignment
Author: John King
Date: 2/6/2020

Summary: Program which takes a file as input containing the size of a grid, positions of "dirt", and coordinates.
		 The program will take the coordinates and move the "hoover" based on direction and count the number of dirt
		 piles cleaned. It will also output the finishing position of the hoover

*/

// Imported Libraries

const fs = require("fs")

// Global Variable Declarations

let grid = [];
let coords = ""
let dirt_count = 0
let hoovie_pos = [0,0]


/*
	Function that parses the file given as input. Calls several other functions:
	1. read_gri
	2. place_dirt()
	3. read_coords()
	3.  
*/
function parse_input(file){

}

console.log(process.argv.slice(2))
