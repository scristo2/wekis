import bcrypt from "bcrypt";

// Función para encriptar una contraseña
async function encriptPassword(contraseña: string): Promise<string> {
  const saltRounds = 10; // Número de rondas de sal (mayor es más seguro pero más lento)
  const hashedContraseña = await bcrypt.hash(contraseña, saltRounds);
  return hashedContraseña;
}


// Función para verificar una contraseña
async function verifyEncriptedPassword(
  contraseña: string,
  hashedContraseña: string
): Promise<boolean> {
  const match = await bcrypt.compare(contraseña, hashedContraseña);
  return match;
}


export { encriptPassword, verifyEncriptedPassword };