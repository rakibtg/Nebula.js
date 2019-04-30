console.clear()

const app = () => document.querySelector('div#app')

const state = {
  counter: 0,
  users: {
    counter: 0,
  }
}

const $StateDomMap = {
  counter: {
    class: 'asd123',
    update: [
      'innerHTML',
      'attribute'
    ]
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

template = `
  <div class='counter ${$StateDomMap.counter.class}'>${state.counter}</div>
  <div class='buttons'>
    <button onclick="handleClickIncrement()">+1</button>
    <button onclick="handleClickDecrement()">-1</button>
    <button onclick="handleClickReset()">Reset</button>
  </div>
`

app().innerHTML = template


// setInterval(() => {
//   handleClickIncrement()
// }, 10)
