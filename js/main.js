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

function remove_item(item_id) {
    const item_element = document.getElementsByClassName(item_id)

    for (var i = 0; i < item_element.length;) {
        console.log(item_element.item(i))
        item_element.item(i).remove()
    }
}

function gettotal() {
    const items = document.getElementById("items").children
    const bill = document.getElementById("bill")

    var total = 0

    for (var i = 0; i < items.length; i++) {
        const item = items.item(i)
        const cost = Number(item.dataset.cost)
        const item_id = item.dataset.id
        const item_name = item.dataset.itemname

        total += cost

        const cost_string = addcommasinnumber(cost)

        // Create Item Bill

        console.log(bill)

        const bill_bg = document.createElement("div")
        bill_bg.classList.add("item-bill")
        bill_bg.classList.add(item_id)
        bill.appendChild(bill_bg)

        const bill_item_name = document.createElement("h4")
        bill_item_name.classList.add("item-name")
        bill_item_name.innerHTML = item_name
        bill_bg.appendChild(bill_item_name)

        const bill_item_cost = document.createElement("h4")
        bill_item_cost.classList.add("item-cost")
        bill_item_cost.innerHTML = cost_string
        bill_bg.appendChild(bill_item_cost)
    }

    // Create Final Cost
    
    const final_bg = document.createElement("div")
    final_bg.id = "total-cost-points"
    bill.appendChild(final_bg)

    // Total Cost before GST

    const total_string = addcommasinnumber(total)

    const total_cost_bg = document.createElement("div")
    total_cost_bg.classList.add("item-bill")
    total_cost_bg.id = "total-item-cost-div"
    final_bg.appendChild(total_cost_bg)

    const total_text = document.createElement("h4")
    total_text.classList.add("item-name")
    total_cost_bg.appendChild(total_text)
    total_text.innerHTML = "Total"

    const total_cost = document.createElement("h4")
    total_cost.classList.add("item-cost")
    total_cost_bg.appendChild(total_cost)
    total_cost.innerHTML = total_string

    // GST

    const GST = (total * 0.09).toFixed(2)

    const GST_string = addcommasinnumber(GST)

    const GST_bg = document.createElement("div")
    GST_bg.classList.add("item-bill")
    final_bg.appendChild(GST_bg)

    const GST_text = document.createElement("h4")
    GST_text.classList.add("item-name")
    GST_bg.appendChild(GST_text)
    GST_text.innerHTML = "GST"

    const GST_cost = document.createElement("h4")
    GST_cost.classList.add("item-cost")
    GST_bg.appendChild(GST_cost)
    GST_cost.innerHTML = GST_string

    // Points

    const Points_Earned = Math.round(total/20)

    const Points_bg = document.createElement("div")
    Points_bg.classList.add("item-bill")
    final_bg.appendChild(Points_bg)

    const Points_text = document.createElement("h4")
    Points_text.classList.add("item-name")
    Points_bg.appendChild(Points_text)
    Points_text.innerHTML = "Points Earned"

    const Points_amount = document.createElement("h4")
    Points_amount.classList.add("item-cost")
    Points_bg.appendChild(Points_amount)
    Points_amount.innerHTML = Points_Earned

    // Amount Payable

    const To_Pay = total + parseFloat(GST)

    const To_Pay_String = addcommasinnumber(To_Pay)

    const To_Pay_bg = document.createElement("div")
    To_Pay_bg.classList.add("item-bill")
    final_bg.appendChild(To_Pay_bg)

    const To_Pay_text = document.createElement("h4")
    To_Pay_text.classList.add("item-name")
    To_Pay_bg.appendChild(To_Pay_text)
    To_Pay_text.innerHTML = "To Pay"

    const To_Pay_amount = document.createElement("h4")
    To_Pay_amount.classList.add("item-cost")
    To_Pay_amount.id = "Amount-Payable"
    To_Pay_amount.dataset.PayableAmount = To_Pay
    To_Pay_bg.appendChild(To_Pay_amount)
    To_Pay_amount.innerHTML = To_Pay_String

    // Point Option

    const Point_Option = document.getElementById("point-option")

    const points = 200

    Point_Option.dataset.points = points

}

function addcommasinnumber(value) {
    var value_string = "S$"

    // number of digits in the first set
    
    const first_set_amount = value.toString().length % 3

    for (var i = 0; i < value.toString().length; i++) {
        const digit = value.toString()[i]
        const placement = i + 1
        
        value_string += digit

        // Add in the commas between the numbers

        if ((placement - first_set_amount)% 3 == 0 && placement != value.toString().length && value.toString()[placement] != ".") {
            value_string += ","
        }
    }

    return value_string
}

document.getElementById("point-option").addEventListener("change", function() {
    const Payable_Amount_Display = document.getElementById("Amount-Payable")
    const Point_Option = document.getElementById("point-option")
    const Total_Display = document.getElementById("Amount-Payable")

    if (document.getElementById("point-option0").checked) {
        const Point_to_Dollars = Point_Option.dataset.points / 10
        const Payable_Amount_After_Points = Payable_Amount_Display.dataset.PayableAmount - Point_to_Dollars

        const Payable_Amount_After_Points_String = addcommasinnumber(Payable_Amount_After_Points)

        Total_Display.innerHTML = Payable_Amount_After_Points_String
        
    } else {
        const Payable_Amount_String = addcommasinnumber(Total_Display.dataset.PayableAmount)

        Total_Display.innerHTML = Payable_Amount_String
    }
})
