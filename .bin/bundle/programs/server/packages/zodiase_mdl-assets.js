(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var _mdlGetAsset;

var require = meteorInstall({"node_modules":{"meteor":{"zodiase:mdl-assets":{"serve.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/zodiase_mdl-assets/serve.js                              //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
_mdlGetAsset = function (path) {                                     // 1
  return Assets.getText(path);                                       // 2
};                                                                   // 3
///////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/zodiase:mdl-assets/serve.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['zodiase:mdl-assets'] = {}, {
  _mdlGetAsset: _mdlGetAsset
});

})();

//# sourceMappingURL=zodiase_mdl-assets.js.map
