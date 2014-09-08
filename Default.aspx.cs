using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{

    private static Random _seed = new Random();


    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            displayResults(divResults);
        }

    }

    ////////////
    // HELPERS

    private void displayResults(System.Web.UI.HtmlControls.HtmlContainerControl parent)
    {
        // Build a table to display
        Table tableResults = new Table();
        tableResults.CssClass = "tbResults";
        tableResults.ID = "resultsTable_" + parent.ID;

        ///////////////////////////////////////////////////////////////////////
        // HEADER ROW
        //

        TableRow rowHeader = new TableRow();
        rowHeader.CssClass = "trResults";

        // Column1
        TableCell cellHeaderColumn1 = new TableCell();
        cellHeaderColumn1.CssClass = "tdResultsHeader";
        cellHeaderColumn1.Text = "Column1";
        rowHeader.Cells.Add(cellHeaderColumn1);

        // Column2
        TableCell cellHeaderColumn2 = new TableCell();
        cellHeaderColumn2.CssClass = "tdResultsHeader";
        cellHeaderColumn2.Text = "Column2";
        rowHeader.Cells.Add(cellHeaderColumn2);

        // Column3
        TableCell cellHeaderColumn3 = new TableCell();
        cellHeaderColumn3.CssClass = "tdResultsHeader";
        cellHeaderColumn3.Text = "Column3";
        rowHeader.Cells.Add(cellHeaderColumn3);

        // Expiration
        TableCell cellHeaderColumn4 = new TableCell();
        cellHeaderColumn4.CssClass = "tdResultsHeader";
        cellHeaderColumn4.Text = "Column4";
        rowHeader.Cells.Add(cellHeaderColumn4);


        // Attach the Header Row
        tableResults.Rows.Add(rowHeader);




        ///////////////////////////////////////////////////////////////////////
        // DATA ROWS
        //
        int i = 0;
        for (; i < 5000 ; ++i)
        {
            TableRow rowData = new TableRow();
            rowData.CssClass = "trResults";


            // Column1 Checkbox
            CheckBox checkboxColumn1 = new CheckBox();
            checkboxColumn1.TabIndex = 0;
            checkboxColumn1.AutoPostBack = false;

            // ID should be unique, so parent ID is used as a composite
            string symbol = "Symbol" + i.ToString();
            checkboxColumn1.ID = "checkbox_" + parent.ID + symbol;

            // Code on the symbol to make it easy to recover in client-side JavaScript
            // In JS, the checkbox attribute is accessible as $(checkboxID).attr("Symbol");
            checkboxColumn1.InputAttributes.Add("Symbol", symbol);

            // Column1 Cell - Checkbox
            TableCell cellDataColumn1 = new TableCell();
            cellDataColumn1.CssClass = "tdResultsData";
            cellDataColumn1.Controls.Add(checkboxColumn1);
            rowData.Cells.Add(cellDataColumn1);

            // Column2 - Random AlphaNumeric
            TableCell cellDataColumn2 = new TableCell();
            cellDataColumn2.CssClass = "tdResultsData";
            string column2 = getRandomString(3,16);
            cellDataColumn2.Text = column2;
            rowData.Cells.Add(cellDataColumn2);

            // Column3 - Random numeric
            TableCell cellDataColumn3 = new TableCell();
            cellDataColumn3.CssClass = "tdResultsData";
            string Column3 = getRandomNumber(20,100,2);
            cellDataColumn3.Text = Column3;
            rowData.Cells.Add(cellDataColumn3);

            // Column4 - RowNumber
            TableCell cellDataColumn4 = new TableCell();
            cellDataColumn4.CssClass = "tdResultsData";
            string Column4 = (i + 1).ToString();
            cellDataColumn4.Text = Column4;
            rowData.Cells.Add(cellDataColumn4);

            tableResults.Rows.Add(rowData);
        }

        parent.InnerHtml = "";
        parent.Controls.Add(tableResults);
    }

    private string getRandomString(
        int minLength, int maxLength,
        string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
    {
        int rLength = _seed.Next(minLength, maxLength + 1);

        char[] arrChar = new char[rLength];
        int i = 0;
        for (; i < rLength; ++i)
        {
            arrChar[i] = chars[_seed.Next(chars.Length)];
        }

        return new String(arrChar);
    }

    private string getRandomNumber(double min, double max, int decPlaces)
    {
        if (decPlaces < 0)
            return "0.0";

        double fScaleFactor = Math.Pow(10.0, (double)(decPlaces));
        int iScaleFactor = (int)fScaleFactor;

        double minScaled = min * fScaleFactor;
        double maxScaled = max * fScaleFactor;
        int iMinScaled = (int)minScaled;
        int iMaxScaled = (int)maxScaled;

        int iRandom = _seed.Next(iMinScaled, iMaxScaled);
        double fRandom = (double)iRandom / fScaleFactor;
        return fRandom.ToString();
    }

}