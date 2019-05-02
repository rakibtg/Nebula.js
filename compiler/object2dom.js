console.clear()

const systemIdentifier = () => Math.random().toString(36).substr(2, 10)

const handleClassAttribute = (string, systemClassName, domTag) => {
  const re = /class\s*=\s*['|"](\w*)['|"]?/g
  const result = re.exec(string)
  let classAttribute = ''
  // console.log(result)
  if(result === null) {
    classAttribute = `class="${systemClassName}"`
  } else {
    classAttribute = `class="${result[1]} ${systemClassName}"`
  }
  let replaceValue = ''
  let searchValue = ''
  if(result) {
    searchValue = result[0]
    replaceValue = classAttribute
  } else {
    searchValue = '<'+domTag
    replaceValue = searchValue + ' ' + classAttribute
  }
  return string.replace(searchValue, replaceValue)
}

const handleBindedDataAttribute = (code) => {
  const re = /@data\s*=\s*['|"](.*?)['|"]/g
  const result = re.exec(code)
  if(result) {
    return code
      .replace(result[0], '')
      .replace('></', '>${'+result[1]+'}</')
      .replace(' >', '>')
  } else {
    return code
  }
}

const handleLoopAttribute = (code) => {
  const re = /@loop\s*=\s*['|"](.*?)['|"]/g
  const result = re.exec(code)
  if(result) {
    // Remove loop attribute from code.
    code = code.replace(result[0], '')
    // console.log('Code:', code)
    return `
      \`
        $\{${result[1]}.map(item => {
          return \`${code}\`
        }).join('')}
      \`
    `
    // console.log('New Code:', newCode)
    // x = `
    //   ${[1, 2, 3].map(item => {
    //     return `<li class="items">${item}</li>`
    //   }).join('')}
    // `
  } else {
    return code
  }
  // console.log(loop)
  // console.log(result)
}

var regexp = /<(\w+).*(\/>)/g

var str = `
  Hello there <div class='container' id='user' @data="username"/> nice day!!
  Math: 1 + 1 = <span @data="1+1"/> 
  <span @data="renderAvatar()"/>
  <ul>
    <li @loop="[1, 2, 3]" class="items"/>
  </ul>
  <ul @loop="users.following" @value="user">
    <li @data="user.name"/>
  </ul>
  Will it <strong @data='dance'/>! <a href="#">Nice</a> Are you sure!
`
// <li @loop="[1, 2, 3]" @key="" @value="" @children="" class="items"/>
// var x = str.match(regexp); 
// console.log(x)

array1 = regexp.exec(str)
// console.log(array1)

// console.log("\n")

// End the dom.
var newstr = str.replace(regexp, (...props) => {
  const [ 
    matchedString, 
    domTag, 
    closingTag 
  ] = props
  // console.log('matchedString', matchedString)
  // console.log('domTag', domTag)
  // console.log('closingTag', closingTag)
  const closingTagDom = '></'+domTag+'>'
  let _dom = matchedString
    .replace(new RegExp(closingTag + '$'), closingTagDom)

  _dom = handleClassAttribute(_dom, systemIdentifier(), domTag)

  _dom = handleBindedDataAttribute(_dom)
  _dom = handleLoopAttribute(_dom)

  return _dom
});

console.log(newstr)