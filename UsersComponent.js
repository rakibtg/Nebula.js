export default {
  name: 'UsersComponent',
  mounted: () => {
    console.log(`${this.name} mounted`)
  },
  destroyed: () => {},
  render: () => {
    return `
      <h1>List of users.</h1>
      <ul>
        <li @map="state.users" @item="user" @key="index"/>
      </ul>
      <div @if="state.isAdmin === true">
        <button>Edit></button>
      </div>
    `
  }
}