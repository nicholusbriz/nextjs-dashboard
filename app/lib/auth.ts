import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import postgres from 'postgres'
import bcrypt from 'bcryptjs'

// Validate environment variables
const requiredEnvVars = ['POSTGRES_URL', 'AUTH_SECRET']
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar])

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`)
}

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: 'require',
  connect_timeout: 10,
  idle_timeout: 5,
  max: 5,
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          // Query user from database
          const result = await sql`
            SELECT id, name, email, password 
            FROM users 
            WHERE email = ${credentials.email as string}
          `

          if (result.length === 0) {
            return null
          }

          const user = result[0]

          // Verify password using bcrypt comparison
          const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password)

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error('Authentication error:', error)
          throw new Error('Database authentication failed')
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
})
