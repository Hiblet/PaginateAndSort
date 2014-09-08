
# PaginateAndSort
For a simple HTML table, add sorting and paging.  Objective was to make this a lightweight alternative to ASP server side paging and sorting.

##Overview
This is a native JavaScript project to add sorting and paging to a simple HTML table.

Sorting is activated by clicking on the header cell for a column.  A second click reverses the sort order. 

The current iteration supports and auto-detects numeric, alphabetic and checkbox columns.

A footer cell is dynamically created and filled with simple controls to allow the user set page size, and navigate to a chosen page.

##Why you might want to use it
If your code is not relying heavily on frameworks, and you need a light weight cross-browser implementation of paging and sorting, this might be a good starting point.

##Example Usage
Assumption: You have a HTML table where the first row is the header, and the rows are similar.  The table has a known ID.

In Javascript, get a reference to the table and run two functions on it:

```javascript
    
    var table = document.getElementById('myHtmlTable');
    if (table != null) {
        nz.pagsort.makeHeaderSortable(table);
        nz.pagsort.paginate(table);
    }
```   

The Javascript applies classNames to the dynamically created page controls.  These can be set in CSS to force the controls to your common styles.

Console logging is on by default but has a control flag to turn it off for production.

Visible text and tooltip content are all defined at the start of the PaginateAndSort.js file.


##Getting Started
 - Add the PaginateAndSort.js and FCUtils.js files to your project
 - Reference them in the header of your HTML page, as you would do for any Javascript file.
 - Consult the Default.css file and implement any styles to set the buttons and textboxes how you like them.
 - Update your page's Javascript to run the two functions 
 -- nz.pagsort.makeHeaderSortable() and nz.pagsort.paginate() -- at the start.
 - Set the text that appears in the buttons and tooltips to be what you want, in the variable definitions at the top of PaginateAndSort.js
 - Go through a debug loop making sure everything is working how you want.
 - When happy, set the logging flag (nz.pagsort.config.bLog) to false.

##Usage
Use how you see fit, any way you like, but please give credit if it has been useful.

##Implementation
 - Pagination is achieved by showing/hiding rows.
 - Sorting uses custom comparators allowing possible extension with a bit of work.

##Limitations and Expansion
 - Currently this only supports the sorting of checkboxes, and this could be expanded for other contained controls, but I have no need for that at the moment.
 - Speed is very acceptable. A 5000 row table re-sorted in under 3 seconds on a domestic laptop in Firefox.    


##Credits
Sorting is based on David Flanagan's routines in "Javascript - The Definitive Guide" from O'Reilly.

  