
 async function getPetsData() {
  try{
      const response = await fetch('http://localhost:3000/pets');
      return await response.json();
  }catch(error) {
      return [];
  }
  
}
 async function AddNewPet(requestbody) {
  try{
      const response = await fetch('http://localhost:3000/pets/', {
        // Adding method type
        method: "POST", 
        // Adding body or contents to send
        body: JSON.stringify(requestbody), 
        // Adding headers to the request
        headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json'
        },
    });
      return response
  }catch(error) {
      return [];
  }
  
}
async function UpdatePet(requestbody,id) {
  try{
      const response = await fetch(`http://localhost:3000/pets/${id}`, {
        // Adding method type
        method: "PUT", 
        // Adding body or contents to send
        body: JSON.stringify(requestbody), 
        // Adding headers to the request
        headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json'
        },
    });
      return response
  }catch(error) {
      return [];
  }
  
}
export default {
  getPetsData,
  AddNewPet,
  UpdatePet
};
