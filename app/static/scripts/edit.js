const cards = {
  id: 1,
  title: 'Math',
  color: 'color-purple',
  data: [
    {
      id: 1,
      question: `If x is 2 and the sum of x and y is 6 then what is y?`,
      answer: '4',
    },
    {
      id: 2,
      question: 'What s 3 + 2',
      answer: '5',
    }
  ]
}

let has_changes = false;
let current_card_index = 0;
let is_navigating = false;

function enable_save_btn() {
  has_changes = true;
  const save_btn = document.querySelector('.save_changes');
  save_btn.disabled = false;
}

function render_card() {
  document.title += ` | ${cards.title}`;

  let card_html = ``
  cards.data.forEach((card, index) => {
    card_html += `<div class="card ${cards.color}" data-index="${index}" data-is-answer="false">
              <div class="card_header">
                <div class="card_status">
                  <span class="card_side">Question</span>
                </div>
                <div class="card_func">
                <button class="edit_btn">
                  <i class="ri-edit-2-line"></i>
                  Edit Text
                </button>
                <div class="delete_btn">
                <i class="ri-delete-bin-line"></i>
                </div>
                </div>
              </div>
              <div class="full_height">
                <div class="text">
                  <p class="card_text" tabindex="-1">${card.question}</p>
                </div>
              </div>
            </div>`
  });
  document.querySelector('.cards').innerHTML = card_html;
  document.querySelector('.title_input').value = cards.title;

  // Generate progress bars
  const card_bars = document.getElementById('card_bars');
  card_bars.innerHTML = '';
  cards.data.forEach((card, index) => {
    const bar = document.createElement('div');
    bar.className = `bar ${cards.color}`;
    bar.dataset.index = index;
    card_bars.appendChild(bar);
  });

  function update_progress_bars() {
    const all_bars = document.querySelectorAll('.bar');
    all_bars.forEach((bar, index) => {
      if (index <= current_card_index) {
        bar.style.opacity = '1';
      } else {
        bar.style.opacity = '0.3';
      }
    });
  }

  function update_card_counter() {
    const current_card_span = document.querySelector('.current_card');
    const total_cards_span = document.querySelector('.total_cards');
    current_card_span.textContent = current_card_index + 1;
    total_cards_span.textContent = cards.data.length;
  }

  const card_elements = document.querySelectorAll('.card');

  function setup_card_listeners() {
    const updated_cards = document.querySelectorAll('.card');

    // Card flip functionality
    updated_cards.forEach(card_el => {
      card_el.addEventListener('click', (e) => {
        if (e.target.closest('.edit_btn') || e.target.closest('.delete_btn') || e.target.closest('.card_func') || e.target.closest('.card_text')) {
          return;
        }

        const index = card_el.dataset.index;
        const is_answer = card_el.dataset.isAnswer === 'true';
        const card_data = cards.data[index];
        const card_status = card_el.querySelector('.card_side');
        const card_text = card_el.querySelector('.card_text');

        if (is_answer) {
          card_text.textContent = card_data.question;
          card_status.textContent = 'Question';
          card_el.dataset.isAnswer = 'false';
        } else {
          card_text.textContent = card_data.answer;
          card_status.textContent = 'Answer';
          card_el.dataset.isAnswer = 'true';
        }
      });
    });

    // Edit button functionality
    const edit_buttons = document.querySelectorAll('.edit_btn');

    edit_buttons.forEach(edit_button => {
      edit_button.addEventListener('click', (e) => {
        e.stopPropagation();
        const card_text = edit_button.closest('.card').querySelector('.card_text');
        const original_content = card_text.textContent;

        card_text.contentEditable = 'true';
        card_text.focus();

        const range = document.createRange();
        const selection = window.getSelection()

        if (card_text.childNodes.length > 0) {
          range.setStart(card_text.childNodes[0], card_text.textContent.length)
        } else {
          range.setStart(card_text, 0)
        }
        range.collapse(true);

        selection.removeAllRanges();
        selection.addRange(range);

        card_text.addEventListener('blur', handle_card_blur);

        function handle_card_blur() {
          card_text.contentEditable = "false"

          if (card_text.textContent !== original_content) {
            enable_save_btn();
          }

          card_text.removeEventListener('blur', handle_card_blur);
        }
      });
    });
  }

  // Navigation functionality
  const nav_btns = document.querySelectorAll('.nav_btn');
  const left_nav = nav_btns[0];
  const right_nav = nav_btns[1];
  const cards_container = document.querySelector('.cards');

  function update_nav_buttons() {
    const right_icon = right_nav.querySelector('i');
    const left_icon = left_nav.querySelector('i');
    const current_card_elements = document.querySelectorAll('.card');

    if (current_card_index === current_card_elements.length - 1) {
      // At last card - show add button
      right_icon.className = 'ri-add-line';
      left_icon.className = 'ri-arrow-left-long-line';
    } else {
      // Not at last card - show right arrow
      right_icon.className = 'ri-arrow-right-long-line';
      left_icon.className = 'ri-arrow-left-long-line';
    }
  }

  function handle_left_nav_click() {
    if (is_navigating) return;
    if (current_card_index > 0) {
      is_navigating = true;
      current_card_index--;
      const cards_container = document.querySelector('.cards');
      cards_container.style.scrollBehavior = 'smooth';
      cards_container.scrollLeft -= 490;
      update_nav_buttons();
      update_progress_bars();
      update_card_counter();

      setTimeout(() => {
        is_navigating = false;
      }, 400);
    }
  }

  function handle_right_nav_click() {
    if (is_navigating) return;
    const cards_container = document.querySelector('.cards');
    const current_card_elements = document.querySelectorAll('.card');

    if (current_card_index === current_card_elements.length - 1) {
      // At last card - add new card
      is_navigating = true;
      const new_card = {
        id: cards.data.length + 1,
        question: 'New Question',
        answer: 'New Answer'
      };
      cards.data.push(new_card);

      // Add new card to DOM
      const new_card_html = `<div class="card ${cards.color}" data-index="${cards.data.length - 1}" data-is-answer="false">
            <div class="card_header">
              <div class="card_status">
                <span class="card_side">Question</span>
              </div>
              <div class="card_func">
              <button class="edit_btn">
                <i class="ri-edit-2-line"></i>
                Edit Text
              </button>
              <div class="delete_btn">
              <i class="ri-delete-bin-line"></i>
              </div>
              </div>
            </div>
            <div class="full_height">
              <div class="text">
                <p class="card_text" tabindex="-1">${new_card.question}</p>
              </div>
            </div>
          </div>`;

      cards_container.insertAdjacentHTML('beforeend', new_card_html);

      current_card_index = cards.data.length - 1;
      cards_container.style.scrollBehavior = 'smooth';
      cards_container.scrollLeft += 490;

      enable_save_btn();

      // Re-attach event listeners to new card
      setup_card_listeners();

      // Regenerate progress bars
      const card_bars = document.getElementById('card_bars');
      const new_bar = document.createElement('div');
      new_bar.className = `bar ${cards.color}`;
      new_bar.dataset.index = cards.data.length - 1;
      card_bars.appendChild(new_bar);

      // Update nav buttons, progress bars and counter
      update_nav_buttons();
      update_progress_bars();
      update_card_counter();

      setTimeout(() => {
        is_navigating = false;
      }, 400);
    } else if (current_card_index < current_card_elements.length - 1) {
      // Not at last card - navigate right
      is_navigating = true;
      current_card_index++;
      cards_container.style.scrollBehavior = 'smooth';
      cards_container.scrollLeft += 490;
      update_nav_buttons();
      update_progress_bars();
      update_card_counter();

      setTimeout(() => {
        is_navigating = false;
      }, 400);
    }
  }

  left_nav.addEventListener('click', handle_left_nav_click);
  right_nav.addEventListener('click', handle_right_nav_click);

  setup_card_listeners();
  update_nav_buttons();
  update_progress_bars();
  update_card_counter();

  // Card text blur (from title and other editable fields)
  const card_texts = document.querySelectorAll('.card_text');
  card_texts.forEach(card_text => {
    card_text.addEventListener('blur', () => {
      card_text.contentEditable = "false"
    })
  });

  // Title input change
  const title_input = document.querySelector('.title_input');
  title_input.addEventListener('input', () => {
    cards.title = title_input.value;
    enable_save_btn();
  });

  // More button and menu
  const more_btn = document.querySelector('.more');
  const card_funcs = document.querySelector('.card_funcs');

  more_btn.addEventListener('click', () => {
    card_funcs.focus();
  })

  more_btn.addEventListener('focus', () => {
    card_funcs.focus();
  })

  card_funcs.addEventListener('focus', () => {
    card_funcs.classList.remove('scale_0');
  })

  card_funcs.addEventListener('focusout', (e) => {
    if (e.relatedTarget === null) {
      if (!card_funcs.classList.contains('scale_0')) {
        card_funcs.classList.add('scale_0');
      }
    }
  });

  const ul = card_funcs.children[0];
  ul.addEventListener('focusout', (e) => {
    const contains_el = ul.contains(e.relatedTarget)

    if (!contains_el) {
      if (!card_funcs.classList.contains('scale_0')) {
        card_funcs.classList.add('scale_0');
      }
    }
  });

  // Color picker functionality
  const change_color_btn = document.querySelector('.chage_func button');
  const color_picker = document.querySelector('.color_picker');

  change_color_btn.addEventListener('click', (e) => {
    e.stopPropagation();
    color_picker.classList.toggle('active');
  });

  const color_options = document.querySelectorAll('.color_option');
  color_options.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const new_color = option.dataset.color;

      card_elements.forEach(card_el => {
        card_el.classList.remove(cards.color);
        card_el.classList.add(new_color);
      });

      cards.color = new_color;
      color_picker.classList.remove('active');
      enable_save_btn();
    });
  });

  // Close color picker when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.chage_func')) {
      color_picker.classList.remove('active');
    }
  });
}

render_card();