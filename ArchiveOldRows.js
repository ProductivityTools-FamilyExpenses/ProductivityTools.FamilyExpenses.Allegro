function runner1() {
  var trixUrl = "https://docs.google.com/spreadsheets/d/1sBC7PWM7DkCA4smf11Gg59tWT5R7JRIRaWqqpkIYgw8/edit?gid=0#gid=0"
  archiveElementsRowsOlderThan4Monhts(trixUrl)
}
function archiveElementsRowsOlderThan4Monhts(trixUrl) {
  var sheetpurchases = getSheet(trixUrl, "Purchases")
  var sheetArchive = getSheet(trixUrl, "Archive")
  var data = sheetpurchases.getDataRange().getValues();
  for (i = data.length - 1; i > 1; i--) {
    var purchaseDate = data[i][0]
    var referencedate = new Date();
    referencedate.setMonth(referencedate.getMonth() - 2);
    if (purchaseDate < referencedate) {
      var rng = sheetpurchases.getRange(i, 1, 1, 8)
      var rangeArray = rng.getValues();
      sheetArchive.appendRow([rangeArray[0][0].toISOString().split('T')[0]].concat(rangeArray[0].slice(1, 9)));
      sheetpurchases.deleteRow(i);
      console.log(rangeArray)
    }
  }
  sort(trixUrl)
}


function sort(trixUrl) {
  var sheetpurchases = getSheet(trixUrl, "Purchases")
  var data = sheetpurchases.getRange('Archive!A:H')
  data.sort(1);
}