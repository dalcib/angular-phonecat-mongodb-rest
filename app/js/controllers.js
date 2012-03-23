/* App Controllers */


function PhoneListCtrl(Phone, $location, $scope) {

    $scope.orderProp = 'age';
    $scope.phones = Phone.query({order:$scope.orderProp, name:$scope.query});
    var phones = $scope.phones;
    
    $scope.remove = function (phone) {
        var ok = Phone.delete({_id: phone._id}, function (res) {
            console.log('indexOf: '+phones.indexOf(phone));
            if (res.ok === 1) {
                phones.splice(phones.indexOf(phone), 1);
            } else {
                alert(JSON.stringify(res.ok));
            }
        })
    }
    
}
PhoneListCtrl.$inject = ['Phone', '$location', '$scope'];


function PhoneDetailCtrl(Phone, $routeParams, $scope) {  
    $scope.phone = Phone.get({_id: $routeParams._id}, function(phone) {
        $scope.mainImageUrl = phone.details.images[0];
    });
    $scope.setImage = function(imageUrl) {
        $scope.mainImageUrl = imageUrl;
    }
}
PhoneDetailCtrl.$inject = ['Phone', '$routeParams', '$scope'];


function PhoneEditCtrl(Phone, $routeParams, $location, $scope) {
    $scope.phone = Phone.get({_id: $routeParams._id})
    
    $scope.save = function () {
        Phone.save({}, $scope.phone, function (res) { if (res.ok === 1) { $location.path("/phones");}} ) 
    }
}
PhoneEditCtrl.$inject = ['Phone', '$routeParams', '$location', '$scope'];

function PhoneNewCtrl(Phone, $routeParams, $scope) {   
    $scope.phone = new Phone();
    
    $scope.save = function () {
        Phone.save({}, $scope.phone, function (res) { if (res.ok === 1) { $location.path("/phones");}}) 
    }
}
PhoneNewCtrl.$inject = ['Phone', '$routeParams', '$scope'];

function PhoneAggreCtrl(Phone, $routeParams, $scope) {   
    $scope.count = Phone.count();
    $scope.distinct = Phone.distinct({}, {key:"carrier"});
    console.log($scope.distinct)
    $scope.group = Phone.group({}, {
                            keys: {carrier:true },   cond: {}, 
                            initial: {sum: 0, count:0, max:0, avg:0}, 
                            reduce: "function(doc,out){out.sum += doc.age; out.count += 1; out.max = Math.max(out.max, doc.age); out.avg = out.sum/out.count;}"
                        })
    $scope.mapReduce = Phone.mapReduce({},{ 
                            "map": "function(){emit(this.details.android.os, 1);}", 
                            "reduce": "function(key, values){return values.length;}"  
                        });
}
PhoneAggreCtrl.$inject = ['Phone', '$routeParams', '$scope'];