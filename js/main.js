function customize(item, previousPage) {
    localStorage.setItem("item", item)
    localStorage.setItem("previous", previousPage)
    window.location.href = "customize.html"
}

function customizepageloaded() {
}

function addtocart() {
    const screen_blur = document.getElementById("screen-blur")
    const item_bought_align = document.getElementById("item-bought-align")

    screen_blur.classList.add("cardshow")
    item_bought_align.classList.add("cardshow")
}

function helpfulagree(review_id) {
    helpfulchange(review_id)
}

function helpfuldisagree(review_id) {
    helpfulchange(review_id)
}

function helpfulchange(review_id) {
    const reviewelements = document.getElementsByClassName(review_id)
    for (var i = 0; i < reviewelements.length; i++) {
        var element = reviewelements.item(i)
        if (element.classList.contains("helpful-button")) {
            element.style.display = "none"
        } else if (element.classList.contains("helpful-text")) {
            element.innerHTML = "Thank You for your feedback"
        }
    }
}

function goback() {
    const prev_page = localStorage.getItem("previous") ? localStorage.getItem("previous") : "index.html"
    window.location.href = prev_page
}

function remove(item_id) {
    console.log(item_id)
}