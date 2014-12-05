/*

  Copyright 2014 Anton Katsarov <anton@webface.bg>

  Distributed under the MIT License.

  See accompanying file LICENSE or copy at
  http://opensource.org/licenses/MIT

*/

var template = '<div class="pronto-pref">\
<cg-prefs-checkbox pref-name="Twofa" pref-label="Two-factor authentication enabled" selected="Twofa" pref-changed="TwofaChanged" on-change="onChange(pref)" pref-default="false"></cg-prefs-checkbox>\
</div>';

function watchPrefs() {
    var mailElement = document.querySelector(".pronto-navigation-item_type_mail");
    if (!mailElement) {
	setTimeout(watchPrefs, 1000);
	return;
    } else {
	// Pronto! has loaded
	var injector = angular.element("body").injector();
	injector.invoke(function (pubsubService) {
	    function onModuleLoaded(info) {
		var moduleName = info.data[0];
		// prefs module is loaded
		if (moduleName == "prefs") {
		    injector.invoke(function ($preferencesService) {
			require(["angularAMD"], function (angularAMD) {
			    var directiveMaker = angularAMD.getCachedProvider("$compileProvider");
			    directiveMaker.directive('cgTwofaPrefs', function() {
				return {
				    restrict: "E",
				    template: template,
				    controller: function($scope, prefsService, $timeout) {
					$scope.onChange = function (prefName) {
					    prefsService.setPrefString("Twofa", ! $scope.Twofa);
					    $timeout(function () {
						prefsService.prefsUpdate();
						$scope.wasSaved($scope);
					    }, 10, false);

					};
				    }
				};
			    });
			    $preferencesService.addPrefsPages([{
				menuName: "Two-factor authentication",
				iconClass: "pronto-folder_type_password",
				header: "Two-factor authentication",
				moduleId: "Preferences",
				content: "<cg-twofa-prefs></cg-twofa-prefs>",
				id: "Twofa",
				priority: 0
			    }]);
			});
 		    });
		    pubsubService.unsubscribe("moduleIsLoadedEvent", onModuleLoaded);
		}
	    }
	    pubsubService.subscribe("moduleIsLoadedEvent", onModuleLoaded);
	});
    };
};
watchPrefs();
