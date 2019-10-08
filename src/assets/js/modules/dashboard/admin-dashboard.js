/**
 * Created by OAFOLABI on 16/07/2018.
 */

$(function () {

    if (!window.google) {
        return;
    }

    google.charts.load('current', {packages: ['corechart']});

    $.ajax("/ics-core-api/v1/reports/assessment")
        .done(function (payload) {
            $("#directAssessmentCount").text(payload.directAssessments);
            $("#payeAssessmentCount").text(payload.payeAssessments);
            $("#totalUnassessedCount").text(payload.unassessedIndividuals + payload.unassessedCorporates);
        })
        .fail(function () {

        });

    $.ajax("/ics-core-api/v1/reports/receipts/issuance")
        .done(function (payload) {
            console.log(payload);
            $("#totalReceiptIssuanceCount").text(payload.totalIssued);
            $("#totalValueOfReceipts").text(formatAmount(payload.totalAmountInKobo / 100));
        })
        .fail(function () {

        });

    $.ajax("/ics-core-api/v1/reports/registration/tax-payers")
        .done(function (payload) {
            google.charts.setOnLoadCallback(function drawChart2() {
                $("#curve_chart").removeClass("hidden");
                $("#graph_preloader").addClass("hidden");
                // var data = google.visualization.arrayToDataTable([
                //     ['Year', 'Individual', 'Corporate'],
                //     ['April', 1000, 400],
                //     ['May', 1170, 460],
                //     ['June', 660, 1120],
                //     ['July', 1030, 1240]
                // ]);

                var data = google.visualization.arrayToDataTable(
                    [['Year', 'Individual', 'Corporate']]
                        .concat(payload.map(function (it) {
                            return [it.monthName, it.value.individual, it.value.corporate];
                        })));

                var options = {
                    title: 'ANSSID Enrollment Performance',
                    curveType: 'function',
                    legend: {position: 'bottom'}
                };

                var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

                chart.draw(data, options);
            });
        })
        .fail(function () {

        });

    $.ajax("/ics-core-api/v1/reports/collections")
        .done(function (payload) {
            $("#myPieChart").removeClass("hidden");
            $("#chart_preloader").addClass("hidden");
            console.log(payload);
            google.charts.setOnLoadCallback(function drawChart2() {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Element');
                data.addColumn('number', 'Percentage');

                // data.addRows([
                //     ['APLUC', 0.38],
                //     ['ANICS', 0.21],
                //     ['TMS', 0.21],
                //     ['HDN', 0.10],
                //     ['AMVAS', 0.10]
                // ]);

                var rows = !payload.vendorCollections ? [] : payload.vendorCollections.map(function (vendorCollection) {
                    return [vendorCollection.vendorName, vendorCollection.collectionInKobo / 100];
                });
                var anics = payload.collectionsWithoutVendorInKobo;
                if (anics) {
                    rows.push(['ANICS', anics / 100]);
                }

                data.addRows(rows);

                // Instantiate and draw the chart.
                var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
                // chart.draw(data, {'title':'How Much Pizza I Ate Last Night',
                //     'width':350,
                //     'height':200});
                chart.draw(data, {'title': 'Revenue Collection by System'});
            });
        })
        .fail(function () {

        });

    $.ajax("/ics-core-api/v1/reports/vendor-requests")
        .done(function (payload) {
            $('.tms-in').text(0);
            $('.apluc-in').text(0);
            $('.amvas-in').text(0);
            $('.hdn-in').text(0);
            payload.forEach(function (it) {
                if (it.vendorName.match(/.*tms.*/i)) {
                    $('.tms-in').text(it.requestCount);
                }
                if (it.vendorName.match(/.*apluc.*/i)) {
                    $('.apluc-in').text(it.requestCount);
                }
                if (it.vendorName.match(/.*amvas.*/i)) {
                    $('.amvas-in').text(it.requestCount);
                }
                if (it.vendorName.match(/.*hdn.*/i)) {
                    $('.hdn-in').text(it.requestCount);
                }
            });
        })
        .fail(function () {

        });

    $.ajax("/v1/reports/notifications/outgoing")
        .done(function (payload) {
            $('.tms-out').text(0);
            $('.apluc-out').text(0);
            $('.amvas-out').text(0);
            $('.hdn-out').text(0);
            payload.forEach(function (it) {
                if (it.vendorName.match(/.*tms.*/i)) {
                    $('.tms-out').text(it.requestCount);
                }
                if (it.vendorName.match(/.*apluc.*/i)) {
                    $('.apluc-out').text(it.requestCount);
                }
                if (it.vendorName.match(/.*amvas.*/i)) {
                    $('.amvas-out').text(it.requestCount);
                }
                if (it.vendorName.match(/.*hdn.*/i)) {
                    $('.hdn-out').text(it.requestCount);
                }
            });
        })
        .fail(function () {

        });

    // google.charts.setOnLoadCallback(drawChart);
    // google.charts.setOnLoadCallback(drawChart2);

    function formatAmount(amount) {
        return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

});