export const surveyPath = {
  get: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Enquete'],
    summary: 'Rota para listar enquetes.',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveys'
            }
          }
        }
      },
      403: {
        description: 'Acesso negado',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/forbidden'
            }
          }
        }
      },
      404: {
        description: 'Recusro não encontrado',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/notFound'
            }
          }
        }
      },
      500: {
        description: 'Erro interno do servidor',
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
