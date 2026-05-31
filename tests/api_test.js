import newman from 'newman';

const collection = './docs/Projeto consulta cidade clima.postman_collection';

newman.run({
    collection: collection,
    reporters: ['cli'],

}, function (err, summary) {

      //Verifica se houveram erros na execução dos testes
      if (err) {
        console.error('Error running Newman:', err);
        process.exit(1);
      }

      // Verifica se houveram falhas nos testes
      const falhas = summary.run.failures;
      if(falhas && falhas.length > 0) {
        console.error('Testes falharam:', falhas);
        process.exit(1);
      };

      //Caso seja bem sucedido, exibe mensagem de sucesso e finaliza o processo com código 0
      console.log('Testes concluídos com sucesso!');
      process.exit(0);
    }
);