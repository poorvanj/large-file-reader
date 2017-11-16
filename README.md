# LargeFileReader

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Working

 For every single line in the file, look for " -- ", and for every such line extract the full name, last name and first name. 
 Each of these is stored in an associative array implementation in Javascript, which helps keep a track of the number of occurrences
 of each name (for all, full names, last names and first names).

 COUNT OF UNIQUE NAMES, LIST OF 10 MOST COMMON LAST AND FIRST NAMES:
  An associative array helps keep a track of the count / occurrence of each 
  last and first name which in turn helps determine which names are unique
  (names with count = 1 are unique, duplicates are counted once) and also helps 
  find out the most common first and last names.

 Unique names have the following requirements:
	 -> No previous name has the same first name
	 -> No previous name has the same last name
 This is determined by a check on the number of occurrences of the first and
 last names until N such names are found.

MODIFIED NAMES:
These are created by simply "rotating" the first names against original last names.

## Execution

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Can also be run using npm with command `npm start` after running `npm install` to install all required dependencies.

## Limitations

 (1) Case insensitivity is not handled.
 (2) The implementation logic is the same as the Java implementation, but some times for large test cases there is an error of +1 / -1 count.
 (3) Again, the implementation logic is the same as the Java implementation, but this does not provide correct results for 25 unique names. 

 - Since Angular isn't exactly the best choice for this kind of a resource-intensive project, and this solution was implemented simply as a pure, 
 front end alternative of the actual problem solution (and also to prevent any further delay in the submission of this exercise), I did not 
 completely troubleshoot all limitations of this implementation.

## Scope of improvement

 (1) I would have preferred using scss / sass in place of regular CSS.