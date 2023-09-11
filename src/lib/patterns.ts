
const emailFormat = (email: string) => {
    // Expresión regular para verificar el formato de correo electrónico
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Usa la función test() para comprobar si la cadena coincide con la expresión regular
    return regex.test(email);
}

export {emailFormat};