///////////////////////////////////////////////////////////////////////////////
// STYLE DECLARATION
// Use double quotes in JavaScript


// To include files for VS to understand and query them, use this syntax..
///<reference path="FCUtils.js" />

// Define the console if not already defined
if (!window.console) console = { log: function () { } };


///////////////////////////////////////////////////////////////////////////////
// USAGE NOTES
//
// Assumption: 
// ASP.Net (or other source) has created a page with potentially many rows.
// The table must be made sortable by clicking on the header cell, 
// and page-able.
//
// This code assumes:
//  - The header of the table is the first row, row[0].
//  - The functions expect raw HTML objects, not JQuery wrapped objects as
//    arguments, so pass $("object").get(0) rather than $("object").
//  - Rows are similar in structure, same types in columns.



///////////////////////////////////////////////////////////////////////////////
// Global Namespace for this application
//
var nz = nz || {};

if (fc.utils.isInvalidVar(nz.pagsort)) { nz.pagsort = new Object(); }
if (fc.utils.isInvalidVar(nz.pagsort.config)) { nz.pagsort.config = new Object(); }


///////////////////////////////////////////////////////////////////////////////
// Constants




///////////////////////////////////////////////////////////////////////////////
// Initialisation
//

nz.pagsort.config.bLog = true; // Set false once code stabilised
nz.pagsort.config.pageSizeDefault = 30; //
nz.pagsort.config.paginateRowSuffix = "_pagRow";
nz.pagsort.config.paginateCellSpacer1Suffix = "_pagCellSpacer1";
nz.pagsort.config.paginateCellSpacer2Suffix = "_pagCellSpacer2";
nz.pagsort.config.paginateCellRowsPerPageSuffix = "_pagCellTextboxRowsPerPage";

// VISIBLE TEXT
nz.pagsort.config.textBtnOk = "Page";
nz.pagsort.config.textRowsPerPage = "Rows:"
nz.pagsort.config.textBtnFirst = "<<";
nz.pagsort.config.textBtnPrevious = "<";
nz.pagsort.config.textBtnNext = ">";
nz.pagsort.config.textBtnLast = ">>";

// TOOLTIPS
nz.pagsort.config.tooltipBtnOk = "OK";
nz.pagsort.config.tooltipRowsPerPage = "Rows Per Page"
nz.pagsort.config.tooltipTextboxRowsPerPage = "Set the number of rows per page and click OK to refresh.";
nz.pagsort.config.tooltipBtnFirst = "First Page";
nz.pagsort.config.tooltipBtnPrevious = "Previous Page";
nz.pagsort.config.tooltipBtnNext = "Next Page";
nz.pagsort.config.tooltipBtnLast = "Last Page";
nz.pagsort.config.tooltipTextboxCurrentPage = "Current Page";







nz.pagsort.init = function () {
    var prefix = "nz.pagsort.init() - "
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");


    ///////////
    // BEGIN

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}

//$(window).load(nz.pagsort.init);
whenReady(nz.pagsort.init);



/////////////
// HANDLERS
//

nz.pagsort.btnOk_onClick = function (table) {
    var prefix = "nz.pagsort.btnOk_onClick() - "
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");
    
    nz.pagsort.applyPagination(table);

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}


nz.pagsort.btnFirst_onClick = function (table) {
    var prefix = "nz.pagsort.btnFirst_onClick() - "
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    // If not on page 1, set current page to 1, apply pagination;
    if (nz.pagsort.config[table.id].currentPage != 1) {
        nz.pagsort.setCurrentPage(table, 1);
        nz.pagsort.applyPagination(table);
    }
    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}

nz.pagsort.btnPrevious_onClick = function (table) {
    var prefix = "nz.pagsort.btnPrevious_onClick() - "
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    // If current page greater than 1, retard value, apply pagination

    if (nz.pagsort.config[table.id].currentPage > 1) {
        nz.pagsort.setCurrentPage(table, nz.pagsort.config[table.id].currentPage - 1);
        nz.pagsort.applyPagination(table);
    }

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}

nz.pagsort.btnNext_onClick = function (table) {
    var prefix = "nz.pagsort.btnNext_onClick() - "
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    // If current page less than max page, advance current page, apply pagination
    var maxPage = nz.pagsort.getMaxPage(table);
    if (nz.pagsort.config[table.id].currentPage < maxPage) {
        nz.pagsort.setCurrentPage(table, nz.pagsort.config[table.id].currentPage + 1);
        nz.pagsort.applyPagination(table);
    }

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}

nz.pagsort.btnLast_onClick = function (table) {
    var prefix = "nz.pagsort.btnLast_onClick() - "
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    // Set current page to last;  Apply pagination;
    var maxPage = nz.pagsort.getMaxPage(table);
    if (nz.pagsort.config[table.id].currentPage != maxPage) {
        nz.pagsort.setCurrentPage(table, maxPage);
        nz.pagsort.applyPagination(table);
    }

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}



nz.pagsort.textboxRowsPerPage_onKeyUp = function (table) {
    var prefix = "nz.pagsort.textboxRowsPerPage_onKeyUp() - "
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    //nz.pagsort.textboxRowsPerPage_onChange(table);

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}

nz.pagsort.textboxRowsPerPage_onChange = function (table) {
    var prefix = "nz.pagsort.textboxRowsPerPage_onChange() - "
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}

nz.pagsort.textboxCurrentPage_onKeyUp = function (table) {
    var prefix = "nz.pagsort.textboxCurrentPage_onKeyUp() - "
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}

nz.pagsort.textboxCurrentPage_onChange = function (table) {
    var prefix = "nz.pagsort.textboxCurrentPage_onChange() - "
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}














////////////
// SORTING
//

nz.pagsort.makeHeaderSortable = function (table) {
    var prefix = "nz.pagsort.makeHeaderSortable() - ";
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    nz.pagsort.config[table.id] = nz.pagsort.config[table.id] || {};

    // Header table should have one row, rows[0].
    // Attach a function to header cell onclick event to trigger sorting.
    var cells = table.rows[0].cells;
    for (var i = 0; i < cells.length; ++i) {
        (function (n) {                                                         // Call this anonymous function with argument i
            cells[i].onclick = function () {                                    // Attach a function with a closed n value to each header's onclick event
                nz.pagsort.sortrowsFlipOrderAndPaginate(table, n);              // Close off an instance of sortrows with value n and make it a fn
            };
        } (i));
    }

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}

nz.pagsort.sortrowsFlipOrderAndPaginate = function(table,n) {
    var prefix = "nz.pagsort.sortrowsFlipOrderAndPaginate() - ";
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    nz.pagsort.sortrowsFlipOrder(table,n);
    nz.pagsort.applyPagination(table);

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}

nz.pagsort.sortrowsFlipOrder = function (table, n, comparator) {
    var prefix = "nz.pagsort.sortrowsFlipOrder() - ";
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    // Setup storage for this column if it does not already exist.
    nz.pagsort.config[table.id][n] = nz.pagsort.config[table.id][n] || {};

    // Start Descending, because we're going to flip the value once, else, get current value.
    nz.pagsort.config[table.id][n].sortOrder = nz.pagsort.config[table.id][n].sortOrder || "DESC";

    // Flip current sort order
    if (nz.pagsort.config[table.id][n].sortOrder == "ASC") {
        nz.pagsort.config[table.id][n].sortOrder = "DESC"
    }
    else {
        nz.pagsort.config[table.id][n].sortOrder = "ASC"
    }

    nz.pagsort.sortrows(table, n, comparator);

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}

nz.pagsort.sortrows = function (table, n, comparator) {
    var prefix = "nz.pagsort.sortrows() - ";
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    //var bColHasControls = nz.pagsort.hasControlsInColumn(table, n); // General case for mixed input controls - not reliable
    var bColIsCheckbox = nz.pagsort.hasControlsInColumn(table, n, "checkbox");
    var bColIsNumeric = nz.pagsort.isColumnNumeric(table, n);

    var sortOrder = nz.pagsort.config[table.id][n].sortOrder;

    // Reference the header row so we can rebuild the table
    // with this row as the first row.
    var rowHeader = table.rows[0];

    // Reference the potentially existent paginate row so that this can 
    // be appended to the end of the table again
    var paginateRowID = table.id + nz.pagsort.config.paginateRowSuffix;
    var paginateRow = document.getElementById(paginateRowID);

    // Do the sort
    var rows = table.getElementsByTagName("tr");                                // Get all rows
    rows = Array.prototype.slice.call(rows, 0);                                 // Convert to array as a snapshot
    var rowsBlank = fc.utils.getBlankRows(rows);                                // Extract all blank rows to another storage object

    rows.sort(function (row1, row2) {
        var cell1 = row1.getElementsByTagName("td")[n];                         // Get nth cell
        var cell2 = row2.getElementsByTagName("td")[n];                         // of both rows

        // Handle undefined cell case
        if (typeof (cell1) == 'undefined' && typeof (cell2) == 'undefined') {
            return 0;
        }
        else if (typeof (cell1) == 'undefined') {                                 // cell2 wins, return 1
            return 1;
        }
        else if (typeof (cell2) == 'undefined') {                                 // cell1 wins, return -1
            return -1;
        }

        // Cells are defined, extract values for comparison
        var val1 = cell1.textContent || cell1.innerText || cell1.innerHTML;
        var val2 = cell2.textContent || cell2.innerText || cell2.innerHTML;

        if (comparator) return comparator(val1, val2); // If you've been passed a fn to use as a comparator, use it

        if (bColIsCheckbox) {
            var ctrl1 = cell1.getElementsByTagName("input");
            var ctrl2 = cell2.getElementsByTagName("input");
            return nz.pagsort.checkboxComparator(ctrl1[0], ctrl2[0]);
        }

        if (bColIsNumeric) return fc.utils.numericComparator(val1, val2);

        // else, do a default comparison
        return fc.utils.defaultComparator(val1, val2);

    }); // end of arrayAll.sort(function(){});

    // If descending, reverse the data array
    if (sortOrder == "DESC") rows.reverse();

    // Append rows into tbody in sorted order.
    // Note that the rows are implicitly removed, and that any nodes that are 
    // not rows <tr> will be above the sorted rows

    table.appendChild(rowHeader);
    var i = 0;
    for (; i < rows.length; i++) {
        if (rows[i] !== rowHeader) {
            table.appendChild(rows[i]); // Put row back into table
        }
    }

    // Add the blank rows back on
    var countBlankRows = rowsBlank.length;
    for (var i = 0; i < countBlankRows; ++i) {
        table.appendChild(rowsBlank[i][0]);
    }

    // Add on the paginate row if it exists
    if (paginateRow !== 'undefined' && paginateRow !== null) {
        table.appendChild(paginateRow);
    }

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");

}   // end of sortrows()


nz.pagsort.isColumnNumeric = function (table, n) {   // where n is the column number

    // Iterate the row, access the cell of column n, if the text of column is not 
    // null, or the empty string, check it for being a number by converting to a Number
    // If it returns NaN, it's not a real number, and this is not a column of numbers

    var countRows = table.rows.length;
    var i = 1;                                                                  // Pagsort variant ignores first row

    var bAllCellsAreNull = true;
    var bAllCellsAreUndefined = true;

    for (; i < countRows; ++i) {
        var row = table.rows[i];
        var cell = row.getElementsByTagName("td")[n];                         // Get nth cell

        if (typeof (cell) != 'undefined') {

            bAllCellsAreUndefined = false;

            var textval = cell.textContent || cell.innerText;

            if (textval != null && textval != "") {

                var nvalue = new Number(textval);

                if (isNaN(nvalue))
                { return false; }                                               // We have text that is not a number, this is not a column of real numberselse
                else
                { bAllCellsAreNull = false; }                                   // Real number            

            }

        }

    } // end of "for (; i < countRows; ++i)", for each row    

    if (bAllCellsAreNull || bAllCellsAreUndefined) // Column of empty cells
        return false;

    return true; // have not exited yet, must have passed all tests
}

// Return true if any cell contains a control, of a optionally specific type
nz.pagsort.hasControlsInColumn = function (table, n, inputType) {   // where n is the column number

    var countRows = table.rows.length;
    var i = 1;                                                                  // Pagsort variant ignores first row

    for (; i < countRows; ++i) {
        var row = table.rows[i];
        var cell = row.getElementsByTagName("td")[n];                         // Get nth cell

        if (typeof (cell) != 'undefined') {
            // Got a cell
            var containedInputControls = cell.getElementsByTagName("input")
            if (containedInputControls.length >= 1) {
                // Got a control of type 'input'
                if (!fc.utils.isValidVar(inputType)) {
                    // We have satisfied the lowest criteria and found an input control, return true
                    return true;
                }
                else {
                    // An input type is defined, so only return true if the control is of this particular type
                    var inputControl = containedInputControls[0];
                    if (inputControl.type == inputType) {
                        return true;
                    }
                }
            }
            else {
            }
        }
    }

    // Not yet exited? No controls (or controls of this particular inputType, if defined) exist
    return false;
}


nz.pagsort.checkboxComparator = function (val1, val2) {
    // val1 and val2 should be the two checkbox controls contained within table cells

    // Null handling
    if (!fc.utils.isValidVar(val1) && !fc.utils.isValidVar(val2))
        return 0;
    if (!fc.utils.isValidVar(val1)) // and implicitly, val2 is not null, val2 is greater, return -1
        return -1;
    if (!fc.utils.isValidVar(val2)) // and implicitly, val1 is not null, val1 is greater, return 1
        return 1;
    // else, we have two valid variables that should refer to checkboxes

    if (!fc.utils.isValidVar(val1.type) && !fc.utils.isValidVar(val2.type))
        return 0;
    if (!fc.utils.isValidVar(val1.type)) // and implicitly, val2 is not null, val2 is greater, return -1
        return -1;
    if (!fc.utils.isValidVar(val2.type)) // and implicitly, val1 is not null, val1 is greater, return 1
        return 1;
    // else, we should have to valid variables that both have types

    if ((val1.checked && val2.checked) ||
        (!val1.checked && !val2.checked)) {
        // If both controls are either both checked or both unchecked, they are equal
        return 0;
    }
    if (val1.checked && !val2.checked) {
        // If val1 is checked (greater), and val2 is un-checked, val1 wins
        return 1;
    }
    if (val2.checked && !val1.checked) {
        // If val2 is checked (greater), and val1 is un-checked, val2 wins
        return -1;
    }
    
    return 0; // Should never get here, but just in case...
}






/////////////
// PAGINATE
//

nz.pagsort.paginate = function (table, pageSize) {
    var prefix = "nz.pagsort.paginate() - ";
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    if (typeof table === 'undefined') {
        if (nz.pagsort.config.bLog) console.error(prefix + "Exiting; The table argument passed was undefined.");
        return;
    }

    // Default syntax; 
    pageSize = (typeof pageSize !== 'undefined') ? pageSize : nz.pagsort.config.pageSizeDefault;

    nz.pagsort.config[table.id] = nz.pagsort.config[table.id] || {};
    nz.pagsort.config[table.id].pageSize = pageSize;
    nz.pagsort.config[table.id].currentPage = nz.pagsort.config[table.id].currentPage || 1; // Default to page 1 (index 0, the start page)

    nz.pagsort.config[table.id].countRows = table.rows.length - 1;
    var countRows = nz.pagsort.config[table.id].countRows;

    if (countRows <= 1) {
        if (nz.pagsort.config.bLog) console.warn(prefix + "Exiting; Table too small to paginate.");
        return;
    }

    nz.pagsort.removePaginateRow(table); // Just in case it exists already
    nz.pagsort.addPaginateRow(table);

    nz.pagsort.applyPagination(table);

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}

nz.pagsort.removePaginateRow = function (table) {
    var prefix = "nz.pagsort.removePaginateRow() - ";
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    if (typeof table === 'undefined') {
        if (nz.pagsort.config.bLog) console.error(prefix + "Exiting; The table argument passed was undefined.");
        return;
    }

    // If a paginate row does not exist, exit out
    var paginateRowID = table.id + nz.pagsort.config.paginateRowSuffix;
    var paginateRow = document.getElementById(paginateRowID);
    if (paginateRow === null) {
        // PaginateRow does not exist
        if (nz.pagsort.config.bLog) console.log(prefix + "Exiting; The paginate row does not exist for this table.");
        return;
    }
    else {
        // PaginateRow exists
        table.removeChild(paginateRow);
        if (nz.pagsort.config.bLog) console.log(prefix + "Exiting; The paginate row existed and was removed for this table.");
    }

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}

nz.pagsort.addPaginateRow = function (table, bLikeHeader) {
    var prefix = "nz.pagsort.addPaginateRow() - ";
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    if (typeof table === 'undefined') {
        if (nz.pagsort.config.bLog) console.error(prefix + "Exiting; The table argument passed was undefined.");
        return;
    }

    // Default syntax; 
    bLikeHeader = (typeof bLikeHeader !== 'undefined') ? bLikeHeader : true; // Default to true

    // If a paginate row exists, exit out
    var paginateRowID = table.id + nz.pagsort.config.paginateRowSuffix;
    var paginateRow = document.getElementById(paginateRowID);
    if (paginateRow !== null) {
        // PaginateRow exists
        if (nz.pagsort.config.bLog) console.log(prefix + "Exiting; The paginate row already exists for this table.");
        return;
    }
    else {
        // PaginateRow does not exist
        var paginateRow = nz.pagsort.createPaginateRow(table, bLikeHeader);

        // Add the row to the bottom of the table.
        table.appendChild(paginateRow);
    }

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}


nz.pagsort.createPaginateRow = function (table, bLikeHeader) {
    var prefix = "nz.pagsort.createPaginateRow() - ";
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    // The function calling this should have checked that the 
    // table exists, and that there is a value in bLikeHeader,
    // and finally that there is not already a paginate row.

    var paginateRowID = table.id + nz.pagsort.config.paginateRowSuffix;
    var rowHeader = table.rows[0];
    var rowFirstData = table.rows[1];

    if (!fc.utils.isValidVar(rowHeader)) {
        if (nz.pagsort.config.bLog) console.error(prefix + "Exiting; Could not retrieve row of index 0 (header row) from table.");
        return;
    }

    if (!fc.utils.isValidVar(rowFirstData)) {
        if (nz.pagsort.config.bLog) console.error(prefix + "Exiting; Could not retrieve row of index 1 (first data row) from table.");
        return;
    }

    var paginateRow = null;
    if (bLikeHeader) {
        paginateRow = rowHeader.cloneNode(true);
    }
    else {
        paginateRow = rowFirstData.cloneNode(true);
    }
    paginateRow.id = paginateRowID;

    // Count cells (or columns); Remove all except one cell; Make first cell span all columns; 
    var countColumns = paginateRow.cells.length;
    while (paginateRow.cells.length > 1) {
        paginateRow.deleteCell(0);
    }
    paginateRow.cells[0].colSpan = countColumns;

    // Create paginate row controls
    nz.pagsort.createPaginateRowControls(table,paginateRow.cells[0]);

    return paginateRow;

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}

nz.pagsort.createPaginateRowControls = function (table, paginateCell) {
    var prefix = "nz.pagsort.createPaginateRowControls() - ";
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    // Clear out whatever is in the cell
    while (paginateCell.firstChild) {
        paginateCell.removeChild(paginateCell.firstChild);
    }

    // Create OK button
    var btnOkTextNode = document.createTextNode(nz.pagsort.config.textBtnOk);
    var btnOk = document.createElement("input");
    btnOk.appendChild(btnOkTextNode);
    btnOk.value = nz.pagsort.config.textBtnOk
    btnOk.onclick = function () { nz.pagsort.btnOk_onClick(table); };
    btnOk.type = "button";
    btnOk.className = "buttonPagCell buttonPagCellOK";
    btnOk.title = nz.pagsort.config.tooltipBtnOk;
    paginateCell.appendChild(btnOk);

    // Add Spacer Div
    var divSpacer1 = document.createElement("div");
    // Apply some default style info to make the div a spacing element
    divSpacer1.id = table.id + nz.pagsort.config.paginateCellSpacer1Suffix;
    divSpacer1.className = "divPagCellSpacer divPagCellSpacer1";
    paginateCell.appendChild(divSpacer1);

    // Add Label for Rows Per Page
    var lblRowsPerPageTextNode = document.createTextNode(nz.pagsort.config.textRowsPerPage);
    var lblRowsPerPage = document.createElement("label");
    lblRowsPerPage.appendChild(lblRowsPerPageTextNode);
    paginateCell.appendChild(lblRowsPerPage);

    // Add Textbox for Rows Per Page
    // If page size is not yet set, use default
    nz.pagsort.config[table.id].pageSize = nz.pagsort.config[table.id].pageSize || nz.pagsort.config.pageSizeDefault;
    var textboxRowsPerPage = document.createElement("input");
    textboxRowsPerPage.type = "text";
    textboxRowsPerPage.id = table.id + nz.pagsort.config.paginateCellRowsPerPageSuffix;
    textboxRowsPerPage.className = "textboxPagCell textboxPagCellRowsPerPage";
    textboxRowsPerPage.title = nz.pagsort.config.tooltipTextboxRowsPerPage;
    textboxRowsPerPage.value = nz.pagsort.config[table.id].pageSize;
    textboxRowsPerPage.onkeypress = fc.utils.isNumericKey;
    textboxRowsPerPage.onkeyup = function () { nz.pagsort.textboxRowsPerPage_onKeyUp(table); };
    textboxRowsPerPage.onchange = function () { nz.pagsort.textboxRowsPerPage_onChange(table); };

    paginateCell.appendChild(textboxRowsPerPage);

    // Add Spacer Div
    var divSpacer2 = document.createElement("div");
    // Apply some default style info to make the div a spacing element
    divSpacer2.id = table.id + nz.pagsort.config.paginateCellSpacer2Suffix;
    divSpacer2.className = "divPagCellSpacer divPagCellSpacer2";
    paginateCell.appendChild(divSpacer2);

    // First button
    var btnFirstTextNode = document.createTextNode(nz.pagsort.config.textBtnFirst);
    var btnFirst = document.createElement("input");
    btnFirst.appendChild(btnFirstTextNode);
    btnFirst.value = nz.pagsort.config.textBtnFirst;
    btnFirst.onclick = function () { nz.pagsort.btnFirst_onClick(table); };
    btnFirst.type = "button";
    btnFirst.className = "buttonPagCell buttonPagCellFirst";
    btnFirst.title = nz.pagsort.config.tooltipBtnFirst;
    paginateCell.appendChild(btnFirst);

    // Previous button
    var btnPreviousTextNode = document.createTextNode(nz.pagsort.config.textBtnPrevious);
    var btnPrevious = document.createElement("input");
    btnPrevious.appendChild(btnPreviousTextNode);
    btnPrevious.value = nz.pagsort.config.textBtnPrevious;
    btnPrevious.onclick = function () { nz.pagsort.btnPrevious_onClick(table); };
    btnPrevious.type = "button";
    btnPrevious.className = "buttonPagCell buttonPagCellPrevious";
    btnPrevious.title = nz.pagsort.config.tooltipBtnPrevious;
    paginateCell.appendChild(btnPrevious);


    // Add Textbox for Current Page
    // If page size is not yet set, use default
    nz.pagsort.config[table.id].currentPage = nz.pagsort.config[table.id].currentPage || 1;
    var textboxCurrentPage = document.createElement("input");
    textboxCurrentPage.type = "text";
    textboxCurrentPage.id = table.id + nz.pagsort.config.paginateCellCurrentPageSuffix;
    textboxCurrentPage.title = nz.pagsort.config.tooltipTextboxCurrentPage;
    textboxCurrentPage.className = "textboxPagCell textboxPagCellCurrentPage";
    textboxCurrentPage.value = nz.pagsort.config[table.id].currentPage;
    textboxCurrentPage.onkeypress = fc.utils.isNumericKey;
    textboxCurrentPage.onkeyup = function () { nz.pagsort.textboxCurrentPage_onKeyUp(table); };
    textboxCurrentPage.onchange = function () { nz.pagsort.textboxCurrentPage_onChange(table); };
    paginateCell.appendChild(textboxCurrentPage);


    // Next button
    var btnNextTextNode = document.createTextNode(nz.pagsort.config.textBtnNext);
    var btnNext = document.createElement("input");
    btnNext.appendChild(btnNextTextNode);
    btnNext.value = nz.pagsort.config.textBtnNext;
    btnNext.onclick = function () { nz.pagsort.btnNext_onClick(table); };
    btnNext.type = "button";
    btnNext.className = "buttonPagCell buttonPagCellNext";
    btnNext.title = nz.pagsort.config.tooltipBtnNext;
    paginateCell.appendChild(btnNext);

    // Last button
    var btnLastTextNode = document.createTextNode(nz.pagsort.config.textBtnLast);
    var btnLast = document.createElement("input");
    btnLast.appendChild(btnLastTextNode);
    btnLast.value = nz.pagsort.config.textBtnLast;
    btnLast.onclick = function () { nz.pagsort.btnLast_onClick(table); };
    btnLast.type = "button";
    btnLast.className = "buttonPagCell buttonPagCellLast";
    btnLast.title = nz.pagsort.config.tooltipBtnLast;
    paginateCell.appendChild(btnLast);


    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}



nz.pagsort.applyPagination = function (table) {
    var prefix = "nz.pagsort.applyPagination() - ";
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    // Get and Clean the page size 
    var pageSize = nz.pagsort.getRowsPerPage(table);
    if (pageSize == 0) {
        pageSize = nz.pagsort.config[table.id].pageSize || nz.pagsort.config.pageSizeDefault;
    }

    nz.pagsort.setRowsPerPage(table, pageSize);

    // Get and Clean the current page 
    var maxPage = nz.pagsort.getMaxPage(table);
    var currentPage = nz.pagsort.getCurrentPage(table);
    if (currentPage <= 0) {
        currentPage = 1;
    }
    else if (currentPage >= maxPage) {
        currentPage = maxPage;
    }

    nz.pagsort.setCurrentPage(table, currentPage);

    var countRows = nz.pagsort.config[table.id].countRows;
    pageSize = nz.pagsort.config[table.id].pageSize;
    currentPage = nz.pagsort.config[table.id].currentPage;

    // Dump the settings
    if (nz.pagsort.config.bLog) console.log(prefix +
        "pageSize=" + pageSize +
        ", countRows=" + countRows +
        ", currentPage=" + currentPage
    );


    // Show or Hide rows dependent on current settings
    var i = 1; // Start at row[1], as row[0] is the header
    var end = table.rows.length - 1; // last row is the paginate control row
    for (; i < end; ++i) {
        var currentRow = table.rows[i];
        var pageIndex = Math.floor((i - 1) / pageSize);
        if ((pageIndex + 1) == currentPage) {
            // Show row
            currentRow.style.display = "table-row";
        }
        else {
            // Hide row
            currentRow.style.display = "none";
        }
    }

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}

nz.pagsort.getMaxPage = function (table) {
    var prefix = "nz.pagsort.getMaxPage() - ";
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    var rows = nz.pagsort.config[table.id].countRows;
    var rowsPerPage = nz.pagsort.config[table.id].pageSize;
    var maxPage = 1 + Math.floor((rows - 1) / rowsPerPage);

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting; Returning maxPage=" + maxPage);

    return maxPage;
}

nz.pagsort.setCurrentPage = function (table, currentPage) {
    var prefix = "nz.pagsort.setCurrentPage() - ";
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    if (currentPage < 1) {
        currentPage = 1;
    }
    else {
        var maxPage = nz.pagsort.getMaxPage(table);
        if (currentPage > maxPage) {
            currentPage = maxPage;
        }
    }

    nz.pagsort.config[table.id].currentPage = currentPage;

    var textboxCurrentPageID = table.id + nz.pagsort.config.paginateCellCurrentPageSuffix;
    var textbox = document.getElementById(textboxCurrentPageID);
    if (textbox !== null) {
        textbox.value = currentPage;
    }
    else {
        if (nz.pagsort.config.bLog) console.error(prefix + "Could not get reference to CurrentPage textbox.");
    }
    
    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}

nz.pagsort.setRowsPerPage = function (table, rowsPerPage) {
    var prefix = "nz.pagsort.setRowsPerPage() - ";
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    if (rowsPerPage < 1) {
        rowsPerPage = 1;
    }

    nz.pagsort.config[table.id].pageSize = rowsPerPage;

    var textboxRowsPerPageID = table.id + nz.pagsort.config.paginateCellRowsPerPageSuffix;
    var textbox = document.getElementById(textboxRowsPerPageID);
    if (textbox !== null) {        
        textbox.value = rowsPerPage;
    }
    else {
        if (nz.pagsort.config.bLog) console.error(prefix + "Could not get reference to RowsPerPage textbox.");
    }

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting");
}

nz.pagsort.getRowsPerPage = function (table) {
    var prefix = "nz.pagsort.getRowsPerPage() - "
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    var iRowsPerPage = 0;

    var textboxRowsPerPageID = table.id + nz.pagsort.config.paginateCellRowsPerPageSuffix;
    var textbox = document.getElementById(textboxRowsPerPageID);
    if (textbox !== null) {
        var containedText = textbox.value;
        if (containedText.length > 0) {
            // There is text in the textbox
            iRowsPerPage = Math.floor(parseFloat(containedText));
            if (isNaN(iRowsPerPage)) {
                // Not a number
                if (nz.pagsort.config.bLog) console.log(prefix + "Text in RowsPerPage textbox >" + containedText + "< could not be converted to an integer; Using default.");
                iRowsPerPage = 0;
            }
        }
    }
    else {
        if (nz.pagsort.config.bLog) console.error(prefix + "Could not retrieve textboxRowsPerPage using id=" + textboxRowsPerPageID);
    }

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting; Returning iRowsPerPage=" + iRowsPerPage);
    return iRowsPerPage;
}


nz.pagsort.getCurrentPage = function (table) {
    var prefix = "nz.pagsort.getCurrentPage() - "
    if (nz.pagsort.config.bLog) console.log(prefix + "Entering");

    var iCurrentPage = 0;

    var textboxCurrentPageID = table.id + nz.pagsort.config.paginateCellCurrentPageSuffix;
    var textbox = document.getElementById(textboxCurrentPageID);
    if (textbox !== null) {
        var containedText = textbox.value;
        if (containedText.length > 0) {
            // There is text in the textbox
            iCurrentPage = Math.floor(parseFloat(containedText));
            if (isNaN(iCurrentPage)) {
                // Not a number
                if (nz.pagsort.config.bLog) console.log(prefix + "Text in CurrentPage textbox >" + containedText + "< could not be converted to an integer; Using default.");
                iCurrentPage = 0;
            }
        }
    }
    else {
        if (nz.pagsort.config.bLog) console.error(prefix + "Could not retrieve textboxCurrentPage using id=" + textboxCurrentPageID);
    }

    if (nz.pagsort.config.bLog) console.log(prefix + "Exiting; Returning iCurrentPage=" + iCurrentPage);
    return iCurrentPage;
}

///////////////////////////////////////////////////////////////////////////////
// GARBAGE
//


