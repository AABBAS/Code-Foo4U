function LicensePlateManufacturer(container) {
	
	this.container = container;
	this.population = 0;
	
	this.numberOfLetters = 0;
	this.numberOfNumbers = 0;
	
	this.render();	
}

LicensePlateManufacturer.prototype.render = function() {
	
	var licensePlateManufacturer = this;
	
	this.populationEntry = $('<input>').attr('type','text').keyup(function() {
		if ($(this).val().length <= 0) {
			licensePlateManufacturer.recalculateForPopulation(0);
		} else {
			licensePlateManufacturer.recalculateForPopulation($(this).val());
		}
	}).appendTo(this.container);
	
	this.container.append($('<br/>'));
	
	this.container.append($('<span>').text('Pattern : '));
	this.patternString = $('<span>').appendTo(this.container);

	this.container.append($('<br/>'));
	
	this.container.append($('<span>').text('Total Plates : '));
	this.totalPlatesString = $('<span>').appendTo(this.container);
	
	this.container.append($('<br/>'));
	
	this.container.append($('<span>').text('Excess Plates : '));
	this.excessPlatesString = $('<span>').appendTo(this.container);
	
	this.container.append($('<br/>'));
}

LicensePlateManufacturer.prototype.getNumberOfPlates = function(numberOfLetters, numberOfNumbers) {
	
	var number = 0;
	
	if (numberOfLetters > 0) {
		number += Math.pow(26, numberOfLetters);
	}
	
	if (numberOfNumbers > 0) {
		number += Math.pow(10, numberOfNumbers);
	}
	
	return number;
	
}

LicensePlateManufacturer.prototype.getExcessPlates = function(numberOfPlates) {
	return this.population - numberOfPlates;
}

LicensePlateManufacturer.prototype.recalculateForPopulation = function(population) {
	
	this.numberOfLetters = 0;
	this.numberOfNumbers = 0;
	this.population = population;
	
	this.numberOfLetters = parseInt(this.population).toString(26).length;
	this.worstCaseNumberLicenses = this.getNumberOfPlates(this.numberOfLetters, this.numberOfNumbers);
	this.smallestExcessPlates = this.getExcessPlates(this.worstCaseNumberLicenses);
	
	console.log("worst case scenario : " + this.numberOfLetters + " letter license plates for a total of " + this.worstCaseNumberLicenses + " licenses");
	console.log("smallest number of exccess plates : " + this.smallestExcessPlates);
	
	var currentNumberOfPlates = this.worstCaseNumberLicenses;
	var count = 0;
	
	if (this.population > 0) {	
		do {

			var tempNumberLicenses = this.getNumberOfPlates(this.numberOfLetters, this.numberOfNumbers );
			var tempExcessLicenses = this.getExcessPlates(tempNumberLicenses);
			

			if (tempNumberLicenses < this.population) {
				this.numberOfNumbers++;
				
				tempNumberLicenses = this.getNumberOfPlates(this.numberOfLetters, this.numberOfNumbers );
				tempExcessLicenses = this.getExcessPlates(tempNumberLicenses);
			}
				
			while (tempExcessLicenses < -26 && this.numberOfNumbers > 0) {
				this.numberOfLetters++;
				this.numberOfNumbers--;
				
				tempNumberLicenses = this.getNumberOfPlates(this.numberOfLetters, this.numberOfNumbers );
				tempExcessLicenses = this.getExcessPlates(tempNumberLicenses);
				
			}
			
			while (tempExcessLicenses >= -25 && tempExcessLicenses <= -10 && this.numberOfLetters > 0) {
				this.numberOfLetters--;
				this.numberOfNumbers++;
						
				tempNumberLicenses = this.getNumberOfPlates(this.numberOfLetters, this.numberOfNumbers );
				tempExcessLicenses = this.getExcessPlates(tempNumberLicenses);
			}
			
			count++;
		} while((tempExcessLicenses > 0 || tempExcessLicenses < -26) && count < 1000);
	}
	
	this.displayResults();
	
	console.log(this.numberOfLetters, this.numberOfNumbers, this.getExcessPlates(this.getNumberOfPlates(this.numberOfLetters, this.numberOfNumbers)) + " excess");
}

LicensePlateManufacturer.prototype.displayResults = function() {
	this.excessPlatesString.text(Math.abs(this.getExcessPlates(this.getNumberOfPlates(this.numberOfLetters, this.numberOfNumbers))));
	this.totalPlatesString.text(this.getNumberOfPlates(this.numberOfLetters, this.numberOfNumbers));
	this.patternString.text(this.numberOfLetters + " letters and " + this.numberOfNumbers + " numbers");
}