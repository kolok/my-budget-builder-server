# Komber naming convention

## Vuejs naming convention

All vue button action will be prefixed by "handle" vs the service actions which are not prefixed

### Update an object

Edit: display a form to update an object
Update: action to update an object

Example:
* handleEditOffice will display the edit form of the current office
* handleUpdateOffice will perform the saving of the office

### Create an object

Add: display the form to add an object
Create: action to save this new element in DB

Example:
* handleAddOffice
* handleCreateOffice
