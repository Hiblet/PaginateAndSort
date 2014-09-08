<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

    <%-- Cache control request, force page to be reloaded each time --%>
    <meta http-equiv="expires" content="0" />

    <%-- Apple specific code to over-ride the auto-scaling on iPhone browser--%>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <%-- 
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script> 
    --%>

    <script type="text/javascript" src="<%= ResolveClientUrl("~/js/FCUtils.js") %>"></script>
    <script type="text/javascript" src="<%= ResolveClientUrl("~/js/Default.js") %>"></script>
    <script type="text/javascript" src="<%= ResolveClientUrl("~/js/PaginateAndSort.js") %>"></script>

    <link rel="Stylesheet" type="text/css" href="<%= ResolveClientUrl("~/css/Default.css") %>" />

    <title>Paginate and Sort</title>

</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <%-- Placeholder control for dummy table --%>
        <div runat="server" id="divResults"></div>

    </div>
    </form>
</body>
</html>
