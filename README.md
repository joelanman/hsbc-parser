hsbc-parser
===========

Takes HSBC monthly statement HTML and converts it to CSV for spreadsheets

Requires Node.js to run. Everything happens on your local computer - no security issues to worry about.

Steps:

1. Download this repository to your computer.
2. Log in to your HSBC account, go to your Previous Statements section, click a month.
3. In the browser, click File -> Save as, and save the HTML to the resources/statements folder.
4. You can download as many statements as you want, the script will make one CSV file out of all them.
5. Run 'node parseHTML.js' - this will generate a CSV file in the resources folder.
6. Open the CSV in a spreadsheet app such as Excel or Google drive.
