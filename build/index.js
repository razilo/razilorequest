(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * [public] - Micro tool to make ajax/rest requests and return promise, can be called directly using ajax (for basic calls), or via get, post, put, delete
 * @param string token The token to set for authorization requests
 * @return ajax function [type, url, data[, headers]] - Basic ajax request
 *      @param string type The type of request to make, get, post, put, delete...
 *      @param string url The correctly formed URL to hit...
 *      @param string data Any data to send along the way...
 *      @param object headers [optional] headers as key:value
 * @return get function [url, id] - GET rest request
 *      @param string url The url to get from
 *      @param string id [optional] The id of the resource to get
 * @return post function [url, data] - POST rest request
 *      @param string url The url to get from
 *      @param string data [optional] The data to send in to the post request
 * @return put function [url, data] - PUT rest request
 *      @param string url The url to get from
 *      @param string data The data to send in to the put request
 * @return delete function [url, id] - DELETE rest request
 *      @param string url The url to get from
 *      @param string id The id of the resource to delete
 */
var RaziloRequest = function () {
	function RaziloRequest() {
		_classCallCheck(this, RaziloRequest);
	}

	RaziloRequest.prototype.ajax = function ajax(type, url, data, headers) {
		var scope = this;
		type = type.toUpperCase();
		var promise = new Promise(function (resolve, reject) {
			var XHR = XMLHttpRequest || ActiveXObject;
			var xhrRequest = new XHR('MSXML2.XMLHTTP.3.0');
			xhrRequest.open(type, url, true);
			if (typeof headers !== 'undefined') for (var key in headers) {
				xhrRequest.setRequestHeader(key, headers[key]);
			}xhrRequest.onreadystatechange = function () {
				if (xhrRequest.readyState === 4) {
					// sort out response, sniff out json and convert
					var output = xhrRequest.responseText;
					if (typeof headers['Content-Type'] !== 'undefined' && headers['Content-Type'].indexOf('json') >= 0) {
						try {
							output = JSON.parse(xhrRequest.responseText);
						} catch (e) {}
					}

					// set response type
					if (xhrRequest.status === 200) resolve({ data: output, response: xhrRequest });else reject({ data: output, response: xhrRequest });
				}
			};
			xhrRequest.send(data);
		});
		return promise;
	};

	RaziloRequest.prototype.get = function get(url, id) {
		var headers = { 'Content-Type': 'application/json;charset=UTF-8', 'Cache-Control': 'no-cache' };
		return this.ajax('GET', url + (typeof id !== 'undefined' && id !== null ? '/' + id : ''), null, headers);
	};

	RaziloRequest.prototype.put = function put(url, data) {
		var headers = { 'Content-Type': 'application/json;charset=UTF-8', 'Cache-Control': 'no-cache' };
		try {
			data = JSON.stringify(data);
		} catch (e) {}
		return this.ajax('PUT', url, data, headers);
	};

	RaziloRequest.prototype.post = function post(url, data) {
		var headers = { 'Content-Type': 'application/json;charset=UTF-8', 'Cache-Control': 'no-cache' };
		try {
			data = JSON.stringify(data);
		} catch (e) {}
		return this.ajax('POST', url, data, headers);
	};

	RaziloRequest.prototype.delete = function _delete(url, id) {
		var headers = { 'Content-Type': 'application/json;charset=UTF-8', 'Cache-Control': 'no-cache' };
		return this.ajax('DELETE', url + (typeof id !== 'undefined' && id !== null ? '/' + id : ''), null, headers);
	};

	return RaziloRequest;
}();

exports.default = RaziloRequest;

},{}]},{},[1])