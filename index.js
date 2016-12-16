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
export default class RaziloRequest {
	ajax(type, url, data, headers) {
		var scope = this;
		type = type.toUpperCase();
		var promise = new Promise(function(resolve, reject)
		{
			var XHR = XMLHttpRequest || ActiveXObject;
			var xhrRequest = new XHR('MSXML2.XMLHTTP.3.0');
			xhrRequest.open(type, url, true);
			if (typeof headers !== 'undefined') for (var key in headers) xhrRequest.setRequestHeader(key, headers[key]);

			xhrRequest.onreadystatechange = function ()
			{
				if (xhrRequest.readyState === 4)
				{
					// sort out response, sniff out json and convert
					var output = xhrRequest.responseText;
					if (typeof headers['Content-Type'] !== 'undefined' && headers['Content-Type'].indexOf('json') >= 0)
					{
						try { output = JSON.parse(xhrRequest.responseText); }
						catch(e) {}
					}

					// set response type
					if (xhrRequest.status === 200) resolve({data: output, response: xhrRequest});
					else reject({data: output, response: xhrRequest});
				}
			};
			xhrRequest.send(data);
		});
		return promise;
	}

	get(url, id) {
		var headers = {'Content-Type': 'application/json;charset=UTF-8', 'Cache-Control': 'no-cache'};
		return this.ajax('GET', url + (typeof id !== 'undefined' && id !== null ? '/' + id : ''), null, headers);
	}

	put(url, data) {
		var headers = {'Content-Type': 'application/json;charset=UTF-8', 'Cache-Control': 'no-cache'};
		try { data = JSON.stringify(data); }
		catch(e) {}
		return this.ajax('PUT', url, data, headers);
	}

	post(url, data) {
		var headers = {'Content-Type': 'application/json;charset=UTF-8', 'Cache-Control': 'no-cache'};
		try { data = JSON.stringify(data); }
		catch(e) {}
		return this.ajax('POST', url, data, headers);
	}

	delete(url, id) {
		var headers = {'Content-Type': 'application/json;charset=UTF-8', 'Cache-Control': 'no-cache'};
		return this.ajax('DELETE', url + (typeof id !== 'undefined' && id !== null ? '/' + id : ''), null, headers);
	}
}
