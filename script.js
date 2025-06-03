
document.getElementById('dataForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nomeMaquina').value;
  const anos = document.getElementById('anos').value.split(',').map(Number);
  const quantidades = document.getElementById('quantidades').value.split(',').map(Number);

  if (anos.length !== quantidades.length) {
    alert('A quantidade de anos e valores deve ser igual.');
    return;
  }

  const total = quantidades.reduce((a, b) => a + b, 0);
  const media = (total / quantidades.length).toFixed(2);
  const crescimento = quantidades[quantidades.length - 1] - quantidades[0];
  let tendencia = 'estável';
  if (crescimento > 0) tendencia = 'crescente';
  else if (crescimento < 0) tendencia = 'decrescente';

  const previsao = Math.round(quantidades[quantidades.length - 1] * 1.1);

  document.getElementById('media').textContent = `📊 Média anual: ${media}`;
  document.getElementById('crescimento').textContent = `📈 Crescimento total: ${crescimento}`;
  document.getElementById('tendencia').textContent = `📉 Tendência: ${tendencia}`;
  document.getElementById('previsao').textContent = `🤖 Previsão para o próximo ano: ${previsao}`;
  document.getElementById('resultado').style.display = 'block';

  const ctx = document.getElementById('grafico').getContext('2d');
  if (window.bar) window.bar.destroy();
  window.bar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: anos,
      datasets: [{
        label: nome,
        data: quantidades,
        backgroundColor: 'rgba(0, 123, 255, 0.5)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
});
