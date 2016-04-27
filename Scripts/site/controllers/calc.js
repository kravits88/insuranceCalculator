define([], function () {
    var controller = function ($scope, $timeout) {
        
        $scope.currentStep = 1;
        $scope.hasMortgage = false;
        $scope.hasRent = false;
        $scope.children = 0;
        $scope.progress = 0;

        $scope.adjustStep = function (adjustment)
        {
            clearError();

            var newStep = $scope.currentStep + adjustment;

            switch (newStep) {
                case 1:
                    $scope.hasMortgage = false;
                    $scope.hasRent = false;
                    break;

                case 2:
                    if ($scope.rentAmount == null && $scope.mortgageAmount == null)
                        setError();
                    break;

                case 3:
                    if ($scope.children == null)
                        setError();
                    break;

                case 4:
                    if ($scope.debt == null)
                        setError();
                    else
                        $scope.suggestedCover = $scope.getSuggestedCover();
                    break;
            }

            if (!$scope.hasError) {
                $scope.currentStep = newStep > 0 ? newStep : 1;
                $scope.progress = Math.round((($scope.currentStep-1) / 3) * 100);
            }

        }


        $scope.getSuggestedCover = function () {
            console.log($scope.mortgageAmount);
            return ($scope.mortgageAmount || $scope.rentAmount * 12 * 20) + ($scope.children * 50000) + $scope.debt;
        }


        var setError = function () {
            $scope.hasError = true;
        }

        var clearError = function () {
            $scope.hasError = false;
        }

        $scope.formatCurrency = function(total) {
            var neg = false;
            if (total < 0) {
                neg = true;
                total = Math.abs(total);
            }
            return (neg ? "-$" : '$') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
        }

    };

    controller.$inject = ['$scope', '$timeout'];
    return controller;
});