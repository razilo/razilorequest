# Razilo Request

TBD...

ajax function [type, url, data[, headers]] - Basic ajax request
@param string type The type of request to make, get, post, put, delete...
@param string url The correctly formed URL to hit...
@param string data Any data to send along the way...
@param object headers [optional] headers as key:value

get function [url, id] - GET rest request
@param string url The url to get from
@param string id [optional] The id of the resource to get

post function [url, data] - POST rest request
@param string url The url to get from
@param string data [optional] The data to send in to the post request

put function [url, data] - PUT rest request
@param string url The url to get from
@param string data The data to send in to the put request

delete function [url, id] - DELETE rest request
@param string url The url to get from
@param string id The id of the resource to delete

Returns promise...

docs to be finished soon!
