export const surveyResultPath = {
  get: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Enquete'],
    summary: 'Rota para listar o resultado de uma enquete.',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [{
      in: 'path',
      name: 'surveyId',
      required: true,
      schema: {
        type: 'string'
      },
      description: 'Id da enquete.'
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/saveSurveyAnswer'
            }
          }
        }
      },
      400: {
        description: 'Requisição inválida',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/badRequestSurveyResult'
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
              $ref: '#/components/notFound'
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
