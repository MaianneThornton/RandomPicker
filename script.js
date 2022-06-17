const tagsElem = document.getElementById('tags')
const textarea = document.getElementById('textarea')
// Starts with the cursor in the textarea when the page loads
textarea.focus()

// keyup (when user presses down and then lets up)
textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value)
    // if enter is pressed, after 10ms clear textarea and call randomSelect function
    if (e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = ''
        }, 10);
        randomSelect()
    }
})

function createTags(input) {
    // creates arrays (separated by the commas)
    const tags = input.split(',').filter
        // .trim (trims white space) not equal to and empty string then return a new trimmed array
        (tag => tag.trim() !== '').map(tag => tag.trim())
    // clears the tags element
    tagsElem.innerHTML = ''

    // looping through each tag added and creating the spans that will display
    tags.forEach(tag => {
        const tagElem = document.createElement('span')
        tagElem.classList.add('tag')
        tagElem.innerText = tag
        tagsElem.appendChild(tagElem)
    })
}

function randomSelect() {
    // the number of times to hightlight each span until stopping
    const times = 30
    // pick a random tag every 100ms
    const interval = setInterval(() => {
        const randomTag = pickRandomTag()

        // animates by highlighting and un-highlighting the spans randomly
        highlightTag(randomTag)

        setTimeout(() => {
            unHighlightTag(randomTag)
        }, 100);
    }, 100);
    // stops the animation on a random tag
    setTimeout(() => {
        clearInterval(interval)

        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100);
    }, times * 100);
}

function pickRandomTag() {
    // brings all the spans in via a nodeList
    const tags = document.querySelectorAll('.tag')
    // (Math.floor)rounds down, (Math.random)random decimal multiplied by the length of the tags nodeList
    return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag) {
    tag.classList.add('highlight')
}

function unHighlightTag(tag) {
    tag.classList.remove('highlight')
}