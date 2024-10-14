function mainRunner() {
  var trixUrl = "https://docs.google.com/spreadsheets/d/1sBC7PWM7DkCA4smf11Gg59tWT5R7JRIRaWqqpkIYgw8/edit?gid=0#gid=0"
  importAllegroEmailsToTrix(trixUrl);
  archiveElementsRowsOlderThan4Monhts(trixUrl);
}
