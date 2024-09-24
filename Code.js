function myFunction() {
  var threads = GmailApp.getInboxThreads();
  for (var i = threads.length - 1; i > 0; i--) {
    var thread = threads[i];
    var subject = thread.getFirstMessageSubject();
    if (subject.startsWith("Kupiłeś i zapłaciłeś:")) {
      var messages = thread.getMessages()
      var firstMessage = messages[0];
      const content = firstMessage.getBody();
      const $ = Cheerio.load(content);
      //console.log(content);

      var trixUrl = "https://docs.google.com/spreadsheets/d/1sBC7PWM7DkCA4smf11Gg59tWT5R7JRIRaWqqpkIYgw8/edit?gid=0#gid=0"
      var sheetAccountExpenses = getSheet(trixUrl, "Sheet1")
      //sheetAccountExpenses.appendRow([content])

      // console.log("DDDDD")
      $('[data-cy="offers.table"]').each((index, element) => {
        //console.log(element);
        $(element).find("td").each((index, child) => {
          console.log("TD:", $(child).text().trim())

          $(child).find("span").each((index, span) => {
            //console.log("span:", $(span).text().trim())
          })

          //var rowContent = $(child).text().trim()
          //row.push(rowContent);
        });

      })

      // $("table > tbody > tr > td > table > tbody > tr").each((index, element) => {
      //   // var row = [];
      //   // $(element).find("td").each((index, child) => {
      //   //   var rowContent = $(child).text().trim()
      //   //   row.push(rowContent);
      //   // });
      //   // if (row.length > 0) {
      //   //   data.push(row);
      //   // }
      // });
    }
  }
}

function getSheet(trixUrl, sheetName) {
  var mainsheet = SpreadsheetApp.openByUrl(trixUrl);
  var sheet = mainsheet.getSheetByName(sheetName)
  return sheet;
}