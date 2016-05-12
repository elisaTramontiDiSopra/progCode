$(function () {

        $('#button1').button({
            icons: {
                primary: "ui-icon-print"
            }
        });

        $('#dialog').dialog({
            autoOpen: false,
            buttons: {
                "OK": function () {
                    $(this).dialog("close");
                }
            },
            show: "fade",
            hide: "drop",
            draggable: true,
            resizable: false,
            modal: true
        });

    });

    // URL of intelligent printer
    var url = 'http://192.168.192.168/cgi-bin/epos/service.cgi?devid=local_printer&timeout=100000';

    function button1_Click() {

        // Create print document
        var req =
            '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
                '<s:Body>' +
                    '<epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print">' +
                        '<text lang="en" smooth="true">Intelligent Printer&#10;</text>' +
                        '<barcode type="ean13" width="2" height="48">201234567890</barcode>' +
                        '<feed unit="24"/>' +
                        '<image width="8" height="48">8PDw8A8PDw/w8PDwDw8PD/Dw8PAPDw8P8PDw8A8PDw/w8PDwDw8PD/Dw8PAPDw8P</image>' +
                        '<cut/>' +
                    '</epos-print>' +
                '</s:Body>' +
            '</s:Envelope>';

        // Send print document
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jan 1970 00:00:00 GMT');
        xhr.onreadystatechange = function () {

            // Receive response document
            if (xhr.readyState == 4) {

                // Parse response document
                if (xhr.status == 200) {
                    var res = xhr.responseXML;
                    $('#result').html(res.getElementsByTagName('response')[0].getAttribute('success'));
                }
                else {
                    $('#result').html('Network error occured.');
                }
                $('#dialog').dialog('open');
            }
        };

        xhr.send(req);
    }
