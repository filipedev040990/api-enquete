export const signupPath = {
  post: {
    tags: ['Login'],
    summary: 'Rota para cadastrar usuários.',
    description: 'Essa rota pode ser executada por **qualquer usuário**',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signupParams'
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
              $ref: '#/schemas/newAccount'
            }
          }
        }
      },
      400: {
        description: 'Requisição inválida',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/badRequest'
            }
          }
        }
      },
      404: {
        description: 'Recusro não encontrado',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/notFound'
            }
          }
        }
      },
      409: {
        description: 'Conflito',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/conflict'
            }
          }
        }
      },
      500: {
        description: 'Erro interno do servidor',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/serverError'
            }
          }
        }
      }
    }
  }
}
