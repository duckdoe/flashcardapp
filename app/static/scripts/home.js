const cards = [
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

  cards.forEach(card => {
    const created_at = new Date(card.created_at);

    html += `<div class="_card _card_outline _card_outline_${card.color}">
                <div class="_card_desc">
                  <div class="_card_info">
                    <h3>${card.title}</h3>
                    <p class="_desc _font_muted">${card.description ? card.description : "No description"}</p>
                  </div>
                  <div class="_card_extra">
                    <div class="_card_nos">
                      <i class="ri-rectangle-line"></i>
                      <span class="_no _font_muted">${card.card_length} cards</span>
                    </div>
                    <div class="_card_created">
                      <i class="ri-time-line"></i>
                      <span class="_time _font_muted">Created ${format_time(created_at)} ago</span>
                    </div>
                  </div>
                </div>
                <div class="_card_options">
                  <div class="_option_btn">
                    <i class="ri-more-2-fill"></i>
                  </div>
                  <div class="_card_funcs _hidden">
                    <ul>
                      <li class="_edit_func">
                        <i class="ri-edit-box-line"></i>
                        Edit
                      </li>
                      <li class="_delete_func">
                        <i class="ri-delete-bin-line"></i>
                        Delete card
                      </li>
                      <li class="_add_group_func">
                        <i class="ri-add-box-line"></i>
                        Add to Group
                      </li>
                    </ul>
                  </div>
                </div>
              </div>`;
  });

  document.querySelector("._card_grid").innerHTML = html;
}

render_html();

function format_time(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  if (!date) {
    return "now";
  }

  switch (true) {
    case seconds > 60:
      return `${Math.floor(seconds / 60)} mins`
    case seconds > 3600:
      return `${Math.floor(seconds / 3600)} hrs`
    case seconds > 86400:
      return `${Math.floor(seconds / 86400)} days`
    case seconds > 2592000:
      return `${Math.floor(seconds / 2592000)} days`
    case seconds > 31536000:
      return `${Math.floor(seconds / 31536000)} days`
    default:
      return `${Math.floor(seconds)} secs`
  }
}

const search_btn = document.querySelector("._search_btn");
const search_input = document.querySelector('._js_input');
let search_is_focused = false;

search_input.addEventListener('focus', () => {
  search_is_focused = true;

  const min_screen_size = 540;
  const window_size = window.innerWidth;

  if (window_size <= min_screen_size && search_is_focused) {
    const backdrop = document.querySelector('._backdrop');
    backdrop.classList.add('_open');

    search_input.classList.add('_search_input_active');
  }
})


search_input.addEventListener('blur', () => {

  search_is_focused = false;

  const min_screen_size = 540;
  const window_size = window.innerWidth;

  if (window_size <= min_screen_size && !search_is_focused) {
    const backdrop = document.querySelector('._backdrop');
    backdrop.classList.remove('_open');

    search_input.classList.remove('_search_input_active');
    search_input.value = "";
  }
})

search_btn.addEventListener('click', (e) => {
  search_input.focus();
})
