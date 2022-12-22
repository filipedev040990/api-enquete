export const authenticationPath = {
  post: {
    tags: ['Login'],
    summary: 'Rota para autenticação de usuários.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#schemas/authenticationParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
            }
          }
        }
      },
      400: {
        description: 'Requisição inválida.',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/badRequest'
            }
          }
        }
      },
      401: {
        description: 'Não autorizado.',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/unauthorized'
            }
          }
        }
      },
      404: {
        description: 'Recurso não encontrado',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/notFound'
            }
          }
        }
      },
      500: {
        description: 'Erro interno do servidor.',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/serverError'
            }
          }
        }
      }
    }
  }
}
