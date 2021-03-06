HSBC Statement Parser - HTML to CSV
===========

Converts HSBC monthly statement HTML to CSV for spreadsheets

Requires Node.js to run. Everything happens on your local computer - no security issues to worry about.

Steps:

1. Download this repository to your computer.
1. Run `npm install` in the folder.
1. Make a `resources` folder, and `statements` folder inside that.
1. On the HSBC website, sign in and go to the required account
1. Go to the Previous Statements section, click a month.
1. In the browser, click `File -> Save as`, and save the HTML to the `resources/statements` folder.
1. In the terminal, run `node parseHTML.js` - this will generate a CSV file in the resources folder.

Open the CSV in a spreadsheet app such as Excel or Google Sheets.

You can save as many statements to the `resources/statements` folder as you want, the script will make one CSV file out of all them.

This is not endorsed in any way by HSBC - use at your own risk.
