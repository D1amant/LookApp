app.controller('CadastreController' ,  function ($scope , $state ,$cordovaSQLite , User) 
{
  $scope.style = "border-color:red ;";
  $scope.cadastre = [];

    //
    $scope.submit = function(cadastre)
    {
      $scope.cadastre  = cadastre;
      var result = User.insertUser($scope.cadastre);
      result.then(function(result){
        try{ 
           var validate = User.insertSection(result.insertId , $scope.cadastre);
          console.log(validate);
          if(validate){
            $state.go("menu.home"); 
          }
         }catch(error){
           console.log(error); 
         }
     });
  
   };


 



    $scope.validation = function(cadastre){
      var validation = true;
      if(cadastre.name == null || cadastre.name == ""){
        $scope.styleInputName = "border-color:red;";
        validation = false;
      }else{
        $scope.styleInputName = "";
      }

      if(cadastre.email == null || cadastre.email == ""){
        $scope.styleInputEmail = "border-color:red;";
        validation = false;
      }else{
        $scope.styleInputEmail = "";
      }

      if(cadastre.phone == null || cadastre.phone == ""){
        $scope.styleInputPhone = "border-color: red;";
        validation = false;
      }else{
        $scope.styleInputPhone = "";
      }


      if(cadastre.password == null || cadastre.password == ""){
        $scope.styleInputPassword = "border-bottom-color: red;";
        validation = false;
      }else{
        $scope.styleInputPassword = "";
      }
      return validation;
    };
  }

  );


