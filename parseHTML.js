var fs = require('fs'),
	$ = require('jquery'),
	moment = require('moment');

String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};

var parseStatement = function(filename, callback){

	var transactions = [];

	console.log('parseStatement: ' + filename);

	fs.readFile('resources/statements/'+filename, 'UTF8', function(err, data){

		if (err){
			console.log(err);
			return(err);
		}

		var $body = $(data);

		var $possibleDates = $body.find('.hsbcTextRight');

		var year = null;

		$possibleDates.each(function(){

			var dateText = $(this).text().trim();

			var date = moment(dateText, 'DD MMMM YYYY');

			if (date.isValid()){
				year = date.format('YYYY');
				return false;
			}

		});

		console.log('year:' + year);

		var $table = $body.find('.hsbcMainContent table[summary="This table contains a statement of your account"]');

		var currentMonth = null,
			newYear = false;

		$table.find('tbody').find('tr').each(function(){

			var $td = $(this).find('td');

			var dateText = $($td[0]).text().trim(),
				date = moment(dateText + ' ' + year, 'DD MMMM YYYY'),
				dateFormatted = date.format('DD/MM/YYYY'),
				newMonth = date.format('M');

			var transaction = {
				date	: date,
				dateFormatted : dateFormatted,
				type	: $($td[1]).text().trim(),
				title	: $($td[2]).text().trim(),
				paidOut : $($td[3]).text().trim(),
				paidIn	: $($td[4]).text().trim(),
				balance : $($td[5]).text().trim()
			};

			// console.dir(transaction);

			transactions.push(transaction);

			if (newMonth == 1 && currentMonth == 12){
				newYear = true;
			}

			currentMonth = newMonth;

		});

		console.log('newYear: ' + newYear);

		if (newYear){
			transactions.forEach(function(row, index, array){
				if (row.date.format('M') == 12){
					row.date.subtract('years', 1);
					row.dateFormatted = row.date.format('DD/MM/YYYY');
				}
			});
		}
		callback(transactions);
	});
};

var makeCSV = function(){

	var csv = 'date,type,title,paid out,paid in,balance';

	allTransactions.forEach(function(row, index, array){
		csv += "\n" + row.dateFormatted + "," + row.type + "," + row.title + "," + row.paidOut + "," + row.paidIn + "," + row.balance;
	});

	fs.writeFile('resources/statements.csv', csv, function(err){

		if (err){
			console.log(err);
			return(err);
		}
		
		console.log('done!');

	});

};

var statements = fs.readdirSync('resources/statements'),
	statementsDone = 0,
	allTransactions = [];

var statementParsed = function(transactions){
	statementsDone ++;
	allTransactions = allTransactions.concat(transactions);
	console.log('statementParsed: ' + statementsDone + ' of ' + statements.length);
	if (statementsDone == statements.length){

		var dateSort = function(a,b){
			if (a.date > b.date){
				return 1;
			} else {
				return -1;
			}
		};
		allTransactions.sort(dateSort);
		makeCSV();
	}
};

statements.forEach(function(filename, index, array){

	if (filename.indexOf('.html') != filename.length - '.html'.length){
		array.splice(index,1);
	}
});

statements.forEach(function(filename, index, array){
	parseStatement(filename, statementParsed);
});

