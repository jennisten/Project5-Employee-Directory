
//wrap the code inside a document ready function to ensure all javascript is loaded before running it
$(document).ready(function() {
//create variables for api url and data to be used in the .getJSON method
  const url = "https://randomuser.me/api/?results=12&nat=uk";
  const employeeData = {
    dataType: 'json'
  };
//create function to display random user information on success
  function displayEmployees(data) {
    let employeeDiv = '<ul>'; //create ul element to hold list items
    let employees = data.results;
    $.each( data.results , function ( i , employee) { //iterate trough the response results to create list items of the random users
      employeeDiv += '<li class="employeeCard" id="'+ i +'">'; //create list item and store index value to be used in modal
      //add user infomration per user
      employeeDiv += '<a><img src="' + employee.picture.medium + '"></a>';
      employeeDiv += '<p><b class="name">' + employee.name.first + ' ' + employee.name.last + '</b></br>';
      employeeDiv += '<i class="email">' + employee.email + '</i><br>';
      employeeDiv +=  employee.location.city.toUpperCase() + '</p></li>';
    })
    employeeDiv += '</ul>'; //close ul element for list items
    $('.employees').html(employeeDiv); //display entire list in employees div element
    //create event listener for opening the modal
    $('.employeeCard').click(function () {
        let employee = employees[this.id]; //select correct user information
        let modalContent = '<div class="modal-content">'; //create div for modal content
        modalContent += '<span class="close">&times;</span>'; //create close 'button' to be displayed in the modal
        //add user content to modal
        modalContent += '<img src="' + employee.picture.large + '">';
        modalContent += '<p><b class="name">' + employee.name.first + ' ' + employee.name.last + '</b></br>';
        modalContent += employee.login.username + '</br><i class="email">' + employee.email + '</i></br></p>';
        modalContent += '<hr><p>' + employee.cell + '</br>';
        modalContent += employee.location.street + ', ' + employee.location.city.toUpperCase() + '</br>';
        modalContent += employee.location.postcode + ' ' + employee.location.state + '</br>';
        modalContent += 'Birthday: ' + employee.dob.date.substr(0, 10) + '</br>';
        modalContent += '</div>'; //close div element
        $('.modal').append(modalContent); //add the content to modal div
        //fade into the modal
        $('.modal').fadeIn("slow", function () {
        $('.modal').css('display', 'block');
        })
        // event listener for closing the modal
        $('.close').click(function () {
          $('.modal').css('display', 'none');
          $('.modal').empty();
        }); // end close modal event
      }); // end open modal event
    }; //end display employees function

  $.getJSON(url, employeeData, displayEmployees);
}); //end ready
