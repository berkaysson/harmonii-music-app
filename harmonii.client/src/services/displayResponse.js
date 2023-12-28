export const displayResponse = (response) => {
  if(response.name === "AxiosError"){
    console.log(response.response);
  } else {
    console.log(response.data);
  }
}