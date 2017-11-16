import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';

const UNIQUENAMES = 25;

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FileUploaderComponent implements OnInit {
  fullNamesLength = 0;
  firstNamesLength = 0;
  lastNamesLength = 0;
  fullNames = {};
  lastNames = {};
  firstNames = {};
  uniqueNames = [];
  modifiedNames = [];
  temp = "";
  lastNameTuples = [];
  firstNameTuples = [];
  nValue = 0;

  constructor() { }

  ngOnInit() {
  }

  getModifiedNames() {
  	var count = this.nValue;
  	var nLastNames = [];
  	var nFirstNames = [];

  	for(var key in this.fullNames) {
  		count--;

  		nLastNames.push(key.split(",")[0]);
  		nFirstNames.push(key.split(",")[1]);

  		if(count == 0)
  			break;
  	}
  }

  setPath(evt) {

  	this.fullNamesLength = 0;
	this.firstNamesLength = 0;
	this.lastNamesLength = 0;

  	var i=0, j=1024000;
  	var fileSize = document.getElementById('files').files[0].size;
	

  	for(i=0; i<j && i<fileSize;) {
  		this.readBlob(i,j);
  		var temp = i;
  		i = j;
  		j = j+1024000;
  		/*if(i > fileSize) {
  			i = temp;
  			this.readBlob(i, fileSize);
  			break;
  		}*/
  		if(j > fileSize) {
  			this.readBlob(j-1024000, fileSize-1);
  			break;
  		}
  	}
  	
  }

  readBlob(opt_startByte, opt_stopByte) {
  	
    var start = parseInt(opt_startByte) || 0;
    var stop = parseInt(opt_stopByte) || file.size - 1;
    var file = document.getElementById('files').files[0];
  	var reader = new FileReader();
  	var textStr = "";
  	var progress = document.querySelector('.percent');
  	var j=0;

  	var updateProgress = (evt) => {
  		if (evt.lengthComputable) {
	      var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
	      // Increase the progress bar length.
	      if (percentLoaded <= 100) {
	        progress.style.width = percentLoaded + '%';
	        progress.textContent = percentLoaded + '%';
	      }
	    }
  	}

  	reader.onloadstart = function(evt) {
      document.getElementById('progress_bar').className = 'loading';
    };

  	reader.onprogress = updateProgress;

	reader.onloadend = (evt) => {
	    this.fullNamesLength = 0;
		this.firstNamesLength = 0;
		this.lastNamesLength = 0;
	  	if (evt.target.readyState == FileReader.DONE) {
	    	this.temp = this.temp + evt.target.result;
		}

		this.temp = this.temp.split(/\r\n|\n|\r/);
    	for(var i=0;i<this.temp.length;i++) {    
        var index = 0;
    	if (index = this.temp[i].search(" -- ")) {
    	    if(index != -1) {

    			var fullName = this.temp[i].substring(0, this.temp[i].search(" -- "));
    			if(fullName.length > 0) {
    				if(this.fullNames[fullName] == undefined) {

    					this.fullNames[fullName] = 1
    				}
    				else
    					this.fullNames[fullName]++;
    			}
    			

    			var lastName = this.temp[i].substring(0, this.temp[i].search(","));
    			if(lastName.trim().length > 0) {
    			    //console.log(this.lastNames[lastName.trim()]);
    				if(this.lastNames[lastName.trim()] == undefined)
    					this.lastNames[lastName.trim()] = 1
    				else
    					this.lastNames[lastName.trim()]++;
    			}

    			var firstName = this.temp[i].substring(this.temp[i].search(", ")+2, index);
    			if(firstName.length > 0) {
    				if(this.firstNames[firstName] == undefined)
    					this.firstNames[firstName] = 1
    				else
    					this.firstNames[firstName]++;
    			}	

    			
    			if(this.firstNames[firstName] == 1 && this.lastNames[lastName] == 1 && j < UNIQUENAMES) {
    				this.uniqueNames.push(fullName);
    				j++;
    			} 	
    			
    		}
    	}
    	}

    	if(this.modifiedNames.length <= 0) {
	    	var arr = [];
	    	for(var i=0;i<this.uniqueNames.length;i++) {
	    		var str = [];
	    		str = this.uniqueNames[i].split(",");
	    		arr.push(str);
	    	}

	    	var temp = "";
	    	for(var i=0;i<this.uniqueNames.length;i++) {
	    		if(i == 0)
					temp = arr[i][0];
				if(i < this.uniqueNames.length-1) {
					arr[i][0] = arr[i+1][0];
				}
				else {
					arr[i][0] = temp;
				}
	    	}

	    	for(var i=0;i<this.uniqueNames.length;i++) {
				var joined = arr[i][0] + ", " + arr[i][1];
				this.modifiedNames.push(joined);
			}
		}

		this.fullNamesLength = Object.keys(this.fullNames).length;
		this.firstNamesLength = Object.keys(this.firstNames).length;
		this.lastNamesLength = Object.keys(this.lastNames).length;

		this.lastNameTuples = [];
		this.firstNameTuples = [];

		for (var key in this.lastNames)  { this.lastNameTuples.push([key, this.lastNames[key]]); }

		

		this.lastNameTuples.sort(function(a,b) {
			a = a[1];
		    b = b[1];

		    return a > b ? -1 : (a < b ? 1 : 0);
		})

		this.lastNameTuples = this.lastNameTuples.slice(0, 10);

		for (var key in this.firstNames) this.firstNameTuples.push([key, this.firstNames[key]]);

		this.firstNameTuples.sort(function(a,b) {
			a = a[1];
		    b = b[1];

		    return a > b ? -1 : (a < b ? 1 : 0);
		});

		this.firstNameTuples = this.firstNameTuples.slice(0, 10);


	
	});

	var blob = file.slice(start, stop);
	reader.readAsBinaryString(blob);
	
	}
}
