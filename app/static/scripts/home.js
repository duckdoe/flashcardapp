let cards = [
  {
    id: 1,
    title: "Thermodynaics",
    description: "",
    card_length: 35,
    color: "green",
    created_at: "2026-01-06T08:11:00.913Z",
  },
  {
    id: 2,
    title: "Electricity",
    description: "Flashcards on physics electricity",
    card_length: 13,
    color: "orange",
    created_at: "2026-01-06T08:10:00.913Z",
  }
]


function render_html() {
  let html = ``;

  const card_grid = document.querySelector(".card_grid");

  if (cards.length === 0) {
    console.log("Yeah boy");
    card_grid.innerHTML = "<p class='text_center'>No cards yet create one</p>";
    card_grid.classList.add('grid_1');
    return;
  }

  if (card_grid.classList.contains('grid_1')) {
    card_grid.classList.remove('grid_1');
  }

  cards.forEach(card => {
    const created_at = new Date(card.created_at);

    html += `<div class="card card_outline card_outline_${card.color}" data-id="${card.id}">
                <div class="card_desc">
                  <div class="card_info">
                    <h3>${card.title}</h3>
                    <p class="desc font_muted">${card.description ? card.description : "No description"}</p>
                  </div>
                  <div class="card_extra">
                    <div class="card_nos">
                      <i class="ri-rectangle-line"></i>
                      <span class="no font_muted">${card.card_length} cards</span>
                    </div>
                    <div class="card_created">
                      <i class="ri-time-line"></i>
                      <span class="time font_muted">Created ${format_time(created_at)} ago</span>
                    </div>
                  </div>
                </div>
                <div class="card_options">
                  <button class="option_btn">
                    <i class="ri-more-2-fill"></i>
                  </button>
                  <div class="card_funcs hidden" tabindex="-1">
                    <ul>
                      <li class="edit_func">
                      <a href="/edit/${card.id}" class="full" target="_blank">
                        <i class="ri-edit-box-line"></i>
                        Edit
                      </a>
                      </li>
                      <li class="delete_func" data-id="${card.id}">
                        <button class="full">
                          <i class="ri-delete-bin-line delete_icon"></i>
                          Delete card
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>`;
  });

  card_grid.innerHTML = html;



  function format_time(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    if (!date) {
      return "now";
    }

    switch (true) {
      case seconds > 60 && seconds < 3600:
        return `${Math.floor(seconds / 60)} mins`
      case seconds > 3600 && seconds < 86400:
        return `${Math.floor(seconds / 3600)} hrs`
      case seconds > 86400 && seconds < 2592000:
        return `${Math.floor(seconds / 86400)} days`
      case seconds > 2592000 < 31536000:
        return `${Math.floor(seconds / 2592000)} days`
      case seconds > 31536000:
        return `${Math.floor(seconds / 31536000)} days`
      default:
        return `${Math.floor(seconds)} secs`
    }
  }

  const search_btn = document.querySelector(".search_btn");
  const search_input = document.querySelector('.js_input');
  let search_is_focused = false;

  search_input.addEventListener('focus', () => {
    search_is_focused = true;
    const search_result = document.querySelector('.search_results');
    search_result.classList.add('search_results_active');

    const min_screen_size = 540;
    const window_size = window.innerWidth;

    if (window_size <= min_screen_size && search_is_focused) {
      const backdrop = document.querySelector('.backdrop');
      backdrop.classList.add('open');

      search_input.classList.add('search_input_active');
    }
  })


  search_input.addEventListener('blur', () => {
    search_is_focused = false;

    const min_screen_size = 540;
    const window_size = window.innerWidth;

    const search_result = document.querySelector('.search_results');
    search_result.classList.remove('search_results_active');

    if (window_size <= min_screen_size && !search_is_focused) {
      const backdrop = document.querySelector('.backdrop');
      backdrop.classList.remove('open');

      search_input.classList.remove('search_input_active');
      search_input.value = "";
    }
  })

  search_btn.addEventListener('click', (e) => {
    search_input.focus();
  })


  let search_query = '';

  search_input.addEventListener('input', (e) => {
    const search_result = document.querySelector('.search_results');

    search_query = e.target.value;
    search_query = search_query.trim();
    search_result.innerHTML = search_query != '' ? search_query : 'No results';
  })

  search_input.addEventListener('focus', () => {
    const search_result = document.querySelector('.search_results');
    search_result.classList.add('search_results_active');
  });

  search_input.addEventListener('blur', () => {
    const search_result = document.querySelector('.search_results');
    search_result.classList.remove('search_results_active');
  })

  const card_option_btns = document.querySelectorAll('.option_btn');

  card_option_btns.forEach(card_option_btn => {
    const card_func = card_option_btn.nextElementSibling;

    card_option_btn.addEventListener('click', () => {
      card_func.focus();
    })

    card_option_btn.addEventListener('focus', () => {
      card_func.focus();
    })

    card_func.addEventListener('focus', () => {
      card_func.classList.remove('hidden');
    });

    card_func.addEventListener('focusout', (e) => {
      if (e.relatedTarget === null) {

        if (!card_func.classList.contains('hidden')) {
          card_func.classList.add('hidden');
        }
      }
    });

    const ul = card_func.children[0];
    ul.addEventListener('focusout', (e) => {
      const contains_el = ul.contains(e.relatedTarget)

      if (!contains_el) {
        if (!card_func.classList.contains('hidden')) {
          card_func.classList.add('hidden');
        }
      }
    });

    const delete_btn = ul.children[1];

    delete_btn.addEventListener('click', () => {
      card_func.classList.add('hidden');

      const card_id = delete_btn.dataset.id;
      const new_cards = cards.filter(card => card.id != card_id);

      cards = new_cards;
      render_html();
    })
  });
}
render_html();