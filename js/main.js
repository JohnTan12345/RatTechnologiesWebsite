function customize(item, previousPage) {
    localStorage.setItem("item", item)
    localStorage.setItem("previous", previousPage)
    window.location.href = "customize.html"
}

function customizepageloaded() {

    // Load Reviews

    loadreviews()
    
    // Load Rating
    
    const stars_div = document.getElementById("stars")

    const total_reviews = Number(stars_div.dataset.totalreviews)

    const avg_rating = Math.round(Number(stars_div.dataset.totalstars) / total_reviews)

    document.getElementById("total-reviews").innerHTML = `(${total_reviews})`

    loadrating(avg_rating, stars_div)
}

// Load Rating

function loadrating(rating, parentNode) {
    for (i = 1; i <= 5; i++) {
        if (i <= rating) {
            const filled_star = document.createElement("img")
            filled_star.src = "svg/filled-star.svg"
            parentNode.appendChild(filled_star)
        } else {
            const star = document.createElement("img")
            star.src = "svg/star.svg"
            parentNode.appendChild(star)
        }
    }
}

function loadreviews() {

    const reviews_list = document.getElementById("reviews")

    // Test Sample

    const reviews = [
        {"id":`${guidGenerator()}`,"username":"SaucyJack","rating":"3","review":"Kudbebedda","helpful":"73"},
        {"id":`${guidGenerator()}`,"username":"AEEEEEE","rating":"5","review":"Massive W","helpful":"23"},
        {"id":`${guidGenerator()}`,"username":"Walter White","rating":"1","review":"Absolute Dogwater","helpful":"0"},
        {"id":`${guidGenerator()}`,"username":"SaucyJack","rating":"3","review":"Kudbebedda","helpful":"73"},
        {"id":`${guidGenerator()}`,"username":"AEEEEEE","rating":"5","review":"Massive W","helpful":"23"},
        {"id":`${guidGenerator()}`,"username":"Walter White","rating":"1","review":"Absolute Dogwater","helpful":"0"},
        {"id":`${guidGenerator()}`,"username":"SaucyJack","rating":"3","review":"Kudbebedda","helpful":"73"},
        {"id":`${guidGenerator()}`,"username":"AEEEEEE","rating":"5","review":"Massive W","helpful":"23"},
        {"id":`${guidGenerator()}`,"username":"Walter White","rating":"1","review":"Absolute Dogwater","helpful":"0"},
        {"id":`${guidGenerator()}`,"username":"SaucyJack","rating":"3","review":"Kudbebedda","helpful":"73"},
        {"id":`${guidGenerator()}`,"username":"AEEEEEE","rating":"5","review":"Massive W","helpful":"23"},
        {"id":`${guidGenerator()}`,"username":"Walter White","rating":"1","review":"Absolute Dogwater","helpful":"0"},
        {"id":`${guidGenerator()}`,"username":"SaucyJack","rating":"3","review":"Kudbebedda","helpful":"73"},
        {"id":`${guidGenerator()}`,"username":"AEEEEEE","rating":"5","review":"Massive W","helpful":"23"},
        {"id":`${guidGenerator()}`,"username":"Walter White","rating":"1","review":"Absolute Dogwater","helpful":"0"},
        {"id":`${guidGenerator()}`,"username":"SaucyJack","rating":"3","review":"Kudbebedda","helpful":"73"},
        {"id":`${guidGenerator()}`,"username":"AEEEEEE","rating":"5","review":"Massive W","helpful":"23"},
        {"id":`${guidGenerator()}`,"username":"Walter White","rating":"1","review":"Absolute Dogwater","helpful":"0"},
        {"id":`${guidGenerator()}`,"username":"SaucyJack","rating":"3","review":"Kudbebedda","helpful":"73"},
        {"id":`${guidGenerator()}`,"username":"AEEEEEE","rating":"5","review":"Massive W","helpful":"23"},
        {"id":`${guidGenerator()}`,"username":"Walter White","rating":"1","review":"Absolute Dogwater","helpful":"0"},
        {"id":`${guidGenerator()}`,"username":"SaucyJack","rating":"3","review":"Kudbebedda","helpful":"73"},
        {"id":`${guidGenerator()}`,"username":"AEEEEEE","rating":"5","review":"Massive W","helpful":"23"},
        {"id":`${guidGenerator()}`,"username":"Walter White","rating":"1","review":"Absolute Dogwater","helpful":"0"},
    ]

    const reviews_displayed = Number(reviews_list.dataset.showing)

    var new_reviews_displayed = Number(reviews_list.dataset.showing)

    document.getElementById("load-more").remove()

    for (var i = 0; (reviews.length - reviews_displayed >= 5 ? i < 5 : i < reviews.length - reviews_displayed); i++) {

        const review = reviews[reviews_displayed + i]

        // Create Review Element

        const review_bg = document.createElement("div")
        review_bg.classList.add("review", "ubuntu-medium")
        reviews_list.appendChild(review_bg)

        const content_div = document.createElement("div")
        content_div.classList.add("review-content")
        review_bg.appendChild(content_div)

        const profile_img = document.createElement("img")
        profile_img.src = "img/placeholder.jpeg" //Get Profile Pic From account database later
        content_div.appendChild(profile_img)
        
        const content_div_no_pic = document.createElement("div")
        content_div.appendChild(content_div_no_pic)

        const username = document.createElement("h5")
        username.classList.add("username")
        username.innerHTML = review.username
        content_div_no_pic.appendChild(username)

        const rating_bg = document.createElement("div")
        rating_bg.classList.add("review-rating")
        content_div_no_pic.appendChild(rating_bg)

        loadrating(Number(review.rating), rating_bg)

        const review_content = document.createElement("h5")
        review_content.innerHTML = review.review
        content_div_no_pic.appendChild(review_content)

        const button_align = document.createElement("div")
        button_align.classList.add("button-align")
        review_bg.appendChild(button_align)

        const helpful_amount_text = document.createElement("label")
        helpful_amount_text.classList.add("helpful-amount", `${review.id}`)
        helpful_amount_text.innerHTML = `${review.helpful} Found This Helpful.`
        helpful_amount_text.dataset.amount = review.helpful
        button_align.appendChild(helpful_amount_text)

        const question_text = document.createElement("label")
        question_text.classList.add("helpful-text", `${review.id}`)
        question_text.innerHTML = "Is This Helpful?"
        button_align.appendChild(question_text)

        const agree_button = document.createElement("button")
        agree_button.classList.add("helpful-button", "helpful-agree", "helpful-option", `${review.id}`)
        agree_button.innerHTML = "Yes"
        agree_button.onclick = function() {helpfulagree(review.id)}
        button_align.appendChild(agree_button)

        const disagree_button = document.createElement("button")
        disagree_button.classList.add("helpful-button", "helpful-disagree", "helpful-option", `${review.id}`)
        disagree_button.innerHTML = "No"
        disagree_button.onclick = function() {helpfuldisagree(review.id)}
        button_align.appendChild(disagree_button)

        new_reviews_displayed++
    }

    if (new_reviews_displayed % 5 == 0) {
        const load_more_button_bg = document.createElement("div")
        load_more_button_bg.id = "load-more"
        reviews_list.appendChild(load_more_button_bg)

        const load_more_button = document.createElement("button")
        load_more_button.id = "load-more-button"
        load_more_button.innerHTML = "Load More"
        load_more_button.onclick = function() {loadreviews()}
        load_more_button_bg.appendChild(load_more_button)
    }

    reviews_list.dataset.showing = new_reviews_displayed    
}

// Called when the option changes

function optionchanged() {
    
    const cpu_price = Number(JSON.parse(document.getElementById("cpu").value).price)
    const gpu_price = Number(JSON.parse(document.getElementById("gpu").value).price)
    const ram_price = Number(JSON.parse(document.getElementById("ram").value).price)
    const storage_price = Number(JSON.parse(document.getElementById("storage").value).price)
    const monitor_price = Number(JSON.parse(document.getElementById("monitor").value).price)
    const peripherals_price = Number(JSON.parse(document.getElementById("peripherals").value).price)
    const osver_price = Number(JSON.parse(document.getElementById("osver").value).price)

    const current_total = cpu_price + gpu_price + ram_price + storage_price + monitor_price + peripherals_price + osver_price
    const points = Math.round(current_total / 3)

    const total_text = document.getElementById("total-text")
    const points_text = document.getElementById("points-text")

    total_text.dataset.total = current_total
    points_text.dataset.points = points

    total_text.innerHTML = addcommasinnumber(current_total)
    points_text.innerHTML = `You will earn: ${points} Points`
}

function addtocart() {
    const screen_blur = document.getElementById("screen-blur")
    const item_bought_align = document.getElementById("item-bought-align")

    // Add to cart
    
    var cart = JSON.parse(localStorage.getItem("cart")) || []

    // Get item info

    const item_name = document.getElementById("itemname").dataset.name
    const cpu_choice = JSON.parse(document.getElementById("cpu").value).item
    const gpu_choice = JSON.parse(document.getElementById("gpu").value).item
    const ram_choice = JSON.parse(document.getElementById("ram").value).item
    const storage_choice = JSON.parse(document.getElementById("storage").value).item
    const monitor_choice = JSON.parse(document.getElementById("monitor").value).item
    const peripherals_choice = JSON.parse(document.getElementById("peripherals").value).item
    const osver_choice = JSON.parse(document.getElementById("osver").value).item

    // Get Total & Points

    const total = document.getElementById("total-text").dataset.total
    const points = document.getElementById("points-text").dataset.points
    
    // Genereate a unique ID

    const id = guidGenerator()

    const item = {"id" : id, "name" : item_name, "cpu" : cpu_choice, "gpu" : gpu_choice, "ram" : ram_choice, "storage" : storage_choice, "monitor" : monitor_choice, "peripherals" : peripherals_choice, "osver" : osver_choice, "total" : total, "points" : points}

    // Add to cart list
    cart.push(item)

    localStorage.setItem("cart", JSON.stringify(cart))

    // Blur out the page

    screen_blur.classList.add("cardshow")
    item_bought_align.classList.add("cardshow")
}

function helpfulagree(review_id,) {
    helpfulchange(review_id, true)
}

function helpfuldisagree(review_id) {
    helpfulchange(review_id, false)
}

function helpfulchange(review_id, helpful) {
    const reviewelements = document.getElementsByClassName(review_id)
    for (var i = 0; i < reviewelements.length; i++) {
        var element = reviewelements.item(i)
        if (element.classList.contains("helpful-button")) {
            element.remove()
            i--
        } else if (element.classList.contains("helpful-text")) {
            element.innerHTML = "Thank You for your feedback"
        } else if (element.classList.contains("helpful-amount") && helpful) {
            element.dataset.amount++
            element.innerHTML = `${element.dataset.amount} Found This Helpful.`
        }
    }
}

function goback() {
    const prev_page = localStorage.getItem("previous") ? localStorage.getItem("previous") : "index.html"
    window.location.href = prev_page
}

function remove_item(item_id) {
    const item_element = document.getElementsByClassName(item_id)

    const cart = JSON.parse(localStorage.getItem("cart"))

    cart.forEach(item => {
        if (item.id == item_id) {
            const index = cart.indexOf(item)
            if (index > -1) {
                cart.splice(index, 1)
                console.log(cart)
                localStorage.setItem("cart", JSON.stringify(cart))

                const total_display = document.getElementById("total-amount")
                const gst_display = document.getElementById("gst-amount")
                const points_display = document.getElementById("points-amount")
                const payable_display = document.getElementById("amount-payable")

                const new_total = Number(total_display.dataset.amount) - Number(item.total)
                const new_gst = new_total * 0.09
                const new_points = Number(points_display.dataset.amount) - Number(item.points)
                const new_payable = new_total + new_gst

                total_display.dataset.amount = new_total
                total_display.innerHTML = addcommasinnumber(new_total)

                gst_display.dataset.amount = new_gst
                gst_display.innerHTML = addcommasinnumber(new_gst)

                points_display.dataset.amount = new_points
                points_display.innerHTML = new_points

                payable_display.dataset.amount = new_payable
                payable_display.innerHTML = addcommasinnumber(new_payable)
            }
        }
    })
    
    for (var i = 0; i < item_element.length;) {
        console.log(item_element.item(i))
        item_element.item(i).remove()
    }
}

function gettotal() {
    const cart = JSON.parse(localStorage.getItem("cart"))
    const items_div = document.getElementById("items")
    const items = items_div.children
    const bill = document.getElementById("bill")

    var total_points = 0
    // Create Item

    cart.forEach(item => {

        // Add points to total

        total_points += Number(item.points) 

        // Item Div Background
        
        const item_bg = document.createElement("div")
        item_bg.classList.add("item", item.id)
        item_bg.dataset.itemname = item.name
        item_bg.dataset.cost = item.total
        item_bg.dataset.points = item.points
        item_bg.dataset.id = item.id
        items_div.appendChild(item_bg)

        // Item Image

        const item_img = document.createElement("img")
        item_img.classList.add("item-img")
        item_img.src = `img/${item.name}.png`
        item_bg.appendChild(item_img)

        // Item Specs Div

        const item_specs_bg = document.createElement("div")
        item_specs_bg.classList.add("item-specs", "ubuntu-medium")
        item_bg.appendChild(item_specs_bg)

        // Item Name

        const item_name = document.createElement("h1")
        item_name.innerHTML = item.name
        item_specs_bg.appendChild(item_name)
        
        // CPU Spec

        const cpu_choice = document.createElement("h4")
        cpu_choice.innerHTML = `CPU: ${item.cpu}`
        item_specs_bg.appendChild(cpu_choice)
                
        // GPU Spec

        const gpu_choice = document.createElement("h4")
        gpu_choice.innerHTML = `GPU: ${item.gpu}`
        item_specs_bg.appendChild(gpu_choice)
                        
        // RAM Spec

        const ram_choice = document.createElement("h4")
        ram_choice.innerHTML = `RAM: ${item.ram}`
        item_specs_bg.appendChild(ram_choice)
                        
        // Storage Spec

        const storage_choice = document.createElement("h4")
        storage_choice.innerHTML = `Storage: ${item.storage}`
        item_specs_bg.appendChild(storage_choice)
                        
        // OS Version Choice

        const osver_choice = document.createElement("h4")
        osver_choice.innerHTML = `GPU: ${item.osver}`
        item_specs_bg.appendChild(osver_choice)
                        
        // Monitor Choice

        const monitor_choice = document.createElement("h4")
        monitor_choice.innerHTML = `Monitor: ${item.monitor}`
        item_specs_bg.appendChild(monitor_choice)
                        
        // Peripherals Choice

        const peripherals_choice = document.createElement("h4")
        peripherals_choice.innerHTML = `Peripherals: ${item.peripherals}`
        item_specs_bg.appendChild(peripherals_choice)

        // Remove Button

        const remove_button = document.createElement("button")
        remove_button.classList.add("remove-button")
        remove_button.onclick = function() {remove_item(item.id)}
        remove_button.innerHTML = "Remove"
        item_specs_bg.appendChild(remove_button)
    });

    var total = 0

    for (var i = 0; i < items.length; i++) {
        const item = items.item(i)
        const cost = Number(item.dataset.cost)
        const item_id = item.dataset.id
        const item_name = item.dataset.itemname

        total += cost

        const cost_string = addcommasinnumber(cost)

        // Create Item Bill

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
    total_cost.id = "total-amount"
    total_cost.dataset.amount = total
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
    GST_cost.id = "gst-amount"
    GST_cost.dataset.amount = GST
    GST_bg.appendChild(GST_cost)
    GST_cost.innerHTML = GST_string

    // Points

    const Points_bg = document.createElement("div")
    Points_bg.classList.add("item-bill")
    final_bg.appendChild(Points_bg)

    const Points_text = document.createElement("h4")
    Points_text.classList.add("item-name")
    Points_bg.appendChild(Points_text)
    Points_text.innerHTML = "Points Earned"

    const Points_amount = document.createElement("h4")
    Points_amount.classList.add("item-cost")
    Points_amount.id = "points-amount"
    Points_amount.dataset.amount = total_points
    Points_bg.appendChild(Points_amount)
    Points_amount.innerHTML = total_points

    // Amount Payable

    const To_Pay = (total + parseFloat(GST)).toFixed(2)

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
    To_Pay_amount.id = "amount-payable"
    To_Pay_amount.dataset.amount = To_Pay
    To_Pay_bg.appendChild(To_Pay_amount)
    To_Pay_amount.innerHTML = To_Pay_String

    // Point Option

}

function payment(type) {
    const Payable_Amount = document.getElementById("amount-payable").dataset.amount

    // Initiate Lucky Draw

    const chance_index = Math.random()

    if (chance_index > 0.1) {
        alert("You won 10 dollars!")
    } else if (0.02 < chance_index <= 0.1) {
        alert("You won 500 dollars!")
    } else {
        alert("You won a free monitor!")
    }
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

// Generates an id
function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

// Point option selected

if (document.getElementById("point-option")) {
document.getElementById("point-option").addEventListener("change", function() {
    const Payable_Amount_Display = document.getElementById("amount-payable")
    const Point_Option = document.getElementById("point-option")
    const Total_Display = document.getElementById("amount-payable")

    if (document.getElementById("point-option0").checked) {
        const Point_to_Dollars = Point_Option.dataset.points / 10
        const Payable_Amount_After_Points = Payable_Amount_Display.dataset.amount - Point_to_Dollars

        const Payable_Amount_After_Points_String = addcommasinnumber(Payable_Amount_After_Points)

        Total_Display.innerHTML = Payable_Amount_After_Points_String
        
    } else {
        const Payable_Amount_String = addcommasinnumber(Total_Display.dataset.amount)

        Total_Display.innerHTML = Payable_Amount_String
    }
})}