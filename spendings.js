const SPENDINGS_ALLEGRO_WEBAPI_URL = "http://34.116.163.207:8086/api/allegro/emails/raw";

function exportAllegroEmailsToSpendingsApi() {
  do {
    var somethingProcessed = sendAllegroRangeEmailsToSpendingsApi(0);
  } while (somethingProcessed);
}

function sendAllegroRangeEmailsToSpendingsApi(startIndex) {
  var threads = GmailApp.getInboxThreads(startIndex, 500);
  var labelImported = GmailApp.getUserLabelByName("FE-Imported");
  var labelProcessed = GmailApp.getUserLabelByName("FE-Processed");
  var result = false;

  for (var i = threads.length - 1; i >= 0; i--) {
    result = true;
    var thread = threads[i];
    var subject = thread.getFirstMessageSubject();

    if (subject.startsWith("Kupiłeś i zapłaciłeś:") || subject.startsWith("Zapłaciłeś")) {
      var threadId = thread.getId();
      var messages = thread.getMessages();
      var firstMessage = messages[0];

      var payload = {
        messageId: firstMessage.getId(),
        threadId: threadId,
        subject: subject,
        emailDate: firstMessage.getDate().toISOString(),
        rawHtml: firstMessage.getBody()
      };

      var options = {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      };

      var response = UrlFetchApp.fetch(SPENDINGS_ALLEGRO_WEBAPI_URL, options);
      var responseCode = response.getResponseCode();

      if (responseCode >= 200 && responseCode < 300) {
        console.log("Successfully sent Allegro email to WebApi:", firstMessage.getId(), subject);
        if (labelImported) {
          thread.addLabel(labelImported);
        }
      } else {
        console.error(
          "Failed to send Allegro email to WebApi. Status:",
          responseCode,
          "Body:",
          response.getContentText()
        );
        continue;
      }
    }

    if (labelProcessed) {
      thread.addLabel(labelProcessed);
    }
    thread.moveToArchive();
  }

  return result;
}
