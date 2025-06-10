import React, { useState } from 'react';
import '../styles/SentimentApp.css'; 

function SentimentAnalyzer() {
  const [texto, setTexto] = useState('');
  const [sentimento, setSentimento] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState('');

  const analisarTexto = async () => {
    if (!texto.trim()) {
      setErro('Por favor, digite algum texto para análise.');
      return;
    }

    setIsLoading(true);
    setErro('');
    
    try {
      const resposta = await fetch('http://127.0.0.1:5000/analyze_sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: texto })
      });

      if (!resposta.ok) {
        throw new Error(`Erro na requisição: ${resposta.status}`);
      }

      const dados = await resposta.json();
      setSentimento(dados.sentiment);
    } catch (error) {
      setErro(`Falha ao analisar o sentimento: ${error.message}`);
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentoTexto = (tipo) => {
    switch (tipo) {
      case 'positive': return 'Positivo';
      case 'negative': return 'Negativo';
      case 'neutral': return 'Neutro';
      default: return 'Desconhecido';
    }
  };

  const getSentimentoCor = (tipo) => {
    switch (tipo) {
      case 'positive': return '#4caf50';
      case 'negative': return '#f44336'; 
      case 'neutral': return '#2196f3';
      default: return '#9e9e9e'; 
    }
  };

  return (
    <div className="sentiment-analyzer">
      <div className="input-container">
        <textarea
          placeholder="Digite o texto que você deseja analisar..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={5}
        />
        <button 
          onClick={analisarTexto} 
          disabled={isLoading}
          className="analyze-button"
        >
          {isLoading ? 'Analisando...' : 'Analisar Sentimento'}
        </button>
      </div>

      {erro && <div className="error-message">{erro}</div>}
      
      {sentimento && !erro && (
        <div className="result-container">
          <h2>Resultado da Análise</h2>
          <div 
            className="sentiment-badge"
            style={{ backgroundColor: getSentimentoCor(sentimento) }}
          >
            {getSentimentoTexto(sentimento)}
          </div>
        </div>
      )}
    </div>
  );
}

export default SentimentAnalyzer;