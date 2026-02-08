declare module 'bcrypt' {
  const bcrypt: {
    compare(data: string, encrypted: string): Promise<boolean> | boolean
    hash(data: string, saltOrRounds: string | number): Promise<string> | string
    genSalt(rounds?: number): Promise<string> | string
    [key: string]: any
  }
  export default bcrypt
}
