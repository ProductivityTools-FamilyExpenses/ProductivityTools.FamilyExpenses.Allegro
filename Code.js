function myFunction() {
  var threads = GmailApp.getInboxThreads();
  for (var i = threads.length - 1; i > 0; i--) {
    var thread = threads[i];
    var subject = thread.getFirstMessageSubject();
    if (subject.startsWith("Kupiłeś i zapłaciłeś:")) {
      var id = thread.getId()
      var messages = thread.getMessages()
      var firstMessage = messages[0];
      const content = firstMessage.getBody();
      const $ = Cheerio.load(content);
      //console.log(content);

      var trixUrl = "https://docs.google.com/spreadsheets/d/1sBC7PWM7DkCA4smf11Gg59tWT5R7JRIRaWqqpkIYgw8/edit?gid=0#gid=0"
      var sheetAccountExpenses = getSheet(trixUrl, "Sheet1")
      var sheetpurchases = getSheet(trixUrl, "Purchases")
      //sheetAccountExpenses.appendRow([content])
      let price = $('[data-cy="payment.buyerTotalValue"]').text().trim().replace("zł", "").trim().replace(",", ".");
      console.log(price);


      // console.log("DDDDD")
      $('[data-cy="offers.table"]').each((index, element) => {
        //console.log(element);
        var purchaseName = "d";
        var purchaseCost;
        $(element).find("td").each((index, child) => {
          var purchase = $(child).text().trim().toString()
          console.log("TD:", purchase)
          if (purchase) {
            console.log("if", purchase, "X", purchase.indexOf("zł"))
            var indexOfZl = purchase.indexOf("zł")
            if (indexOfZl > -1) {
              console.log("first if")
              purchaseCost = purchase.substring(0, indexOfZl).trim().toString().replace(",", ".")

              var multipleItems = purchase.substring(indexOfZl).replace(/\n/g, "").replace("zł", "").replace("zł", "")
              var multipleItemsSeparator = multipleItems.indexOf("×")
              var multipleItemsAmount = multipleItems.substring(0, multipleItemsSeparator).trim()
              var multipleItemsCost = multipleItems.substring(multipleItemsSeparator + 1).trim().replace(",", ".")

              sheetpurchases.appendRow([id, price, purchaseName, purchaseCost, multipleItems, multipleItemsAmount, multipleItemsCost])

            }
            else {
              console.log("else")
              purchaseName = purchase;
            }
          }
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
