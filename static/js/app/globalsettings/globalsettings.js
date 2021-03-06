// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

angular.module('globalsettings', ['resources.configurations', 'services.breadcrumbs', 'services.notifications', 'services.pluginsProvider']).
config(['pluginsProvider', function(pluginsProvider){
    pluginsProvider.register('Configurations', '/configurations', {
        controller: 'ConfigurationsListCtrl',
        templateUrl: '/static/js/app/globalsettings/globalsettings.tpl.html',
        resolve: {
            configurations: function(Configurations){
                return Configurations.getFirstPage();
            }
        }
    })
}]);

angular.module('globalsettings').controller('ConfigurationsListCtrl', ['$scope', 'configurations', 'Breadcrumbs', 'Notifications', 
        function($scope, configurations, Breadcrumbs, Notifications){
    Breadcrumbs.refresh();
    Breadcrumbs.push('Configurations', '/#/configurations');
    $scope.collection = configurations;
    $scope.toDisplay = ['name', 'description', 'value'];

    $scope.update = function(configuration){
        // Update and notify
        configuration.update().then(function(response){
            Notifications.push('success', 'Updated ' + response.name + '. Please restart management server(s) for new settings to take effect');
        });
    }
}]);
