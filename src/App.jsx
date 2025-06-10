import React from 'react';
import './App.css';
import SentimentAnalyzer from './page/Sentiment';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Analisador de Sentimentos</h1>
      </header>
      <main>
        <SentimentAnalyzer />
      </main>
      <footer>
        <p>Desenvolvido com Hugging Face e React</p>
      </footer>
    </div>
  );
}

export default App;