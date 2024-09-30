const errorMessages: Record<number, string> = {
  401: 'Usuario o contraseña incorrectos',
  400: 'Solicitud incorrecta, por favor verifica los datos',
  403: 'Acceso denegado',
  500: 'Ocurrió un error en el servidor, inténtalo más tarde',
};

export const getErrorMessage = (statusCode: number): string => {
  return errorMessages[statusCode] || 'Ocurrió un error, inténtalo más tarde';
};
