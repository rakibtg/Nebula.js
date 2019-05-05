console.clear()

const app = () => document.querySelector('div#app')

const state = {
  counter: 0,
  users: {
    counter: 0,
  },
  languages: [ 'php', 'javascript', 'go', 'dart', 'python', 'java' ]
}

const $StateDomMap = {
  counter: {
    class: 'asd123',
    update: [
      'innerHTML',
      'attribute'
    ]
  },
  languages: {
    type: 'map',
    class: {

    }
  }
}

const $components = {
  user: {
    state: {
      totalUser: 0
    },
    mounted: {},
    destroyed: {},
    template: `<span>${state.counter}</span><button onclick="$components.user.methods.hadnleInput()">x</button>`,
    method: {
      handleInput: () => {

      }
    }
  },

}

const $render = domClass => {
  const $domPart = app().querySelectorAll('.' + $StateDomMap[domClass]['class'])
  // console.log($domPart)
  $domPart.forEach(_dom => {

    _dom.innerHTML = state[domClass]
  })
}

const update = (nextState) => {
  const updatables = Object.keys(nextState)
  updatables.map((item, index) => {
    if(item in state) {
      if(state[item] !== nextState[item]) {
        state[item] = nextState[item]
        $render(item)
      }
    }
  })

}

const handleClickIncrement = () => {
  update({
    counter: state.counter + 1
  })
}

const handleClickDecrement = () => {
  update({
    counter: state.counter - 1
  })
}

const handleClickReset = () => {
  update({
    counter: 0
  })
}

/**
 * Here we will write a component who is 
 * responsible for rendering and updating a list from state.
 */
const COMPONENT_listOfLanguages = {
  $mounted: false,
  set: {
    mounted: status => {
      COMPONENT_listOfLanguages.$mounted = status
    }
  },
  render: () => {
    if(!COMPONENT_listOfLanguages.$mounted) {
      // create the dom.
      COMPONENT_listOfLanguages.set.mounted(true)
      return `
        <ul>
          ${state.languages.map((lang, index) => {
            return `<li>${lang}</li>`
          }).join('')}
        </ul>
      `
    } else {
      // Update the dom.

    }
  }
}

template = `
  <div class='counter ${$StateDomMap.counter.class}'>${state.counter}</div>
  <div class='buttons'>
    <button onclick="handleClickIncrement()">+1</button>
    <button onclick="handleClickDecrement()">-1</button>
    <button onclick="handleClickReset()">Reset</button>
    <hr/>
    ${COMPONENT_listOfLanguages.render()}
  </div>
`

app().innerHTML = template


// setInterval(() => {
//   handleClickIncrement()
// }, 10)
