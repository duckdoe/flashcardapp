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
           
      <div class="_card_section">
        <div class="_card_section_header">
          <div class="_card_title">
            <input type="text" class="_title_input" value="${cards.title}" />
            <span class="_changed"></span>
          </div>
          <div class="_card_more">
            <i class="ri-more-line _more" tabindex="0"></i>
            <div class="_card_funcs _scale_0" tabindex="-1">
              <ul>
                <li class="_add_func">
                  <button class="_full_width">
                    <i class="ri-add-box-line"></i>
                    Add Card
                  </button>
                </li>
                <li class="_save_func">
                  <button class="_full_width">
                    <i class="ri-save-line"></i>
                    Save Changes
                  </button>
                </li>
                <li class="_chage_func">
                  <button class="_full_width">
                    <i class="ri-color-filter-line"></i>
                    Change Color
                  </button>
                </li>
                <li class="color_func">
                  <button class="_full_width">
                    <i class="ri-delete-bin-line"></i>
                    Delete Flascard
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="_card_container">
          <div class="_nav_btn">
            <i class="ri-arrow-left-long-line" tabindex="0"></i>
          </div>
          <div class="_cards">
            <div class="_card">
              <div class="_card_header">
                <div class="_card_status">
                  <span>Question</span>
                </div>
                <button class="_edit_btn">
                  <i class="ri-edit-2-line"></i>
                  Edit Text
                </button>
              </div>
              <div class="_full_height">
                <div class="_text">
                  <p class="_card_text" tabindex="-1">${cards.data[0].question}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="_nav_btn">
            <i class="ri-arrow-right-long-line" tabindex="0"></i>
          </div>
        </div>
      </div>`;

  document.querySelector('._main').innerHTML = html;


  const more_btn = document.querySelector('._more');
  const card_funcs = document.querySelector('._card_funcs');

  more_btn.addEventListener('click', () => {
    card_funcs.focus();
  })

  more_btn.addEventListener('focus', () => {
    card_funcs.focus();
  })

  card_funcs.addEventListener('focus', () => {
    card_funcs.classList.remove('_scale_0');
    console.log("blue")
  })


  card_funcs.addEventListener('focusout', (e) => {
    if (e.relatedTarget === null) {

      if (!card_funcs.classList.contains('_scale_0')) {
        card_funcs.classList.add('_scale_0');
      }
    }
  });

  const ul = card_funcs.children[0];
  ul.addEventListener('focusout', (e) => {
    const contains_el = ul.contains(e.relatedTarget)

    if (!contains_el) {

      if (!card_funcs.classList.contains('_hidden')) {
        card_funcs.classList.add('_scale_0');
      }
    }
  });

  const edit_button = document.querySelector('._edit_btn');
  const card_text = document.querySelector('._card_text');

  edit_button.addEventListener('click', (e) => {
    card_text.contentEditable = 'true';
    card_text.focus();
  });


}

render_card();