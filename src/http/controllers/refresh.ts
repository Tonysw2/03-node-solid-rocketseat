import type { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({
      onlyCookie: true,
    })

    const token = await reply.jwtSign(
      {
        role: request.user.role,
      },
      {
        sub: request.user.sub,
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: request.user.role,
      },
      {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    )

    reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .code(200)
      .send({ token })
  } catch (error) {
    reply.code(401).send({ error: 'Invalid credentials.' })
  }
}
