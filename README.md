# Angular-PhoneCat-MongoDB-Rest

Angular 1.0.5 Version - http://angularjs.org 

## Overview

The goal of this project is to build Node server to Angular with a Restful complete API to mongoDB.
This application is based in angular-phonecat - https://github.com/angular/angular-phonecat .

## Install

To load de Phones to Mongo Database called "PhoneCat":

    $ node load
    
To run the aplication:

    $ node server

## Rest API - Node/MongoDB/Angular

The Actions .get, .save, .delete and .query are default in Angular, and can be used like this way:

    Resource.action({params}, [{postData}])
    
To more information look http://docs.angularjs.org/#!/api/angular.service.$resource


#### Read
    .get({_id: _id})

#### Insert/Update
    .save({},$scope.doc}
If the document don't have an "\_id", the document is inserted and "\_id" is created by ObjectId.
If the document have a "\_id" but this "\_id" don't exist in the database, the document is inserted and a custon "\_id" is created.
Otherwise, the document is updated.

#### Delete 
    .delete({ _id: _id }

#### Simple querys: http://www.mongodb.org/display/DOCS/Querying
    .query({})
    
    .query({name : "same name", limit:10, skip:15, 
            sort:"age", order:"asc" || "desc"}}

#### Advanced querys: http://www.mongodb.org/display/DOCS/Advanced+Queries 
    .find({}, {'age': {'$lt":5, '$gt':3}})

#### Aggregation querys: http://www.mongodb.org/display/DOCS/Aggregation
    .count()
    
    .distinct({}, { key: "key" } Ex: {key: "carrier"})
    
    .group({}, {keys: {carrier:true }, 
                cond: {}, 
                initial: {sum: 0, count:0, max:0, avg:0}, 
                reduce: "function(doc,out){ \\
                    out.sum += doc.age; \\
                    out.count += 1; \\
                    out.max = Math.max(out.max, doc.age); \\
                    out.avg = out.sum/out.count;}"
                }
    
#### MapReduce querys: http://www.mongodb.org/display/DOCS/MapReduce 
    .mapReduce({}, {map : mapfunction string, 
                    reduce : reducefunction string,
                    options: { 
                        query : query filter object, 
                        sort : sorts the input objects using this key
                        limit : number of objects to return from collection, 
                        finalize : finalizefunction,
                        scope : object where fields go into global scope 
                    }}
           
                    
    Ex .mapReduce({},{"map": "function(){emit(this.details.android.os, 1);}", 
                    "reduce": "function(key, values){return values.length;}"
                    }
## Alternative Sintax API
	
	Angular-resource:  Phone.query({})
	MondoDB: db.phones.query({})

## Dependencies

- Express
- Mongojs

## TODO

- Tests
