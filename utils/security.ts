import { hash, compare } from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12)
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '')
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type)
}
