function customize(item, previousPage) {
    localStorage.setItem("item", item)
    localStorage.setItem("previous", previousPage)
    window.location.href = "customize.html"
}

function customizepageloaded() {
}

function addtocart() {
    alert(localStorage.getItem("previous"))
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