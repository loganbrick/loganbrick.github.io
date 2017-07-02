// The view model.

var appViewModel = {

  // Observable for toggling the menu, default is false since the menu is hidden
  toggleMenu: ko.observable(false),
  toggleMenuText: ko.observable("Show Menu"),



  // Change the toggleMenu and toggleMenuText observables every time the
  // menu button is clicked.
  toggleMenuF: function() {

    appViewModel.toggleMenu(!appViewModel.toggleMenu());

    // If the toggleMenu observable is false,
    // have the menu read "Show Menu", otherwise, read "Hide Menu"
    if (appViewModel.toggleMenu()) {
      appViewModel.toggleMenuText("Hide Menu");
    } else {
      appViewModel.toggleMenuText("Show Menu");
    }
  },

}

// Activates knockout.js
ko.applyBindings(appViewModel);