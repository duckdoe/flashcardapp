const cards = {
  id: 1,
  title: 'Mathematics',
  color: 'green',
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

function render_card() {
  document.title += ` | ${cards.title}`;

  let html = `
           
      <div class="card_section">
        <div class="card_section_header">
          <div class="card_title">
            <input type="text" class="title_input" value="${cards.title}" />
            <span class="changed"></span>
          </div>
          <div class="card_more">
            <i class="ri-more-line more" tabindex="0"></i>
            <div class="card_funcs scale_0" tabindex="-1">
              <ul>
                <li class="add_func">
                  <button class="full_width">
                    <i class="ri-add-box-line"></i>
                    Add Card
                  </button>
                </li>
                <li class="save_func">
                  <button class="full_width">
                    <i class="ri-save-line"></i>
                    Save Changes
                  </button>
                </li>
                <li class="chage_func">
                  <button class="full_width">
                    <i class="ri-color-filter-line"></i>
                    Change Color
                  </button>
                </li>
                <li class="color_func">
                  <button class="full_width">
                    <i class="ri-delete-bin-line"></i>
                    Delete Flascard
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card_container">
          <div class="nav_btn">
            <i class="ri-arrow-left-long-line" tabindex="0"></i>
          </div>
          <div class="cards">
            <div class="card">
              <div class="card_header">
                <div class="card_status">
                  <span>Question</span>
                </div>
                <button class="edit_btn">
                  <i class="ri-edit-2-line"></i>
                  Edit Text
                </button>
              </div>
              <div class="full_height">
                <div class="text">
                  <p class="card_text" tabindex="-1">${cards.data[0].question}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="nav_btn">
            <i class="ri-arrow-right-long-line" tabindex="0"></i>
          </div>
        </div>
      </div>`;

  document.querySelector('.main').innerHTML = html;


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
    console.log("blue")
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

      if (!card_funcs.classList.contains('hidden')) {
        card_funcs.classList.add('scale_0');
      }
    }
  });

  const edit_button = document.querySelector('.edit_btn');
  const card_text = document.querySelector('.card_text');

  edit_button.addEventListener('click', (e) => {
    card_text.contentEditable = 'true';
    card_text.focus();
  });


}

render_card();