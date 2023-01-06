export const responseGenerator = ({data,status,message}) => {
  let respuesta = {
    status: status?status:"success",
    message: message?message:"success data",
    data: null,
  };
  if (
    data !== null &&
    !(data === undefined) 
   /*  &&
    ((typeof data === "object" &&
      !Array.isArray(data) &&
      Object.keys(data).length > 0) ||
      (Array.isArray(data) && data.length > 0)) */
  ) {
    respuesta.data = data;
  } else {
    respuesta.status = status?status:"error";
    respuesta.message = message?message:"Consulta no genero data";
  }
  return respuesta;
};
