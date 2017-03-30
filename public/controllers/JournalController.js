function JournalController($http, $location, $rootScope) {

    'use strict'

    var self = this;
    Init();

    function Init() {
        self.ShowForm = false;
        self.GetAllEntries();
    }
    

    this.Days = [{ Name: 'Sunday' }, { Name: 'Monday' }, { Name: 'Tuesday' }, { Name: 'Wednesday' }, { Name: 'Thursday' }, { Name: 'Friday' }, { Name: 'Shabbat' }];

    this.FeelingEmotions = [{ Name: 'Happy' }, { Name: 'Sad' }, { Name: 'Excited' }, { Name: 'Afraid' }, { Name: 'Angry' }];

    this.GetAllEntries = function() {
        return $http.get('/api/journal')
            .then(function (result) {
                self.Entries = result.data;
            }, function(error) {
                alert("error");
            });

    }

    this.ShowEntryForm = function () {
        this.ShowForm = true;
    }

    this.Cancel = function () {
        this.ShowForm = false;
    }


    this.CreateEntry = function() {
        //alert("Hello there!");
        return $http.post('/api/journal/', self)
            .then(function (result) {
                if (result.data.Error) {
                    alert("error");
                } else {
                    alert("good");
                }
            }, function (err) {
                console.log("Error getting all users:\n", err);
                
            });
    }


};

JournalController.$inject = ['$http', '$location', '$rootScope'];

app.controller("JournalController", JournalController);

