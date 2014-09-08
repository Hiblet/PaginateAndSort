///////////////////////////////////////////////////////////////////////////////
// STYLE DECLARATION
// Use double quotes in JavaScript


// To include files for VS to understand and query them, use this syntax..
///<reference path="FCUtils.js" />

// Define the console if not already defined
if (!window.console) console = { log: function () { } };


///////////////////////////////////////////////////////////////////////////////
// Global Namespace for this application
//
var nz = nz || {};

if (fc.utils.isInvalidVar(nz.home)) { nz.home = new Object(); }
if (fc.utils.isInvalidVar(nz.home.config)) { nz.home.config = new Object(); }


///////////////////////////////////////////////////////////////////////////////
// Constants




///////////////////////////////////////////////////////////////////////////////
// Initialisation
//

nz.home.init = function () {
    var prefix = "nz.home.init() - "
    console.log(prefix + "Entering");

    /*
    var table = $("[id*=resultsTable]")
    if (fc.utils.isValidVar(table.get(0))) {
        nz.pagsort.makeHeaderSortable(table.get(0));
        nz.pagsort.paginate(table.get(0));
    }
    */
    
    
    var table = document.getElementById("resultsTable_divResults");
    if (table != null) {
        nz.pagsort.makeHeaderSortable(table);
        nz.pagsort.paginate(table);
    }
    

    //////////////////////
    // HANDLERS HOOK UP

    nz.home.hookupHandlers();


    /////////////////////////
    // INTERNAL CONSISTENCY


    ///////////
    // BEGIN

    console.log(prefix + "Exiting");
}

//$(window).load(nz.home.init);
whenReady(nz.home.init);


nz.home.hookupHandlers = function () {

    //////////////////////
    // HANDLERS HOOK UP
    //

}
