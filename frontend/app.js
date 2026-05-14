const URL_API = 'http://localhost:3000/fatos';

async function getFacts() {
  const feed = document.querySelector('#feed');

  try {
    const response = await fetch(URL_API);

    if (!response.ok) {
      throw new Error(`O servidor respondeu com status ${response.status}.`);
    };

    const facts = await response.json();

    facts.forEach(fact => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <p class="meta-card">
          <span class="category-card">${fact.category}</span> · ${fact.source}
        </p>
        <p class="text-card">${fact.text}</p>
      `;

      feed.appendChild(card);
    });

  } catch (error) {
    feed.innerHTML = `<p class="message-error">Não foi possível carregar os fatos. Verifique se o servidor está rodando.</p>`;
    console.error(`Erro ao carregar fatos: ${error}`);
  };
};

getFacts();