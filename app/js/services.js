/* http://docs.angularjs.org/#!angular.service */


/**
Rest API - Node/MongoDB/Angular

- Read a document (default in Angular)
    .get: param "_id"

- Insert/Update (default in Angular)
    .save postData $scope.doc
    =>  If the document don't have an "_id", the document is inserted and "_id" is create by ObjectId
        If the document have "_id" but this don't exist in database, the document is inserted and a custon "_id" is created
        Otherwise the document is updated

- Delete (default in Angular)
    .delete: param "_id"

- Simmple querys:  (default in Angular) http://www.mongodb.org/display/DOCS/Querying
    .query: param {}
    .query: param { name : "xxx", limit:10, skip:15, sort:"age", order:"asc" || "desc"} 
    => default in Angular

- Advanced querys: http://www.mongodb.org/display/DOCS/Advanced+Queries 
    .find:  postData = {'age': {'$lt":5, '$gt':3}}

- Aggregation querys: http://www.mongodb.org/display/DOCS/Aggregation
    .count:  no postData
    .distinct: postData = { key: "key" } Ex: {key: "carrier"}
    .group: postData Ex.{keys: {carrier:true },   cond: {}, 
                        initial: {sum: 0, count:0, max:0, avg:0}, 
                        reduce: "function(doc,out){out.sum += doc.age; out.count += 1; out.max = Math.max(out.max, doc.age); out.avg = out.sum/out.count;}"}

- MapReduce querys: http://www.mongodb.org/display/DOCS/MapReduce 
    .mapReduce': postData = {   map : <mapfunction string>, 
                                reduce : <reducefunction string>,  
                                options: { 
                                    [query : <query filter object>], 
                                    [sort : <sorts the input objects using this key>]
                                    [limit : <number of objects to return from collection>], 
                                    [finalize : <finalizefunction>]
                                    [scope : <object where fields go into javascript global scope >]
                            }}
                 Ex. { "map": "function(){emit(this.details.android.os, 1);}", 
                       "reduce": "function(key, values){return values.length;}"  }
                 
- Aggregate framework (MongoDB 2.1): http://www.mongodb.org/display/DOCS/Aggregation+Framework
    .aggregate: postData = { <query aggregate expresion> }

**/

var res
angular.module('myApp.services', ['ngResource'])
	.factory('Phone', ['$resource', '$http',
        function($resource, $http) {
			var actions = {
                'count': {method:'PUT', params:{_id: 'count'}},                           
                'distinct': {method:'PUT', params:{_id: 'distinct'}},      
                'find': {method:'PUT', params:{_id: 'find'}, isArray:true},              
                'group': {method:'PUT', params:{_id: 'group'}, isArray:true},            
                'mapReduce': {method:'PUT', params:{_id: 'mapReduce'}, isArray:true} ,  
                'aggregate': {method:'PUT', params:{_id: 'aggregate'}, isArray:true}   
            }
            res = $resource('api/phones/:_id', {}, actions);
            //Object.defineProperty(res.prototype, "teste", {get:function(){this.age}})
            //res.prototype.teste = "test"
            //console.log(res)
            return res
		
        }
    ])
    .factory('db', ['$resource', '$http',    
    function($resource, $http) {
		var actions = {
                'count': {method:'PUT', params:{_id: 'count'}},                           
                'distinct': {method:'PUT', params:{_id: 'distinct'}},      
                'find': {method:'PUT', params:{_id: 'find'}, isArray:true},              
                'group': {method:'PUT', params:{_id: 'group'}, isArray:true},            
                'mapReduce': {method:'PUT', params:{_id: 'mapReduce'}, isArray:true} ,  
                'aggregate': {method:'PUT', params:{_id: 'aggregate'}, isArray:true}   
            }
        var db = {};
        db.phones = $resource('api/phones/:_id', {}, actions);
        return db;
    }
]);